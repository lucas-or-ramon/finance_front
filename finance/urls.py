from django.urls import path
from . import views

urlpatterns = [
    path('', views.finance, name='finance'),
    path('monthly_summary_url/<int:year>/<int:month>', views.monthly_summary, name='monthly_summary_url'),
    path('expenditures/<int:year>/<int:month>', views.expenditures, name='expenditures'),
    path('revenues/<int:year>/<int:month>', views.revenues, name='revenues'),
    path('years_and_month_to_select_url', views.years_and_month_to_select, name='years_and_month_to_select_url')
]
