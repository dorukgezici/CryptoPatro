from ninja import Router
from django.shortcuts import aget_object_or_404

from cryptopatro.types import Request
from cryptopatro.users.schemas import UserSchema
from cryptopatro.users.models import User


router = Router()


@router.get("/me", response=UserSchema)
async def user(request: Request):
    return await aget_object_or_404(User, id=request.auth.id)
