from django.shortcuts import render
from django.http import JsonResponse
from .service import utils

EXPENDITURE = "despesas"
REVENUES = "receitas"
SUMMARY = "resumo"


def dashboard(request):
    return render(request, 'dashboard.html')


def summary_current_month(request):
    return JsonResponse(utils.get_summary_current_month(SUMMARY))


def summary_last_twelve_months(request):
    return JsonResponse(utils.get_summary_last_twelve_months(SUMMARY))


def five_higher_expenditures(request):
    expenditure = utils.get_five_higher(EXPENDITURE)
    return JsonResponse({"data": expenditure[0], "labels": expenditure[1]})


def five_higher_revenues(request):
    revenues = utils.get_five_higher(REVENUES)
    return JsonResponse({"data": revenues[0], "labels": revenues[1]})


def years_and_month_to_select(request):
    years_months = utils.get_years_and_month_to_select()
    return JsonResponse({"years": years_months[0], "months": years_months[1]})
