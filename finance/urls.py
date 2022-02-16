from django.urls import path
from . import views

urlpatterns = [
    path('', views.finance, name='finance'),
    path('monthly_summary_url/<int:year>/<int:month>', views.monthly_summary, name='monthly_summary_url'),
    path('get_expenditures/<int:year>/<int:month>', views.expenditures, name='expenditures'),
    path('get_revenues/<int:year>/<int:month>', views.revenues, name='revenues'),
    path('save_revenue/', views.save_revenue, name='save_revenue_url'),
    path('save_expenditure/', views.save_expenditure, name='save_expenditure_url'),
    path('delete_revenue/<str:record_id>', views.delete_revenue, name='delete_revenue_url'),
    path('update_revenue/<str:record_id>', views.update_revenue, name='update_revenue_url'),
    path('delete_expenditure/<str:record_id>', views.delete_expenditure, name='delete_expenditure_url'),
    path('update_expenditure/<str:record_id>', views.update_expenditure, name='update_expenditure_url'),
    path('years_and_month_to_select_url', views.years_and_month_to_select, name='years_and_month_to_select_url')
]
