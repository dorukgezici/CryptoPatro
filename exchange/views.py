from binance.spot import Spot
from django.conf import settings
from django.db.models import QuerySet
from rest_framework import generics
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Asset, Portfolio, PortfolioAsset
from .serializers import AssetSerializer, PortfolioSerializer, PortfolioAssetSerializer


class AssetListView(generics.ListAPIView):
    queryset = Asset.objects.all()
    serializer_class = AssetSerializer


class AssetDetailView(generics.RetrieveAPIView):
    queryset = Asset.objects.all()
    serializer_class = AssetSerializer


class PortfolioListView(generics.ListAPIView):
    serializer_class = PortfolioSerializer

    def get_queryset(self) -> QuerySet[Portfolio]:
        return Portfolio.objects.filter(user=self.request.user)


class PortfolioDetailView(generics.RetrieveAPIView):
    queryset = Portfolio.objects.all()
    serializer_class = PortfolioSerializer


class PortfolioAssetListView(generics.ListAPIView):
    serializer_class = PortfolioAssetSerializer

    def get_queryset(self) -> QuerySet[PortfolioAsset]:
        return PortfolioAsset.objects.filter(portfolio__user=self.request.user)


class PortfolioAssetDetailView(generics.RetrieveAPIView):
    queryset = PortfolioAsset.objects.all()
    serializer_class = PortfolioAssetSerializer


class AccountAPIView(APIView):
    def get(self, request: Request) -> Response:
        client = Spot(key=settings.BINANCE['api_key'], secret=settings.BINANCE['api_secret'])
        return Response(client.account())


class OrderBookAPIView(APIView):
    def get(self, request: Request, pair: str) -> Response:
        client = Spot(key=settings.BINANCE['api_key'], secret=settings.BINANCE['api_secret'])
        return Response(client.depth(symbol=pair))


class RecentTradesAPIView(APIView):
    def get(self, request: Request, pair: str) -> Response:
        client = Spot(key=settings.BINANCE['api_key'], secret=settings.BINANCE['api_secret'])
        return Response(client.trades(symbol=pair))


class CurrentAvgPriceAPIView(APIView):
    def get(self, request: Request, pair: str) -> Response:
        client = Spot(key=settings.BINANCE['api_key'], secret=settings.BINANCE['api_secret'])
        return Response(client.avg_price(symbol=pair))
