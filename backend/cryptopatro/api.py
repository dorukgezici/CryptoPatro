from ninja import NinjaAPI
from django.shortcuts import aget_object_or_404
from django_celery_results.models import TaskResult

from .types import HttpRequest, Request
from .auth import AsyncTokenAuth


api = NinjaAPI(auth=AsyncTokenAuth())
api.add_router("/exchange/", "cryptopatro.exchange.api.router")


@api.get("/health", auth=None)
async def health(request: HttpRequest):
    return {"status": "ok"}


@api.get("/tasks/{task_id}", response=str)
async def tasks(request: Request, task_id: str):
    return (await aget_object_or_404(TaskResult, task_id=task_id)).status
