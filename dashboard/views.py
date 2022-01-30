from django.shortcuts import render
from django.http import JsonResponse
from .service import utils

EXPENDITURE = "despesas"
REVENUES = "receitas"
SUMMARY = "resumo"


def dashboard(request):
    return render(request, 'dashboard.html')


def summary_current_month(request, year, month):
    return JsonResponse(utils.get_summary_current_month(SUMMARY, year, month))


def summary_last_twelve_months(request, year, month):
    return JsonResponse(utils.get_summary_last_twelve_months(SUMMARY, year, month))


def five_higher_expenditures(request, year, month):
    expenditure = utils.get_five_higher(EXPENDITURE, year, month)
    return JsonResponse({"data": expenditure[0], "labels": expenditure[1]})


def five_higher_revenues(request, year, month):
    revenues = utils.get_five_higher(REVENUES, year, month)
    return JsonResponse({"data": revenues[0], "labels": revenues[1]})


def years_and_month_to_select(request):
    years_months = utils.get_years_and_month_to_select()
    return JsonResponse({"years": years_months[0], "months": years_months[1]})
