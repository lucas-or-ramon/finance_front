import datetime

from finance.service import backend


def get_summary_current_month(path):
    now = datetime.datetime.now()
    summary = backend.get_total(f'{path}/{now.year}/{now.month}')
    if summary is None:
        return 0

    summary["categorySummaries"] = extract_categories_summary(summary["categorySummaries"])

    return summary


def extract_categories_summary(category_summaries):
    category_summaries_sorted = sorted(category_summaries, key=lambda x: x["total"], reverse=True)
    categories = []
    totals = []
    for category_summary in category_summaries_sorted:
        categories.append(category_summary["category"])
        totals.append(category_summary["total"])

    return {"categories": categories, "totals": totals}


def get_summary_last_twelve_months(path):
    summary = backend.get_contents(f'{path}/lastyear')

    monthly_summaries = sorted(summary["monthlySummaries"],
                               key=lambda x: datetime.datetime.strptime(x["date"], "%Y-%m-%d"))
    months = []
    total_revenue = []
    total_expenditure = []

    for monthly_summary in monthly_summaries:
        months.append(datetime.datetime.strptime(monthly_summary["date"], "%Y-%m-%d").strftime("%b"))
        total_revenue.append(monthly_summary["totalRevenue"])
        total_expenditure.append(monthly_summary["totalExpenditure"])

    return {"labels": months,
            "revenue": total_revenue,
            "expenditure": total_expenditure,
            "categorySummaries": extract_categories_summary(summary["annualCategoriesSummary"])}


def get_five_higher(content_name):
    now = datetime.datetime.now()

    records = backend.get_contents(f'{content_name}/{now.year}/{now.month}')

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

    return [data, labels]


def get_years_and_month_to_select():
    now = datetime.datetime.now()
    years = ["Ano", str(now.year + 1), str(now.year), str(now.year - 1)]
    months = [str(i) for i in range(1, 13, 1)]
    months.insert(0, "Mês")
    return [years, months]
