from django.urls import path

from . import views

urlpatterns = [
    path('', views.UserDetailView.as_view()),
]
