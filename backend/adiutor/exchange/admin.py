from django.contrib import admin

from . import models


@admin.register(models.Asset)
class AssetAdmin(admin.ModelAdmin):
    list_display = ['symbol', 'name', 'price']
    list_filter = ['created_at', 'updated_at']


@admin.register(models.Portfolio)
class PortfolioAdmin(admin.ModelAdmin):
    list_display = ['user', 'name']
    list_filter = ['created_at', 'updated_at']


@admin.register(models.PortfolioAsset)
class PortfolioAssetAdmin(admin.ModelAdmin):
    list_display = ['asset', 'portfolio', 'amount', 'avg_cost']
    list_filter = ['created_at', 'updated_at']
