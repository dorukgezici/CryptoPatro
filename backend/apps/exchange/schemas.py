from decimal import Decimal
from ninja import ModelSchema, Field
from .models import Portfolio, Asset, PortfolioAsset


class PortfolioSchema(ModelSchema):
    total_value: Decimal

    class Meta:
        model = Portfolio
        fields = ("id", "created_at", "updated_at", "user", "name")


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
