from ninja import NinjaAPI
from ninja.security import HttpBearer
from django.shortcuts import aget_object_or_404
from django_celery_results.models import TaskResult
from .users.models import User
from .types import HttpRequest, Request


class TokenAuth(HttpBearer):
    def authenticate(self, request, token) -> User | None:
        return User.objects.filter(auth_token__key=token).first()


class AsyncTokenAuth(HttpBearer):
    async def authenticate(self, request, token) -> User | None:
        return await User.objects.filter(auth_token__key=token).afirst()


api = NinjaAPI(auth=AsyncTokenAuth())
api.add_router("/exchange/", "cryptopatro.exchange.api.router")


@api.get("/health", auth=None)
async def health(request: HttpRequest):
    return {"status": "ok"}


@api.get("/tasks/{task_id}", response=str)
async def tasks(request: Request, task_id: str):
    return (await aget_object_or_404(TaskResult, task_id=task_id)).status
