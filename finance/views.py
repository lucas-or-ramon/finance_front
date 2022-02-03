from django.http import JsonResponse
from django.shortcuts import render
from .service import utils;

EXPENDITURE = "despesas"
REVENUES = "receitas"
SUMMARY = "resumo"


def finance(request):
    return render(request, 'finance.html')


def expenditures(request, year, month):
    return JsonResponse({utils.get_specific_content(EXPENDITURE, year, month)})


def revenues(request, year, month):
    return JsonResponse({utils.get_specific_content(REVENUES, year, month)})


def monthly_summary(request, year, month):
    return JsonResponse(utils.get_monthly_summary(SUMMARY, year, month))


def years_and_month_to_select(request):
    years_months = utils.get_years_and_month_to_select()
    return JsonResponse({"years": years_months[0], "months": years_months[1]})
