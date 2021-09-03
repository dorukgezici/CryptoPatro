from django.urls import path

from . import views

urlpatterns = [
    path('assets/', views.AssetListView.as_view()),
    path('assets/<int:pk>/', views.AssetDetailView.as_view()),
    path('portfolios/', views.PortfolioListView.as_view()),
    path('portfolios/<int:pk>/', views.PortfolioDetailView.as_view()),
    path('', views.PortfolioAPIView.as_view()),
]
