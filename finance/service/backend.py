import requests

URL_BACKEND = "https://demo1860037.mockable.io/"


def get_contents(content_name, params):
    return requests.get((URL_BACKEND + content_name), params=params).json()
