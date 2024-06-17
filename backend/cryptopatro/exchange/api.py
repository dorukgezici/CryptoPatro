import requests
from typing import List
from asgiref.sync import sync_to_async
from binance.spot import Spot
from ninja import Router, Body
from ninja.pagination import paginate
from django.shortcuts import (
    aget_list_or_404,
    aget_object_or_404,
    get_list_or_404,
)
from django.conf import settings

from cryptopatro.types import Request
from cryptopatro.auth import SyncTokenAuth
from cryptopatro.users.models import BinanceAuth, TelegramUser
from cryptopatro.exchange.schemas import PortfolioSchema, AssetSchema, PortfolioAssetSchema
from cryptopatro.exchange.models import Portfolio, Asset, PortfolioAsset
from cryptopatro.exchange.tasks import calculate_portfolio_asset_pnls


router = Router()
sync_token_auth = SyncTokenAuth()


@router.get("/portfolios", response=List[PortfolioSchema])
async def portfolios(request: Request):
    return await aget_list_or_404(Portfolio, user_id=request.auth.id)


@router.get("/assets", auth=sync_token_auth, response=List[AssetSchema])
@paginate
def assets(request: Request):
    return get_list_or_404(Asset)


@router.get("/portfolio-assets", response=List[PortfolioAssetSchema])
async def portfolio_assets(request: Request):
    return await aget_list_or_404(
        PortfolioAsset.objects.select_related("portfolio", "asset"),
        portfolio__user_id=request.auth.id,
    )


@router.post("/portfolio-assets", response=PortfolioAssetSchema)
async def create_portfolio_asset(request: Request, portfolio_id: Body[int], asset_id: Body[int]):
    try:
        await Portfolio.objects.aget(id=portfolio_id, user_id=request.auth.id)
    except Portfolio.DoesNotExist:
        return 403, {"detail": "Access denied"}

    await PortfolioAsset.objects.select_related("portfolio", "asset").aget_or_create(
        portfolio_id=portfolio_id,
        asset_id=asset_id,
    )

    return await aget_object_or_404(
        PortfolioAsset.objects.select_related("portfolio", "asset"),
        portfolio_id=portfolio_id,
        asset_id=asset_id,
    )


@router.delete("/portfolio-assets/{id}")
async def delete_portfolio_asset(request: Request, id: int):
    obj = await aget_object_or_404(PortfolioAsset, id=id, portfolio__user_id=request.auth.id)
    await obj.adelete()


@router.get("/refresh", response=str)
async def refresh(request: Request):
    tg = await aget_object_or_404(TelegramUser, user_id=request.auth.id)
    return calculate_portfolio_asset_pnls.delay(tg.id, False).id


# Binance API


@router.get("/info/{pair}", auth=sync_token_auth)
def info(request, pair: str):
    client = Spot(
        api_key=request.auth.binance.api_key,
        api_secret=request.auth.binance.api_secret,
    )
    return client.exchange_info(symbol=pair)


@router.get("/order-book/{pair}", auth=sync_token_auth)
def order_book(request, pair: str):
    client = Spot(
        api_key=request.auth.binance.api_key,
        api_secret=request.auth.binance.api_secret,
    )
    return client.depth(symbol=pair)


@router.get("/recent-trades/{pair}", auth=sync_token_auth)
def recent_trades(request, pair: str):
    client = Spot(
        api_key=request.auth.binance.api_key,
        api_secret=request.auth.binance.api_secret,
    )
    return client.trades(symbol=pair)


@router.get("/current-avg-price/{pair}", auth=sync_token_auth)
def current_avg_price(request, pair: str):
    client = Spot(
        api_key=request.auth.binance.api_key,
        api_secret=request.auth.binance.api_secret,
    )
    return client.avg_price(symbol=pair)


@router.get("/ticker-price-change/{pair}", auth=sync_token_auth)
def ticker_price_change(request, pair: str):
    client = Spot(
        api_key=request.auth.binance.api_key,
        api_secret=request.auth.binance.api_secret,
    )
    return client.ticker_24hr(symbol=pair)


@router.get("/all-orders/{pair}")
async def all_orders(request: Request, pair: str):
    binance_auth = await aget_object_or_404(BinanceAuth, user_id=request.auth.id)
    client = Spot(
        api_key=binance_auth.api_key,
        api_secret=binance_auth.api_secret,
    )
    return await sync_to_async(client.get_orders)(symbol=pair)


@router.get("/open-orders", auth=sync_token_auth)
def open_orders(request):
    client = Spot(
        api_key=request.auth.binance.api_key,
        api_secret=request.auth.binance.api_secret,
    )
    return client.get_open_orders()


@router.get("/account", auth=sync_token_auth)
def account(request):
    client = Spot(
        api_key=request.auth.binance.api_key,
        api_secret=request.auth.binance.api_secret,
    )
    return client.account()


@router.get("/my-trades/{pair}", auth=sync_token_auth)
def my_trades(request, pair: str):
    client = Spot(
        api_key=request.auth.binance.api_key,
        api_secret=request.auth.binance.api_secret,
    )
    return client.my_trades(symbol=pair)


# CryptoPanic API


@router.get("/news", auth=sync_token_auth)
def news(request):
    res = requests.get(
        url="https://cryptopanic.com/api/v1/posts/",
        params={
            "auth_token": settings.CRYPTOPANIC["auth_token"],
            "public": "true",
        },
    )
    return res.json()
