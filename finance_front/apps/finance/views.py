from django.http import JsonResponse
from django.shortcuts import render

from . import service
from ... import service as main_service

EXPENDITURE = "despesas"
REVENUES = "receitas"
SUMMARY = "resumo"


def finance(request):
    return render(request, 'finance/finance.html')


def expenditures(request, year, month):
    return JsonResponse({"data": service.get_specific_content(EXPENDITURE, year, month)})


def revenues(request, year, month):
    return JsonResponse({"data": service.get_specific_content(REVENUES, year, month)})


def monthly_summary(request, year, month):
    return JsonResponse(service.get_monthly_summary(SUMMARY, year, month))


def years_and_month_to_select(request):
    return JsonResponse(main_service.get_years_and_month_to_select())
