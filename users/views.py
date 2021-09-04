from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .models import User
from .serializers import MeSerializer, UserSerializer


class MeView(generics.RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = MeSerializer

    def get_object(self) -> User:
        return self.request.user


class UserDetailView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
