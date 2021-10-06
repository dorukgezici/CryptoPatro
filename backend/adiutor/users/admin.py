from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from rest_framework.authtoken.admin import TokenAdmin

from .models import BinanceAuth, User

TokenAdmin.raw_id_fields = ['user']


@admin.register(User)
class UserAdmin(UserAdmin):
    pass


@admin.register(BinanceAuth)
class BinanceAuthAdmin(admin.ModelAdmin):
    pass
