import requests
from typing import List
from asgiref.sync import sync_to_async
from binance.spot import Spot
from ninja import Router, Form, Body
from ninja.pagination import paginate
from django.shortcuts import aget_list_or_404, aget_object_or_404, get_list_or_404, get_object_or_404
from django.conf import settings

from ..types import Request
from ..api import TokenAuth
from ..users.models import BinanceAuth, User, TelegramUser
from .schemas import PortfolioSchema, AssetSchema, PortfolioAssetSchema
from .models import Portfolio, Asset, PortfolioAsset
from .tasks import calculate_portfolio_asset_pnls


router = Router()


@router.get("/portfolios", response=List[PortfolioSchema])
async def portfolios(request: Request):
    return await aget_list_or_404(Portfolio, user_id=request.auth.id)


@router.get("/assets", response=List[AssetSchema], auth=TokenAuth())
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
        portfolio = await Portfolio.objects.aget(id=portfolio_id, user_id=request.auth.id)
    except Portfolio.DoesNotExist:
        return 403, {"detail": "Access denied"}

    await PortfolioAsset.objects.select_related("portfolio", "asset").aget_or_create(
        portfolio_id=portfolio_id,
        asset_id=asset_id,
    )

    return await aget_object_or_404(
        PortfolioAsset.objects.select_related("portfolio", "asset"), portfolio_id=portfolio_id, asset_id=asset_id
    )


@router.delete("/portfolio-assets/{id}")
async def delete_portfolio_asset(request: Request, id: int):
    obj = await aget_object_or_404(PortfolioAsset, id=id, portfolio__user_id=request.auth.id)
    await obj.adelete()


@router.get("/refresh", response=str)
async def refresh(request: Request):
    tg = await aget_object_or_404(TelegramUser, user_id=request.auth.id)
    return calculate_portfolio_asset_pnls.delay(tg.id).id


# Binance API


@router.get("/info/{pair}")
def info(request, pair: str):
    client = Spot(
        api_key=request.auth.binance.api_key,
        api_secret=request.auth.binance.api_secret,
    )
    return client.exchange_info(symbol=pair)


@router.get("/order-book/{pair}")
def order_book(request, pair: str):
    client = Spot(
        api_key=request.auth.binance.api_key,
        api_secret=request.auth.binance.api_secret,
    )
    return client.depth(symbol=pair)


@router.get("/recent-trades/{pair}")
def recent_trades(request, pair: str):
    client = Spot(
        api_key=request.auth.binance.api_key,
        api_secret=request.auth.binance.api_secret,
    )
    return client.trades(symbol=pair)


@router.get("/current-avg-price/{pair}")
def current_avg_price(request, pair: str):
    client = Spot(
        api_key=request.auth.binance.api_key,
        api_secret=request.auth.binance.api_secret,
    )
    return client.avg_price(symbol=pair)


@router.get("/ticker-price-change/{pair}")
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


@router.get("/open-orders")
def open_orders(request):
    client = Spot(
        api_key=request.auth.binance.api_key,
        api_secret=request.auth.binance.api_secret,
    )
    return client.get_open_orders()


@router.get("/account")
def account(request):
    client = Spot(
        api_key=request.auth.binance.api_key,
        api_secret=request.auth.binance.api_secret,
    )
    return client.account()


@router.get("/my-trades/{pair}")
def my_trades(request, pair: str):
    client = Spot(
        api_key=request.auth.binance.api_key,
        api_secret=request.auth.binance.api_secret,
    )
    return client.my_trades(symbol=pair)


# CryptoPanic API


@router.get("/news")
def news(request):
    res = requests.get(
        url="https://cryptopanic.com/api/v1/posts/",
        params={
            "auth_token": settings.CRYPTOPANIC["auth_token"],
            "public": "true",
        },
    )
    return res.json()
