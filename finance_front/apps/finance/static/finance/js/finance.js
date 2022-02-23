function onWindowLoadingFinance() {
    window.onload = function (event) {
        renderMonthAndYearSelect("years_and_month_to_select_url");
        functionsToExecuteOnFinance(new Date())
    }
    captureActionFilterButton()
}

function functionsToExecuteOnFinance(date) {
    console.log(date)
    renderMonthlySummary("monthly_summary_url/" + date.getFullYear() + "/" + (date.getMonth() + 1));
    renderRevenueRecords("revenues/" + date.getFullYear() + "/" + (date.getMonth() + 1))
}

function renderMonthlySummary(url) {
    fetch(url, {
        method: 'get'
    }).then(function (result) {
        return result.json()
    }).then(function (summary) {
        const {totalRevenue, totalExpenditure, balance} = summary
        setTotalsMonthlySummary(totalRevenue, totalExpenditure, balance)
    })
}

function renderRevenueRecords(url) {
    fetch(url, {
        method: 'get'
    }).then(function (result) {
        return result.json()
    }).then(function (records) {
        let revenues = document.getElementById("revenues_row");

        let date = revenues.getElementsByClassName("date").item(0);
        let value = revenues.getElementsByClassName("value").item(0);
        let description = revenues.getElementsByClassName("description").item(0);

        description.defaultValue = "Olá";
        description.disabled = true;
        value.defaultValue = "Olá";
        value.disabled = true;
        date.defaultValue = "Olá";
        date.disabled = true;
    })
}

function captureActionFilterButton() {
    document.getElementById("date_filter").onclick = function (e) {
        let date = getDateFromMonthAndYearSelect();
        functionsToExecuteOnFinance(date)
    }
}
