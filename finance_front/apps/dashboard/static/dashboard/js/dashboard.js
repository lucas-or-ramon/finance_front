function onWindowLoadingDashboard() {
    window.onload = function (event) {
        renderMonthAndYearSelect("years_and_month_to_select_url");
        functionsToExecuteOnDashboard(new Date())
    }
    captureActionFilterButton();
}

function functionsToExecuteOnDashboard(date) {
    renderMonthlySummary("monthly_summary_url/" + date.getFullYear() + "/" + (date.getMonth() + 1));
    renderFiveHigherRevenues("five_higher_revenues_url/" + date.getFullYear() + "/" + (date.getMonth() + 1));
    renderFiveHigherExpenditures("five_higher_expenditures_url/" + date.getFullYear() + "/" + (date.getMonth() + 1));
    renderSummaryLastTwelveMonths("summary_last_twelve_months_url/" + date.getFullYear() + "/" + (date.getMonth() + 1));
}

function renderMonthlySummary(url) {
    fetch(url, {
        method: 'get'
    }).then(function (result) {
        return result.json()
    }).then(function (summary) {
        const {totalRevenue, totalExpenditure, balance, 'categorySummaries': {categories, totals}} = summary;

        setTotalsMonthlySummary(totalRevenue, totalExpenditure, balance);

        let chartStatus = Chart.getChart("monthly_category_summary");
        if (chartStatus !== undefined) {
            chartStatus.destroy();
        }

        const monthlyCategorySummaryElement = document.getElementById('monthly_category_summary').getContext('2d');
        const monthlyCategorySummaryChart = new Chart(monthlyCategorySummaryElement, {
            type: 'bar', data: {
                labels: categories, datasets: [{
                    data: totals,
                    backgroundColor: ['#cb1ea8', '#d034b0', '#d54ab9', '#da61c2', '#df78ca', "#e58ed3", "#eaa5dc", "#efbbe4"],
                    borderColor: ['#cb1ea8', '#d034b0', '#d54ab9', '#da61c2', '#df78ca', "#e58ed3", "#eaa5dc", "#efbbe4"],
                    borderWidth: 1
                }]
            }, options: {
                indexAxis: 'y', plugins: {
                    legend: {
                        display: false,
                    }
                }
            }
        });
    });
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
            type: 'line', data: {
                labels: labels, datasets: [{
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
            type: 'bar', data: {
                labels: categories, datasets: [{
                    data: totals,
                    backgroundColor: ['#cb1ea8', '#d034b0', '#d54ab9', '#da61c2', '#df78ca', "#e58ed3", "#eaa5dc", "#efbbe4"],
                    borderColor: ['#cb1ea8', '#d034b0', '#d54ab9', '#da61c2', '#df78ca', "#e58ed3", "#eaa5dc", "#efbbe4"],
                    borderWidth: 1
                }]
            }, options: {
                indexAxis: 'y', plugins: {
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
            type: 'bar', data: {
                labels: labels, datasets: [{
                    data: data,
                    backgroundColor: ['#1ea8cb', '#34b0d0', '#4ab9d5', '#61c2da', '#78cadf'],
                    borderColor: ['#1ea8cb', '#34b0d0', '#4ab9d5', '#61c2da', '#78cadf'],
                    borderWidth: 1
                }]
            }, options: {
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
            type: 'bar', data: {
                labels: labels, datasets: [{
                    data: data,
                    backgroundColor: ['#cb1ea8', '#d034b0', '#d54ab9', '#da61c2', '#df78ca'],
                    borderColor: ['#cb1ea8', '#d034b0', '#d54ab9', '#da61c2', '#df78ca'],
                    borderWidth: 1
                }]
            }, options: {
                plugins: {
                    legend: {
                        display: false,
                    }
                }
            }
        });
    })
}

function captureActionFilterButton() {
    document.getElementById("date_filter").onclick = function (e) {
        let date = getDateFromMonthAndYearSelect();
        functionsToExecuteOnDashboard(date)
    }
}