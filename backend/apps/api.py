from ninja import NinjaAPI
from ninja.security import HttpBearer
from .users.models import Token


class GlobalAuth(HttpBearer):
    def authenticate(self, request, token):
        obj = Token.objects.filter(key=token).first()
        if obj:
            return obj.user


api = NinjaAPI(auth=GlobalAuth())
api.add_router("/exchange/", "apps.exchange.api.router")


@api.get("/health", auth=None)
def health(request):
    return {"status": "ok"}
