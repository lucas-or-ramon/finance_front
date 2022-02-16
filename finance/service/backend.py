import requests
from requests.adapters import HTTPAdapter
from requests.packages.urllib3.util.retry import Retry

URL_BACKEND = "http://localhost:8080/"


def create_session():
    session = requests.Session()
    retry = Retry(connect=3, backoff_factor=0.5)
    adapter = HTTPAdapter(max_retries=retry)
    session.mount('http://', adapter)
    return session


def get_contents(content_name):
    return create_session().get((URL_BACKEND + content_name)).json()


def get_total(content_name):
    return create_session().get((URL_BACKEND + content_name)).json()


def save_content(content_name, body):
    return create_session().post((URL_BACKEND + content_name), data=body, headers={'content-type': 'application/json'}).json()


def delete_content(content_name, record_id):
    return create_session().delete((URL_BACKEND + content_name + "/" + record_id))


def update_content(content_name, body, record_id):
    return create_session().put((URL_BACKEND + content_name + "/" + record_id), data=body,
                        headers={'content-type': 'application/json'}).json()
