from django.http.request import HttpRequest
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from .users.models import User


class Request(HttpRequest):
    auth: "User"
