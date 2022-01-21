from django.urls import path
from . import views

urlpatterns = [
    path('', views.finance, name='finance'),
    path('expenditure', views.expenditure, name='expenditure')
]