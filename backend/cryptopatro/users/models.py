import binascii
import os

from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _
from django.conf import settings


class Token(models.Model):
    created_at = models.DateTimeField(auto_now_add=True, verbose_name=_("created at"))
    updated_at = models.DateTimeField(auto_now=True, verbose_name=_("updated at"))

    key = models.CharField(_("Key"), max_length=40, primary_key=True)
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        related_name="auth_token",
        on_delete=models.CASCADE,
        verbose_name=_("User"),
    )

    def save(self, *args, **kwargs):
        if not self.key:
            self.key = self.generate_key()
        return super().save(*args, **kwargs)

    @classmethod
    def generate_key(cls):
        return binascii.hexlify(os.urandom(20)).decode()

    def __str__(self):
        return self.key


class User(AbstractUser):
    id: int
    tg: "TelegramUser"
    binance: "BinanceAuth"

    created_at = models.DateTimeField(auto_now_add=True, verbose_name=_("created at"))
    updated_at = models.DateTimeField(auto_now=True, verbose_name=_("updated at"))

    def create_token(self) -> Token:
        return Token.objects.create(user=self)

    def __str__(self) -> str:
        return self.username


class TelegramUser(models.Model):
    created_at = models.DateTimeField(auto_now_add=True, verbose_name=_("created at"))
    updated_at = models.DateTimeField(auto_now=True, verbose_name=_("updated at"))

    id = models.CharField(primary_key=True, max_length=16)
    user = models.OneToOneField(User, related_name="tg", on_delete=models.CASCADE, verbose_name=_("user"))

    def __str__(self) -> str:
        return self.user.username


class BinanceAuth(models.Model):
    created_at = models.DateTimeField(auto_now_add=True, verbose_name=_("created at"))
    updated_at = models.DateTimeField(auto_now=True, verbose_name=_("updated at"))

    user = models.OneToOneField(User, related_name="binance", on_delete=models.CASCADE, verbose_name=_("user"))
    api_key = models.CharField(max_length=256, verbose_name=_("api key"))
    api_secret = models.CharField(max_length=256, verbose_name=_("api secret"))

    def __str__(self) -> str:
        return self.user.username

    # def save(self, *args, **kwargs) -> None:
    #     cipher = AES.new(settings.SECRET_KEY.encode(), AES.MODE_EAX)
    #     ciphertext, tag = cipher.encrypt_and_digest(data)
    #     self.api_key = aes.encrypt(self.api_key)
    #     self.api_secret = aes.encrypt(self.api_secret)
    #
    #
    #     super().save(*args, **kwargs)
    #
    # def get_decrypted_api_key(self) -> str:
    #     aes = pyaes.AESModeOfOperationCTR(settings.SECRET_KEY.encode())
    #     print('API KEY:', self.api_key)
    #     return aes.decrypt(self.api_key).decode()
    #
    # def get_decrypted_api_secret(self) -> str:
    #     aes = pyaes.AESModeOfOperationCTR(settings.SECRET_KEY.encode())
    #     print('API SECRET:', self.api_secret)
    #     return aes.decrypt(self.api_secret).decode()
