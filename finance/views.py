from django.http import JsonResponse
from django.shortcuts import render
from .service import utils
from django.views.decorators.csrf import csrf_exempt
import json

EXPENDITURE = "despesas"
REVENUES = "receitas"
SUMMARY = "resumo"


def finance(request):
    return render(request, 'finance.html')


def expenditures(request, year, month):
    return JsonResponse({"data": utils.get_specific_content(EXPENDITURE, year, month)})


def revenues(request, year, month):
    return JsonResponse({"data": utils.get_specific_content(REVENUES, year, month)})


@csrf_exempt
def save_revenue(request):
    body = json.dumps(json.loads(request.readline()))
    return JsonResponse({"data": utils.save_specific_content(REVENUES, body)})


@csrf_exempt
def save_expenditure(request):
    body = json.dumps(json.loads(request.readline()))
    return JsonResponse({"data": utils.save_specific_content(EXPENDITURE, body)})


def years_and_month_to_select(request):
    years_months = utils.get_years_and_month_to_select()
    return JsonResponse({"years": years_months[0], "months": years_months[1]})


def monthly_summary(request, year, month):
    return JsonResponse(utils.get_monthly_summary(SUMMARY, year, month))


def delete_revenue(request, record_id):
    status_code = utils.delete_specific_content(REVENUES, record_id)
    if status_code == 204:
        return JsonResponse({"status": "ok"})
    return JsonResponse({"status": "bad"})


def delete_expenditure(request, record_id):
    status_code = utils.delete_specific_content(EXPENDITURE, record_id)
    if status_code == 204:
        return JsonResponse({"status": "ok"})
    return JsonResponse({"status": "bad"})


@csrf_exempt
def update_revenue(request, record_id):
    body = json.dumps(json.loads(request.readline()))
    return JsonResponse({"data": utils.update_specific_content(REVENUES, body, record_id)})


@csrf_exempt
def update_expenditure(request, record_id):
    body = json.dumps(json.loads(request.readline()))
    return JsonResponse({"data": utils.update_specific_content(EXPENDITURE, body, record_id)})
