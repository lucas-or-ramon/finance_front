function onWindowLoading() {
    window.onload = function (event) {
        renderMonthAndYearSelect("years_and_month_to_select_url");
        functionsToExecute(new Date())
    }
    captureActionFilterButton();
}

function functionsToExecute(date) {
    renderMonthlySummary("monthly_summary_url/" + date.getFullYear() + "/" + (date.getMonth() + 1));
    renderFiveHigherRevenues("five_higher_revenues_url/" + date.getFullYear() + "/" + (date.getMonth() + 1));
    renderFiveHigherExpenditures("five_higher_expenditures_url/" + date.getFullYear() + "/" + (date.getMonth() + 1));
    renderSummaryLastTwelveMonths("summary_last_twelve_months_url/" + date.getFullYear() + "/" + (date.getMonth() + 1));
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
        const {totalRevenue, totalExpenditure, balance, 'categorySummaries': {categories, totals}} = summary

        document.getElementById('total_revenues').innerHTML = totalRevenue
        document.getElementById('current_balance').innerHTML = balance
        document.getElementById('total_expenditure').innerHTML = totalExpenditure

        if (balance > 0) {
            document.getElementById('icon_balance').style.color = '#69BDCB'
        }

        let chartStatus = Chart.getChart("monthly_category_summary");
        if (chartStatus !== undefined) {
            chartStatus.destroy();
        }

        const monthlyCategorySummaryElement = document.getElementById('monthly_category_summary').getContext('2d');
        const monthlyCategorySummaryChart = new Chart(monthlyCategorySummaryElement, {
            type: 'bar',
            data: {
                labels: categories,
                datasets: [{
                    data: totals,
                    backgroundColor: ['#cb1ea8', '#d034b0', '#d54ab9', '#da61c2', '#df78ca', "#e58ed3", "#eaa5dc", "#efbbe4"],
                    borderColor: ['#cb1ea8', '#d034b0', '#d54ab9', '#da61c2', '#df78ca', "#e58ed3", "#eaa5dc", "#efbbe4"],
                    borderWidth: 1
                }]
            },
            options: {
                indexAxis: 'y',
                plugins: {
                    legend: {
                        display: false,
                    }
                }
            }
        });
    })
}

function renderSummaryLastTwelveMonths(url) {
    fetch(url, {
        method: 'get'
    }).then(function (result) {
        return result.json()
    }).then(function (summary) {
        const {labels, revenue, expenditure, 'categorySummaries': {categories, totals}} = summary;

        let chartStatus = Chart.getChart("last_twelve_months");
        if (chartStatus !== undefined) {
            chartStatus.destroy();
        }

        const lastTwelveMonthsElement = document.getElementById('last_twelve_months').getContext('2d');
        const lastTwelveMonthsChart = new Chart(lastTwelveMonthsElement, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Receitas',
                    data: revenue,
                    backgroundColor: "#1EA8CB",
                    borderColor: "#1EA8CB",
                    borderWidth: 2.0
                }, {
                    label: 'Despesas',
                    data: expenditure,
                    backgroundColor: "#CB1EA8",
                    borderColor: "#CB1EA8",
                    borderWidth: 2.0
                }]
            },
        });

        chartStatus = Chart.getChart("annual_category_summary");
        if (chartStatus !== undefined) {
            chartStatus.destroy();
        }

        const annualCategorySummaryElement = document.getElementById('annual_category_summary').getContext('2d');
        const annualCategorySummaryChart = new Chart(annualCategorySummaryElement, {
            type: 'bar',
            data: {
                labels: categories,
                datasets: [{
                    data: totals,
                    backgroundColor: ['#cb1ea8', '#d034b0', '#d54ab9', '#da61c2', '#df78ca', "#e58ed3", "#eaa5dc", "#efbbe4"],
                    borderColor: ['#cb1ea8', '#d034b0', '#d54ab9', '#da61c2', '#df78ca', "#e58ed3", "#eaa5dc", "#efbbe4"],
                    borderWidth: 1
                }]
            },
            options: {
                indexAxis: 'y',
                plugins: {
                    legend: {
                        display: false,
                    }
                }
            }
        });
    })
}

function renderFiveHigherRevenues(url) {
    fetch(url, {
        method: 'get'
    }).then(function (result) {
        return result.json()
    }).then(function (dataFiveHigher) {
        const {data, labels} = dataFiveHigher;

        let chartStatus = Chart.getChart("higher_revenues");
        if (chartStatus !== undefined) {
            chartStatus.destroy();
        }

        const ctx = document.getElementById('higher_revenues').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: ['#1ea8cb', '#34b0d0', '#4ab9d5', '#61c2da', '#78cadf'],
                    borderColor: ['#1ea8cb', '#34b0d0', '#4ab9d5', '#61c2da', '#78cadf'],
                    borderWidth: 1
                }]
            },
            options: {
                plugins: {
                    legend: {
                        display: false,
                    }
                }
            }
        });
    })
}

function renderFiveHigherExpenditures(url) {
    fetch(url, {
        method: 'get'
    }).then(function (result) {
        return result.json()
    }).then(function (dataFiveHigher) {
        const {data, labels} = dataFiveHigher;

        let chartStatus = Chart.getChart("higher_expenditures");
        if (chartStatus !== undefined) {
            chartStatus.destroy();
        }

        const ctx = document.getElementById('higher_expenditures').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: ['#cb1ea8', '#d034b0', '#d54ab9', '#da61c2', '#df78ca'],
                    borderColor: ['#cb1ea8', '#d034b0', '#d54ab9', '#da61c2', '#df78ca'],
                    borderWidth: 1
                }]
            },
            options: {
                plugins: {
                    legend: {
                        display: false,
                    }
                }
            }
        });
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