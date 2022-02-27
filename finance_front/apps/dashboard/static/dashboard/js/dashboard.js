function onWindowLoadingDashboard() {
    window.onload = function (event) {
        renderMonthAndYearSelect("years_and_month_to_select");
        functionsToExecuteOnDashboard(new Date())
    }
    captureActionFilterButton();
}

function functionsToExecuteOnDashboard(date) {
    renderMonthlyResume("monthly_resume/" + date.getFullYear() + "/" + (date.getMonth() + 1));
    renderFiveHigherRevenues("five_higher_revenues/" + date.getFullYear() + "/" + (date.getMonth() + 1));
    renderFiveHigherExpenditures("five_higher_expenditures/" + date.getFullYear() + "/" + (date.getMonth() + 1));
    renderResumeLastTwelveMonths("resume_last_twelve_months/" + date.getFullYear() + "/" + (date.getMonth() + 1));
}

function renderMonthlyResume(url) {
    fetch(url, {
        method: 'get'
    }).then(function (result) {
        return result.json()
    }).then(function (resume) {
        const {totalRevenue, totalExpenditure, balance, 'categoryResume': {categories, totals}} = resume;

        setTotalsMonthlyResume(totalRevenue, totalExpenditure, balance);

        let chartStatus = Chart.getChart("monthly_category_resume");
        if (chartStatus !== undefined) {
            chartStatus.destroy();
        }

        const monthlyCategoryResumeElement = document.getElementById('monthly_category_resume').getContext('2d');
        const monthlyCategoryResumeChart = new Chart(monthlyCategoryResumeElement, {
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

function renderResumeLastTwelveMonths(url) {
    fetch(url, {
        method: 'get'
    }).then(function (result) {
        return result.json()
    }).then(function (resume) {
        const {labels, revenue, expenditure, 'categoryResume': {categories, totals}} = resume;

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

        chartStatus = Chart.getChart("annual_category_resume");
        if (chartStatus !== undefined) {
            chartStatus.destroy();
        }

        const annualCategoryResumeElement = document.getElementById('annual_category_resume').getContext('2d');
        const annualCategoryResumeChart = new Chart(annualCategoryResumeElement, {
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