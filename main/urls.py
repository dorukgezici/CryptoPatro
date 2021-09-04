from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api-token-auth/', obtain_auth_token),
    path('users/', include('users.urls')),
    path('', include('exchange.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
