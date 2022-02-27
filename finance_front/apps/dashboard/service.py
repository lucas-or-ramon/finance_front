import datetime
import environ
import requests

env = environ.Env()
URL_BACKEND = env('URL_BACKEND')

def get_resume_current_month(path, year, month):
    resume = get_total(f'{path}/monthly/{year}/{month}')
    if resume is None:
        return 0

    resume["categoryResume"] = extract_categories_resume(resume["categoryResumeList"])

    return resume


def extract_categories_resume(category_resume):
    category_resume_sorted = sorted(category_resume, key=lambda x: x["total"], reverse=True)
    categories = []
    totals = []
    for category_resume in category_resume_sorted:
        categories.append(category_resume["category"])
        totals.append(category_resume["total"])

    return {"categories": categories, "totals": totals}


def get_resume_last_twelve_months(path, year, month):
    resume = get_contents(f'{path}/annual/{year}/{month}')

    monthly_resume = sorted(resume["monthlyResume"],
                               key=lambda x: datetime.datetime.strptime(x["date"], "%Y-%m-%d"))
    months = []
    total_revenue = []
    total_expenditure = []

    for monthly_resume in monthly_resume:
        months.append(str.upper(datetime.datetime.strptime(monthly_resume["date"], "%Y-%m-%d").strftime("%b-%Y")))
        total_revenue.append(monthly_resume["totalRevenue"])
        total_expenditure.append(monthly_resume["totalExpenditure"])

    return {"labels": months,
            "revenue": total_revenue,
            "expenditure": total_expenditure,
            "categoryResume": extract_categories_resume(resume["categoryResumeList"])}


def get_five_higher(content_name, year, month):
    records = get_contents(f'{content_name}/{year}/{month}')

    if records is None:
        return [[], []]

    records_sorted = sorted(records, key=lambda x: x["value"], reverse=True)

    if len(records_sorted) > 5:
        records_sorted = records_sorted[0:5]

    data = []
    labels = []
    for record in records_sorted:
        data.append(record["value"])
        labels.append(str.upper(record["description"]))

    return {"data": data, "labels": labels}

def get_contents(content_name):
    print("URL: " + (URL_BACKEND + content_name))
    response = requests.get((URL_BACKEND + content_name)).json()
    print("Response: ")
    print(response)
    return response


def get_total(content_name):
    print("URL: " + (URL_BACKEND + content_name))
    response = requests.get((URL_BACKEND + content_name)).json()
    print("Response: ")
    print(response)
    return response
