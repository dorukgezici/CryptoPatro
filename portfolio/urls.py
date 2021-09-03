from django.urls import path
from .views import PortfolioView

urlpatterns = [
    path('', PortfolioView.as_view()),
]
