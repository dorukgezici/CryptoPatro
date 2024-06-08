from decimal import Decimal
from django.db.models import Sum
from ninja import ModelSchema
from pydantic import field_serializer

from ..utils import sync_executor
from .models import Portfolio, Asset, PortfolioAsset


class PortfolioSchema(ModelSchema):
    total_value: float

    class Meta:
        model = Portfolio
        fields = ("id", "created_at", "updated_at", "user", "name")

    @staticmethod
    def resolve_total_value(obj) -> float:
        async def get_total_value() -> float:
            data = await PortfolioAsset.objects.filter(portfolio_id=obj.id).aaggregate(Sum("value"))
            return float(data["value__sum"])

        return sync_executor(get_total_value)()


class AssetSchema(ModelSchema):
    price: float

    class Meta:
        model = Asset
        fields = ("id", "created_at", "updated_at", "symbol", "name", "price")


class PortfolioAssetSchema(ModelSchema):
    portfolio: PortfolioSchema
    asset: AssetSchema

    amount: float
    value: float
    avg_cost: float
    buy_amount: float
    avg_charge: float
    sell_amount: float
    realized_pnl: float
    unrealized_pnl: float

    class Meta:
        model = PortfolioAsset
        fields = (
            "id",
            "created_at",
            "updated_at",
            "portfolio",
            "asset",
            "amount",
            "value",
            "avg_cost",
            "buy_amount",
            "avg_charge",
            "sell_amount",
            "realized_pnl",
            "unrealized_pnl",
        )
