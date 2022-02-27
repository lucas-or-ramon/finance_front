from django.urls import path
from . import views

urlpatterns = [
    path('', views.dashboard, name="dashboard"),

    path('monthly_resume/<int:year>/<int:month>', views.resume_current_month),

    path('resume_last_twelve_months/<int:year>/<int:month>', views.resume_last_twelve_months),

    path('five_higher_expenditures/<int:year>/<int:month>', views.five_higher_expenditures),

    path('five_higher_revenues/<int:year>/<int:month>', views.five_higher_revenues),

    path('years_and_month_to_select', views.years_and_month_to_select)
]
