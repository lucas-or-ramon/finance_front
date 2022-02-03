import datetime
import locale

from . import backend


def get_specific_content(content_name, year, month):
    records = backend.get_contents(f'{content_name}/{year}/{month}')

    if records is None:
        return {}

    print(records)
    return records


def get_monthly_summary(path, year, month):
    summary = backend.get_total(f'{path}/{year}/{month}')
    if summary is None:
        return 0

    return summary

def get_years_and_month_to_select():
    locale.setlocale(locale.LC_TIME, "pt_BR.utf8")
    now = datetime.datetime.now()
    years = ["Ano", str(now.year + 1), str(now.year), str(now.year - 1)]
    months = [str.upper(datetime.datetime(2021, i, 1).strftime("%b")) for i in range(1, 13)]
    months.insert(0, "Mês")
    return [years, months]
