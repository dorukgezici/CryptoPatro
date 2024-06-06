from django.contrib import admin

from . import models


@admin.register(models.Portfolio)
class PortfolioAdmin(admin.ModelAdmin):
    list_display = ["user", "name"]
    list_filter = ["created_at", "updated_at"]
    search_fields = ["user", "name"]
    autocomplete_fields = ["user"]


@admin.register(models.Asset)
class AssetAdmin(admin.ModelAdmin):
    list_display = ["symbol", "name", "price", "icon"]
    list_filter = ["created_at", "updated_at"]
    search_fields = ["symbol", "name"]


@admin.register(models.PortfolioAsset)
class PortfolioAssetAdmin(admin.ModelAdmin):
    list_display = [
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
    ]
    list_filter = ["created_at", "updated_at"]
    autocomplete_fields = ["portfolio", "asset"]
