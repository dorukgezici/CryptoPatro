from django.conf import settings
from django.db import models
from django.utils.translation import gettext_lazy as _


class Asset(models.Model):
    created_at = models.DateTimeField(auto_now_add=True, verbose_name=_("created at"))
    updated_at = models.DateTimeField(auto_now=True, verbose_name=_("updated at"))

    ticker = models.CharField(max_length=16, verbose_name=_("ticker"))
    name = models.CharField(max_length=32, verbose_name=_("name"))

    @property
    def icon(self) -> str:
        return f'https://cryptoicon-api.vercel.app/api/icon/{self.ticker.lower()}'

    def __str__(self) -> str:
        return self.name


class Portfolio(models.Model):
    created_at = models.DateTimeField(auto_now_add=True, verbose_name=_("created at"))
    updated_at = models.DateTimeField(auto_now=True, verbose_name=_("updated at"))

    user = models.ForeignKey(to=settings.AUTH_USER_MODEL, on_delete=models.CASCADE, verbose_name=_("user"))
    name = models.CharField(max_length=64, verbose_name=_("name"))

    def __str__(self) -> str:
        return f'{self.user} | {self.name}'


class PortfolioAsset(models.Model):
    created_at = models.DateTimeField(auto_now_add=True, verbose_name=_("created at"))
    updated_at = models.DateTimeField(auto_now=True, verbose_name=_("updated at"))

    asset = models.ForeignKey(to=Asset, on_delete=models.CASCADE, verbose_name=_("asset"))
    portfolio = models.ForeignKey(to=Portfolio, on_delete=models.CASCADE, verbose_name=_("portfolio"))

    amount = models.DecimalField(max_digits=64, decimal_places=8, verbose_name=_("amount (quantity)"))
    value = models.DecimalField(max_digits=64, decimal_places=8, verbose_name=_("value (USD)"))

    avg_cost = models.DecimalField(max_digits=64, decimal_places=8, verbose_name=_("average cost"))
    buy_amount = models.DecimalField(max_digits=64, decimal_places=8, verbose_name=_("buy amount"))

    avg_charge = models.DecimalField(max_digits=64, decimal_places=8, verbose_name=_("average charge"))
    sell_amount = models.DecimalField(max_digits=64, decimal_places=8, verbose_name=_("sell amount"))

    realized_pnl = models.DecimalField(max_digits=64, decimal_places=8, verbose_name=_("realized pnl"))
    unrealized_pnl = models.DecimalField(max_digits=64, decimal_places=8, verbose_name=_("unrealized pnl"))

    def __str__(self) -> str:
        return self.asset.name
