function onWindowLoadingFinance() {
    window.onload = function (event) {
        renderMonthAndYearSelect("years_and_month_to_select_url");
        functionsToExecute(new Date())
    }
    captureActionFilterButton();
}

function renderRevenueRecords(url) {
    fetch(url, {
        method: 'get'
    }).then(function (result) {
        return result.json()
    }).then(function (records) {
        var revenues = document.getElementById("revenues_row");
        var description = revenues.getElementsByClassName("description").item(0);
        var value = revenues.getElementsByClassName("value").item(0);
        var date = revenues.getElementsByClassName("date").item(0);

        description.defaultValue = "Olá";
        description.disabled = true;
        value.defaultValue = "Olá";
        value.disabled = true;
        date.defaultValue = "Olá";
        date.disabled = true;

        console.log(records)
    })
}

function functionsToExecute(date) {
    renderMonthlySummary("monthly_summary_url/" + date.getFullYear() + "/" + (date.getMonth() + 1));
    renderRevenueRecords("revenues/" + date.getFullYear() + "/" + (date.getMonth() + 1))
}

function captureActionFilterButton() {
    document.getElementById("date_filter").onclick = function (e) {
        var month_select = document.getElementById("month_select");
        var year_select = document.getElementById("year_select");

        if (year_select.options.selectedIndex === 0 || month_select.options.selectedIndex === 0) {
            onWindowLoading();
            return;
        }
        const year = year_select[year_select.options.selectedIndex].value;
        const month = month_select[month_select.options.selectedIndex].value;
        functionsToExecute(new Date(year, month - 1));
    }
}

function renderMonthlySummary(url) {
    fetch(url, {
        method: 'get'
    }).then(function (result) {
        return result.json()
    }).then(function (summary) {
        const {totalRevenue, totalExpenditure, balance} = summary

        document.getElementById('total_revenues').innerHTML = totalRevenue
        document.getElementById('current_balance').innerHTML = balance
        document.getElementById('total_expenditure').innerHTML = totalExpenditure

        if (balance > 0) {
            document.getElementById('icon_balance').style.color = '#69BDCB'
        }
    })
}

function renderMonthAndYearSelect(url) {
    fetch(url, {
        method: 'get'
    }).then(function (result) {
        return result.json()
    }).then(function (data) {
        const {years, months} = data;
        var month_select = document.getElementById("month_select");
        var year_select = document.getElementById("year_select");

        for (index in years) {
            year_select.options[year_select.options.length] = new Option(years[index], years[index]);
        }
        for (index in months) {
            month_select.options[month_select.options.length] = new Option(months[index], index);
        }
    })
}