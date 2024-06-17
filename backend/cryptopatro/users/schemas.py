from ninja import ModelSchema

from cryptopatro.users.models import User


class UserSchema(ModelSchema):
    class Meta:
        model = User
        fields = ("id", "created_at", "updated_at", "email", "username")
