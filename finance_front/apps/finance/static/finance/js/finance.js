function onWindowLoadingFinance() {
    window.onload = function () {
        renderMonthAndYearSelect("years_and_month_to_select");
        functionsToExecuteOnFinance(new Date())
    }
    captureActionFilterButton()
}

function functionsToExecuteOnFinance(date) {
    console.log(date)
    renderMonthlyResume("monthly_resume/" + date.getFullYear() + "/" + (date.getMonth() + 1));
    renderRevenueRecords("revenues/" + date.getFullYear() + "/" + (date.getMonth() + 1))
}

function renderMonthlyResume(url) {
    fetch(url, {
        method: 'get'
    }).then(function (result) {
        return result.json()
    }).then(function (resume) {
        const {totalRevenue, totalExpenditure, balance} = resume
        setTotalsMonthlyResume(totalRevenue, totalExpenditure, balance)
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
    document.getElementById("date_filter").onclick = function () {
        let date = getDateFromMonthAndYearSelect();
        functionsToExecuteOnFinance(date)
    }
}
