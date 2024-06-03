import requests
from binance.spot import Spot
from django.conf import settings
from django.db.models import QuerySet
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView, Http404

from ..users.models import TelegramUser
from ..users.permissions import HasBinanceAuth
from .models import Asset, Portfolio, PortfolioAsset
from .serializers import AssetSerializer, PortfolioAssetSerializer, PortfolioSerializer
from .tasks import calculate_portfolio_asset_pnls


class AssetListView(generics.ListAPIView):
    queryset = Asset.objects.all()
    serializer_class = AssetSerializer


class AssetDetailView(generics.RetrieveAPIView):
    queryset = Asset.objects.all()
    serializer_class = AssetSerializer


class PortfolioListView(generics.ListAPIView):
    serializer_class = PortfolioSerializer

    def get_queryset(self) -> QuerySet[Portfolio]:
        return Portfolio.objects.filter(user_id=self.request.user.id)


class PortfolioDetailView(generics.RetrieveAPIView):
    queryset = Portfolio.objects.all()
    serializer_class = PortfolioSerializer


class PortfolioRefreshAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request: Request) -> Response:
        try:
            tg = TelegramUser.objects.get(user_id=request.user.id)
        except:
            raise Http404()

        calculate_portfolio_asset_pnls.delay(tg.id)
        return Response()


class PortfolioAssetListView(generics.ListAPIView):
    serializer_class = PortfolioAssetSerializer

    def get_queryset(self) -> QuerySet[PortfolioAsset]:
        return PortfolioAsset.objects.filter(portfolio__user_id=self.request.user.id)


class PortfolioAssetDetailView(generics.RetrieveAPIView):
    queryset = PortfolioAsset.objects.all()
    serializer_class = PortfolioAssetSerializer


# Binance API


class ExchangeInfoAPIView(APIView):
    permission_classes = [IsAuthenticated, HasBinanceAuth]

    def get(self, request: Request, pair: str = None) -> Response:
        client = Spot(
            api_key=request.user.binance.api_key,
            api_secret=request.user.binance.api_secret,
        )
        return Response(client.exchange_info(symbol=pair))


class OrderBookAPIView(APIView):
    permission_classes = [IsAuthenticated, HasBinanceAuth]

    def get(self, request: Request, pair: str) -> Response:
        client = Spot(
            api_key=request.user.binance.api_key,
            api_secret=request.user.binance.api_secret,
        )
        return Response(client.depth(symbol=pair))


class RecentTradesAPIView(APIView):
    permission_classes = [IsAuthenticated, HasBinanceAuth]

    def get(self, request: Request, pair: str) -> Response:
        client = Spot(
            api_key=request.user.binance.api_key,
            api_secret=request.user.binance.api_secret,
        )
        return Response(client.trades(symbol=pair))


class CurrentAvgPriceAPIView(APIView):
    permission_classes = [IsAuthenticated, HasBinanceAuth]

    def get(self, request: Request, pair: str) -> Response:
        client = Spot(
            api_key=request.user.binance.api_key,
            api_secret=request.user.binance.api_secret,
        )
        return Response(client.avg_price(symbol=pair))


class TickerPriceChangeAPIView(APIView):
    permission_classes = [IsAuthenticated, HasBinanceAuth]

    def get(self, request: Request, pair: str) -> Response:
        client = Spot(
            api_key=request.user.binance.api_key,
            api_secret=request.user.binance.api_secret,
        )
        return Response(client.ticker_24hr(symbol=pair))


class AllOrderListAPIView(APIView):
    permission_classes = [IsAuthenticated, HasBinanceAuth]

    def get(self, request: Request, pair: str) -> Response:
        client = Spot(
            api_key=request.user.binance.api_key,
            api_secret=request.user.binance.api_secret,
        )
        return Response(client.get_orders(symbol=pair))


class OpenOrderListAPIView(APIView):
    permission_classes = [IsAuthenticated, HasBinanceAuth]

    def get(self, request: Request) -> Response:
        client = Spot(
            api_key=request.user.binance.api_key,
            api_secret=request.user.binance.api_secret,
        )
        return Response(client.get_open_orders())


class AccountAPIView(APIView):
    permission_classes = [IsAuthenticated, HasBinanceAuth]

    def get(self, request: Request) -> Response:
        client = Spot(
            api_key=request.user.binance.api_key,
            api_secret=request.user.binance.api_secret,
        )
        return Response(client.account())


class MyTradesAPIView(APIView):
    permission_classes = [IsAuthenticated, HasBinanceAuth]

    def get(self, request: Request, pair: str) -> Response:
        client = Spot(
            api_key=request.user.binance.api_key,
            api_secret=request.user.binance.api_secret,
        )
        return Response(client.my_trades(symbol=pair))


# CryptoPanic API


class NewsAPIView(APIView):
    def get(self, request: Request) -> Response:
        r = requests.get(
            url="https://cryptopanic.com/api/v1/posts/",
            params={
                "auth_token": settings.CRYPTOPANIC["auth_token"],
                "public": "true",
            },
        )
        return Response(r.json())
