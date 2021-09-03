from django.conf import settings
from django.db import models
from django.utils.translation import gettext_lazy as _


class Asset(models.Model):
    created_at = models.DateTimeField(auto_now_add=True, verbose_name=_("created at"))
    updated_at = models.DateTimeField(auto_now=True, verbose_name=_("updated at"))

    ticker = models.CharField(max_length=16, verbose_name=_("ticker"))
    name = models.CharField(max_length=32, verbose_name=_("name"))
    icon = models.ImageField(verbose_name=_("icon"))

    def __str__(self) -> str:
        return self.name


class Portfolio(models.Model):
    created_at = models.DateTimeField(auto_now_add=True, verbose_name=_("created at"))
    updated_at = models.DateTimeField(auto_now=True, verbose_name=_("updated at"))

    user = models.ForeignKey(to=settings.AUTH_USER_MODEL, on_delete=models.CASCADE, verbose_name=_("user"))
    name = models.CharField(max_length=64, verbose_name=_("name"))

    def __str__(self) -> str:
        return self.name


class PortfolioAsset(models.Model):
    created_at = models.DateTimeField(auto_now_add=True, verbose_name=_("created at"))
    updated_at = models.DateTimeField(auto_now=True, verbose_name=_("updated at"))

    portfolio = models.ForeignKey(to=Portfolio, on_delete=models.CASCADE, verbose_name=_("portfolio"))
    asset = models.ForeignKey(to=Asset, on_delete=models.CASCADE, verbose_name=_("asset"))

    amount = models.DecimalField(max_digits=64, decimal_places=8, verbose_name=_("amount"))
    avg_cost = models.DecimalField(max_digits=64, decimal_places=8, verbose_name=_("average cost"))

    def __str__(self) -> str:
        return self.asset.name
