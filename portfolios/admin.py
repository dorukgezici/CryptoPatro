from django.contrib import admin

from . import models


@admin.register(models.Asset)
class AssetAdmin(admin.ModelAdmin):
    pass


@admin.register(models.Portfolio)
class PortfolioAdmin(admin.ModelAdmin):
    pass


@admin.register(models.PortfolioAsset)
class PortfolioAssetAdmin(admin.ModelAdmin):
    pass
