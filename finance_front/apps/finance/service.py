import requests
import environ

env = environ.Env()
URL_BACKEND = env('URL_BACKEND')

def get_specific_content(content_name, year, month):
    records = get_contents(f'{content_name}/{year}/{month}')
    if records is None:
        return {}

    return records

def get_monthly_resume(content_name, year, month):
    resume = get_total(f'{content_name}/{year}/{month}')
    if resume is None:
        return 0

    return resume

def get_contents(content_name):
    return requests.get((URL_BACKEND + content_name)).json()


def get_total(content_name):
    return requests.get((URL_BACKEND + content_name)).json()
