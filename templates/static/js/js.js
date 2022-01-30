function render_summary_current_month(url) {
    fetch(url, {
        method: 'get'
    }).then(function (result) {
        return result.json()
    }).then(function (data) {
        document.getElementById('total_revenues').innerHTML = data.totalRevenue
        document.getElementById('total_expenditure').innerHTML = data.totalExpenditure
        document.getElementById('current_balance_html').innerHTML = data.balance

        if (data.balance > 0) {
            document.getElementById('icon_balance').style.color = '#69BDCB'
        }

        const ctx = document.getElementById('monthly_category_summary').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.categorySummaries.categories,
                datasets: [{
                    data: data.categorySummaries.totals,
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

function render_summary_last_twelve_months(url) {
    fetch(url, {
        method: 'get'
    }).then(function (result) {
        return result.json()
    }).then(function (data) {
        const ctx1 = document.getElementById('last_twelve_months').getContext('2d');
        const myChart1 = new Chart(ctx1, {
            type: 'line',
            data: {
                labels: data.labels,
                datasets: [{
                    label: 'Receitas',
                    data: data.revenue,
                    backgroundColor: "#1EA8CB",
                    borderColor: "#1EA8CB",
                    borderWidth: 2.0
                }, {
                    label: 'Despesas',
                    data: data.expenditure,
                    backgroundColor: "#CB1EA8",
                    borderColor: "#CB1EA8",
                    borderWidth: 2.0
                }]
            },
        });

        const ctx2 = document.getElementById('annual_category_summary').getContext('2d');
        const myChart2 = new Chart(ctx2, {
            type: 'bar',
            data: {
                labels: data.categorySummaries.categories,
                datasets: [{
                    data: data.categorySummaries.totals,
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

function render_five_higher_revenues(url) {
    fetch(url, {
        method: 'get'
    }).then(function (result) {
        return result.json()
    }).then(function (data) {
        const ctx = document.getElementById('higher_revenues').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.labels,
                datasets: [{
                    data: data.data,
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

function render_five_higher_expenditures(url) {
    fetch(url, {
        method: 'get'
    }).then(function (result) {
        return result.json()
    }).then(function (data) {
        const ctx = document.getElementById('higher_expenditures').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.labels,
                datasets: [{
                    data: data.data,
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

function render_current_month_and_year(url) {
    fetch(url, {
        method: 'get'
    }).then(function (result) {
        return result.json()
    }).then(function (data) {
        var month_select = document.getElementById("month_select");
        var year_select = document.getElementById("year_select");

        for (index in data.years) {
            console.log(data.years[index], data.years[index])
            year_select.options[year_select.options.length] = new Option(data.years[index], index);
        }
        for (index in data.months) {
            console.log(data.months[index], data.months[index])
            month_select.options[month_select.options.length] = new Option(data.months[index], data.months[index]);
        }
    })
}