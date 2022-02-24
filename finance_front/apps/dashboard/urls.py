from django.urls import path
from . import views

urlpatterns = [
    path('', views.dashboard, name="dashboard"),

    path('monthly_summary_url/<int:year>/<int:month>', views.summary_current_month, name='summary_current_month_url'),

    path('summary_last_twelve_months_url/<int:year>/<int:month>', views.summary_last_twelve_months,
         name='summary_last_twelve_months_url'),

    path('five_higher_expenditures_url/<int:year>/<int:month>', views.five_higher_expenditures,
         name='five_higher_expenditures_url'),

    path('five_higher_revenues_url/<int:year>/<int:month>', views.five_higher_revenues,
         name='five_higher_revenues_url'),

    path('years_and_month_to_select_url', views.years_and_month_to_select, name='years_and_month_to_select_url')
]