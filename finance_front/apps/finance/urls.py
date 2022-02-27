from django.urls import path
from . import views

urlpatterns = [
    path('', views.finance, name='finance'),
    path('monthly_resume/<int:year>/<int:month>', views.monthly_resume, name='monthly_resume_url'),
    path('expenditures/<int:year>/<int:month>', views.expenditures, name='expenditures'),
    path('revenues/<int:year>/<int:month>', views.revenues, name='revenues'),
    path('years_and_month_to_select', views.years_and_month_to_select, name='years_and_month_to_select_url')
]
