from binance.spot import Spot
from django.conf import settings
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView


class PortfolioAPIView(APIView):
    def get(self, request: Request) -> Response:
        client = Spot(key=settings.BINANCE['api_key'], secret=settings.BINANCE['api_secret'])
        return Response(client.account())
