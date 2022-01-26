from django.shortcuts import render
from django.http import JsonResponse
from .service import utils

EXPENDITURE = "despesas"
REVENUES = "receitas"


def dashboard(request):
    return render(request, 'dashboard.html')


def current_balance(request):
    revenues = utils.get_total_current_month(REVENUES)
    expenditure = utils.get_total_current_month(EXPENDITURE)
    return JsonResponse({"total": revenues - expenditure})


def total_expenditure_current_month(request):
    return JsonResponse({"total": utils.get_total_current_month(EXPENDITURE)})


def total_last_twelve_months(request):
    revenues = utils.get_total_last_twelve_months(REVENUES)
    expenditure = utils.get_total_last_twelve_months(EXPENDITURE)
    return JsonResponse({"revenues": revenues[0], "expenditure": expenditure[0], "labels": revenues[1]})


def total_revenues_current_month(request):
    return JsonResponse({"total": utils.get_total_current_month(REVENUES)})


def five_higher_expenditures(request):
    expenditure = utils.get_five_higher(EXPENDITURE)
    return JsonResponse({"data": expenditure[0], "labels": expenditure[1]})


def five_higher_revenues(request):
    revenues = utils.get_five_higher(REVENUES)
    return JsonResponse({"data": revenues[0], "labels": revenues[1]})


def years_and_month_to_select(request):
    years_months = utils.get_years_and_month_to_select()
    return JsonResponse({"years": years_months[0], "months": years_months[1]})
