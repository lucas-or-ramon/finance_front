import requests

URL_BACKEND = "http://localhost:8077/"


def get_contents(content_name):
    print(URL_BACKEND + content_name)
    return requests.get((URL_BACKEND + content_name)).json()


def get_total(content_name):
    print(URL_BACKEND + content_name)
    return requests.get((URL_BACKEND + content_name)).json()
