from django.http import JsonResponse
from django.shortcuts import render


def finance(request):
    return render(request, 'finance.html')


def expenditure(request):
    return JsonResponse({})
