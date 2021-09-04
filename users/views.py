from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import MeSerializer
from .models import User


class UserDetailView(APIView):
    def get(self, request: Request) -> Response:
        return Response()


class MeView(generics.RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = MeSerializer

    def get_object(self) -> User:
        return self.request.user
