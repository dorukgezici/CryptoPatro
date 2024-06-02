from typing import Optional

from binance.error import ClientError
from binance.spot import Spot
from rest_framework import serializers
from rest_framework.request import Request

from .models import Asset, Portfolio, PortfolioAsset


class AssetSerializer(serializers.ModelSerializer):
    price = serializers.DecimalField(max_digits=64, decimal_places=2)
    price_change = serializers.SerializerMethodField()

    class Meta:
        model = Asset
        fields = [
            "id",
            "symbol",
            "name",
            "icon",
            "price",
            "price_change",
        ]

    def get_price_change(self, obj: Asset) -> str:
        request: Optional[Request] = self.context.get("request")
        if request is None or not hasattr(request.user, "binance"):
            return ""

        client = Spot(
            api_key=request.user.binance.api_key,
            api_secret=request.user.binance.api_secret,
        )

        try:
            return client.ticker_24hr(f"{obj.symbol}USDT")
        except ClientError as e:
            return ""


class PortfolioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Portfolio
        fields = "__all__"


class PortfolioAssetSerializer(serializers.ModelSerializer):
    portfolio = PortfolioSerializer()
    asset = AssetSerializer()

    amount = serializers.DecimalField(max_digits=64, decimal_places=2)
    value = serializers.DecimalField(max_digits=64, decimal_places=2)
    avg_cost = serializers.DecimalField(max_digits=64, decimal_places=2)
    avg_charge = serializers.DecimalField(max_digits=64, decimal_places=2)
    realized_pnl = serializers.DecimalField(max_digits=64, decimal_places=2)
    unrealized_pnl = serializers.DecimalField(max_digits=64, decimal_places=2)

    class Meta:
        model = PortfolioAsset
        fields = "__all__"
