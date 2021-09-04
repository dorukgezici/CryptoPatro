from django.urls import path

from . import views

urlpatterns = [
    path('me/', views.MeView.as_view()),
    path('<int:pk>/', views.UserDetailView.as_view()),
]
