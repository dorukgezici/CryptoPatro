from django.contrib.auth.models import AbstractUser
from rest_framework.authtoken.models import Token


class User(AbstractUser):
    def create_token(self) -> Token:
        return Token.objects.create(user=self)
