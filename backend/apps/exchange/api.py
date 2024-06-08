import requests
from typing import List
from binance.spot import Spot
from ninja import Router
from django.shortcuts import get_object_or_404
from django.conf import settings

from ..users.models import TelegramUser
from .schemas import AssetSchema, PortfolioAssetSchema
from .models import Asset, PortfolioAsset
from .tasks import calculate_portfolio_asset_pnls

router = Router()


@router.get("/assets", response=List[AssetSchema])
def assets(request):
    return Asset.objects.all()


@router.get("/portfolio-assets", response=List[PortfolioAssetSchema])
def portfolio_assets(request):
    return PortfolioAsset.objects.all()


@router.get("/refresh")
def refresh(request):
    tg = get_object_or_404(TelegramUser, user_id=request.user.id)
    calculate_portfolio_asset_pnls.delay(tg.id)


# Binance API


@router.get("/info/{pair}")
def info(request, pair: str):
    client = Spot(
        api_key=request.user.binance.api_key,
        api_secret=request.user.binance.api_secret,
    )
    return client.exchange_info(symbol=pair)


@router.get("/order-book/{pair}")
def order_book(request, pair: str):
    client = Spot(
        api_key=request.user.binance.api_key,
        api_secret=request.user.binance.api_secret,
    )
    return client.depth(symbol=pair)


@router.get("/recent-trades/{pair}")
def recent_trades(request, pair: str):
    client = Spot(
        api_key=request.user.binance.api_key,
        api_secret=request.user.binance.api_secret,
    )
    return client.trades(symbol=pair)


@router.get("/current-avg-price/{pair}")
def current_avg_price(request, pair: str):
    client = Spot(
        api_key=request.user.binance.api_key,
        api_secret=request.user.binance.api_secret,
    )
    return client.avg_price(symbol=pair)


@router.get("/ticker-price-change/{pair}")
def ticker_price_change(request, pair: str):
    client = Spot(
        api_key=request.user.binance.api_key,
        api_secret=request.user.binance.api_secret,
    )
    return client.ticker_24hr(symbol=pair)


@router.get("/all-orders/{pair}")
def all_orders(request, pair: str):
    client = Spot(
        api_key=request.user.binance.api_key,
        api_secret=request.user.binance.api_secret,
    )
    return client.get_orders(symbol=pair)


@router.get("/open-orders")
def open_orders(request):
    client = Spot(
        api_key=request.user.binance.api_key,
        api_secret=request.user.binance.api_secret,
    )
    return client.get_open_orders()


@router.get("/account")
def account(request):
    client = Spot(
        api_key=request.user.binance.api_key,
        api_secret=request.user.binance.api_secret,
    )
    return client.account()


@router.get("/my-trades/{pair}")
def my_trades(request, pair: str):
    client = Spot(
        api_key=request.user.binance.api_key,
        api_secret=request.user.binance.api_secret,
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
