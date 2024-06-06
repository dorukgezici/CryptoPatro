from django.contrib import admin
from django.http import HttpRequest, HttpResponse
from django.urls import include, path
from django.utils.translation import gettext_lazy as _

from .api import api

admin.site.site_title = admin.site.site_header = _("CryptoPatro")


def health_check(request: HttpRequest) -> HttpResponse:
    return HttpResponse(status=200)


urlpatterns = [
    path("admin/", admin.site.urls),
    path("health/", health_check),
    path("api/", api.urls),
]
