from binance.error import ClientError
from binance.spot import Spot
from django.conf import settings
from rest_framework import serializers

from .models import Asset, Portfolio, PortfolioAsset


class AssetSerializer(serializers.ModelSerializer):
    price_change = serializers.SerializerMethodField()

    class Meta:
        model = Asset
        fields = [
            'id',
            'ticker',
            'name',
            'icon',
            'price_change',
        ]

    def get_price_change(self, obj: Asset) -> str:
        client = Spot(key=settings.BINANCE['api_key'], secret=settings.BINANCE['api_secret'])

        try:
            return client.ticker_24hr(f'{obj.ticker}USDT')
        except ClientError as e:
            return ''


class PortfolioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Portfolio
        fields = '__all__'


class PortfolioAssetSerializer(serializers.ModelSerializer):
    class Meta:
        model = PortfolioAsset
        fields = '__all__'
