from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token

from . import views

urlpatterns = [
    # auth
    path('sign-up/', views.SignUpView.as_view()),
    path('sign-in/', obtain_auth_token),
    path('sign-out/', views.SignOutView.as_view()),
    # users
    path('me/', views.MeView.as_view()),
    path('', views.UserListView.as_view()),
    path('<int:pk>/', views.UserDetailView.as_view()),
]
