from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from cryptopatro.exchange.models import BinanceAuth, TelegramUser, Token, User


@admin.register(Token)
class TokenAdmin(admin.ModelAdmin):
    list_filter = ("created_at", "updated_at")
    list_display = ("key", "user", "created_at")
    fields = ("user",)


@admin.register(User)
class UserAdmin(UserAdmin):
    list_filter = ["is_staff", "is_superuser", "created_at", "updated_at"]


@admin.register(TelegramUser)
class TelegramUserAdmin(admin.ModelAdmin):
    list_display = ["id", "user"]
    list_filter = ["created_at", "updated_at"]


@admin.register(BinanceAuth)
class BinanceAuthAdmin(admin.ModelAdmin):
    list_filter = ["created_at", "updated_at"]
