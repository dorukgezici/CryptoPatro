from django.urls import path

from . import views

urlpatterns = [
    path("assets/", views.AssetListView.as_view()),
    path("assets/<int:pk>/", views.AssetDetailView.as_view()),
    path("portfolios/", views.PortfolioListView.as_view()),
    path("portfolios/<int:pk>/", views.PortfolioDetailView.as_view()),
    path("portfolios/refresh/", views.PortfolioRefreshAPIView.as_view()),
    path("portfolio_assets/", views.PortfolioAssetListView.as_view()),
    path("portfolio_assets/<int:pk>/", views.PortfolioAssetDetailView.as_view()),
    # Binance APIs
    path("exchange_info/", views.ExchangeInfoAPIView.as_view()),
    path("exchange_info/<str:pair>/", views.ExchangeInfoAPIView.as_view()),
    path("order_book/<str:pair>/", views.OrderBookAPIView.as_view()),
    path("recent_trades/<str:pair>/", views.RecentTradesAPIView.as_view()),
    path("current_avg_price/<str:pair>/", views.CurrentAvgPriceAPIView.as_view()),
    path("ticker_price_change/<str:pair>/", views.TickerPriceChangeAPIView.as_view()),
    path("all_order_list/<str:pair>/", views.AllOrderListAPIView.as_view()),
    path("open_order_list/", views.OpenOrderListAPIView.as_view()),
    path("account/", views.AccountAPIView.as_view()),
    path("my_trades/<str:pair>/", views.MyTradesAPIView.as_view()),
    # external APIs
    path("news/", views.NewsAPIView.as_view()),
]
