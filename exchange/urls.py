from django.urls import path

from . import views

urlpatterns = [
    path('assets/', views.AssetListView.as_view()),
    path('assets/<int:pk>/', views.AssetDetailView.as_view()),
    path('portfolios/', views.PortfolioListView.as_view()),
    path('portfolios/<int:pk>/', views.PortfolioDetailView.as_view()),
    path('portfolio_assets/', views.PortfolioAssetListView.as_view()),
    path('portfolio_assets/<int:pk>/', views.PortfolioAssetDetailView.as_view()),
    # Binance APIs
    path('account/', views.AccountAPIView.as_view()),
    path('order_book/<str:pair>/', views.OrderBookAPIView.as_view()),
    path('recent_trades/<str:pair>/', views.RecentTradesAPIView.as_view()),
    path('current_avg_price/<str:pair>/', views.CurrentAvgPriceAPIView.as_view()),
]
