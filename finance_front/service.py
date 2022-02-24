import datetime

def get_years_and_month_to_select():
    now = datetime.datetime.now()
    years = ["Ano", str(now.year + 2), str(now.year + 1), str(now.year), str(now.year - 1), str(now.year - 2)]
    months = ["Mês", "JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"]
    return {"years": years, "months": months}