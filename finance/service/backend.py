import requests

URL_BACKEND = "http://localhost:8077/"


def get_contents(content_name, params):
    return requests.get((URL_BACKEND + content_name), params=params).json()
