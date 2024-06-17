from django.contrib import admin
from django.urls import path
from django.utils.translation import gettext_lazy as _

from cryptopatro.api import api

admin.site.site_title = admin.site.site_header = _("CryptoPatro")


urlpatterns = [
    path("admin/", admin.site.urls),
    path("", api.urls),
]
