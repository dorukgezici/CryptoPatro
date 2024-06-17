from ninja.security import HttpBearer

from cryptopatro.users.models import User


class AsyncTokenAuth(HttpBearer):
    async def authenticate(self, request, token) -> User | None:
        return await User.objects.filter(auth_token__key=token).afirst()


class SyncTokenAuth(HttpBearer):
    def authenticate(self, request, token) -> User | None:
        return User.objects.filter(auth_token__key=token).first()
