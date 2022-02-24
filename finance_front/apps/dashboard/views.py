from django.shortcuts import render
from django.http import JsonResponse

from . import service
from ... import service as main_service

EXPENDITURE = "despesas"
REVENUES = "receitas"
SUMMARY = "resumo"


def dashboard(request):
    return render(request, 'dashboard/dashboard.html')


def summary_current_month(request, year, month):
    return JsonResponse(service.get_summary_current_month(SUMMARY, year, month))


def summary_last_twelve_months(request, year, month):
    return JsonResponse(service.get_summary_last_twelve_months(SUMMARY, year, month))


def five_higher_expenditures(request, year, month):
    return JsonResponse(service.get_five_higher(EXPENDITURE, year, month))


def five_higher_revenues(request, year, month):
    return JsonResponse(service.get_five_higher(REVENUES, year, month))


def years_and_month_to_select(request):
    return JsonResponse(main_service.get_years_and_month_to_select())
