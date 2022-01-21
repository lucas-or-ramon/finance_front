import datetime

from dateutil.relativedelta import relativedelta

from finance.service import backend


def get_total_last_twelve_months(content_name):
    now = datetime.datetime.now()
    last = now - relativedelta(months=11)

    params = {'last': f'{last.month}{last.year}', 'now': f'{now.month}{now.year}'}
    contents = backend.get_contents(content_name, params)

    contents_sorted = sorted(contents, key=lambda x: datetime.datetime.strptime(x["date"], "%m/%Y"))

    months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]
    labels = []
    data = []

    for content in contents_sorted:
        date = datetime.datetime.strptime(content["date"], "%m/%Y")
        labels.append(months[date.month - 1])

        total_month = 0
        for records in content["records"]:
            total_month += records["value"]
        data.append(total_month)

    if len(labels) < 12:
        return organize_data(data, labels, months)

    return [data, labels]


def organize_data(data, labels, months):
    months.reverse()
    labels.reverse()
    data.reverse()

    start = months.index(labels[0])

    for i in range(12):
        if start > 11:
            start = 0

        if i < len(labels):
            if months[start] != labels[i]:
                labels.insert(i, months[start])
                data.insert(i, 0)
        else:
            labels.append(months[start])
            data.append(0)
        start += 1

    labels.reverse()
    data.reverse()

    return [data, labels]


def get_total_current_month(content_name):
    now = datetime.datetime.now()
    params = {'last': f'{now.month}{now.year}', 'now': f'{now.month}{now.year}'}

    content = backend.get_contents(content_name, params)

    if content is None:
        return 0

    total_month = 0
    for record in content["records"]:
        total_month += record["value"]

    return total_month


def get_five_higher(content_name):
    now = datetime.datetime.now()
    params = {'last': f'{now.month}{now.year}', 'now': f'{now.month}{now.year}'}

    content = backend.get_contents(content_name, params)

    if content is None:
        return [[], []]

    records = content["records"]

    records_sorted = sorted(records, key=lambda x: x["value"], reverse=True)

    if len(records_sorted) > 5:
        records_sorted = records_sorted[0:5]

    data = []
    labels = []
    for record in records_sorted:
        data.append(record["value"])
        labels.append(record["description"])

    return [data, labels]


def get_years_and_month_to_select():
    now = datetime.datetime.now()
    years = ["Ano", str(now.year + 1), str(now.year), str(now.year - 1)]
    months = [str(i) for i in range(1, 13, 1)]
    months.insert(0, "Mês")
    return [years, months]
