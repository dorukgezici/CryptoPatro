from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class ExchangeConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'exchange'
    verbose_name = _("Exchange")
