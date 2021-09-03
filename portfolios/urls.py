from django.urls import path
from .views import PortfolioAPIView

urlpatterns = [
    path('', PortfolioAPIView.as_view()),
]
