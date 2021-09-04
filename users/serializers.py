from collections import OrderedDict

from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError as DjangoValidationError
from django.utils.translation import gettext_lazy as _
from rest_framework import serializers

from .models import User


class MeSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(required=False)

    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'first_name',
            'last_name',
            'email',
            'password',
            'password2',
        ]

        extra_kwargs = {
            'password': {
                'required': False,
                'write_only': True,
            },
        }

    def get_fields(self) -> OrderedDict:
        fields = super().get_fields()
        request = self.context.get('request')

        if getattr(request, 'method', str()).upper() in ['PUT', 'PATCH']:
            fields['username'].read_only = True
        else:
            fields['password'].required = True

        return fields

    def validate(self, attrs: dict) -> dict:
        password = attrs.get('password')
        password2 = attrs.get('password2')

        if password is not None:
            if password2 is None:
                raise serializers.ValidationError({'password2': [_("You must confirm your password.")]})

            if password != password2:
                raise serializers.ValidationError({'password': [_("Your passwords do not match.")]})

            try:
                validate_password(password)
            except DjangoValidationError as e:
                raise serializers.ValidationError({'password': e.messages})

            attrs.pop('password2')

        return attrs
