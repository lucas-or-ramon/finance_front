from django.urls import path
from . import views

urlpatterns = [
    path('', views.dashboard, name="dashboard"),

    path('summary_current_month_url', views.summary_current_month_url,
         name='summary_current_month_url'),

    path('total_last_twelve_months_url', views.total_last_twelve_months,
         name='total_last_twelve_months_url'),

    path('five_higher_expenditures_url', views.five_higher_expenditures, name='five_higher_expenditures_url'),

    path('five_higher_revenues_url', views.five_higher_revenues, name='five_higher_revenues_url'),

    path('years_and_month_to_select_url', views.years_and_month_to_select, name='years_and_month_to_select_url')
]
