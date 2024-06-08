from ninja import NinjaAPI
from ninja.security import HttpBearer
from .users.models import Token, User


class TokenAuth(HttpBearer):
    async def authenticate(self, request, token) -> User | None:
        return await User.objects.filter(auth_token__key=token).afirst()


api = NinjaAPI(auth=TokenAuth())
api.add_router("/exchange/", "apps.exchange.api.router")


@api.get("/health", auth=None)
async def health(request):
    return {"status": "ok"}
