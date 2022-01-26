
function render_current_balance(url){
    fetch(url, {
        method: 'get'
    }).then(function(result){
        return result.json()
    }).then(function(data){
        document.getElementById('current_balance_html').innerHTML = data.total

        if (data.total > 0) {
            document.getElementById('icon_balance').style.color = '#69BDCB'
        }
    })
}

function render_total_expenditure_current_month(url) {
    fetch(url, {
        method: 'get'
    }).then(function (result) {
        return result.json()
    }).then(function (data) {
        document.getElementById('total_expenditure').innerHTML = data.total
    })
}

function render_total_revenues_current_month(url) {
    fetch(url, {
        method: 'get'
    }).then(function (result) {
        return result.json()
    }).then(function (data) {
        document.getElementById('total_revenues').innerHTML = data.total
    })
}

function render_total_last_twelve_months(url) {
    fetch(url, {
        method: 'get'
    }).then(function (result) {
        return result.json()
    }).then(function (data) {
        const ctx = document.getElementById('last_twelve_months').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.labels,
                datasets: [{
                    label: 'Receitas',
                    data: data.revenues,
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
    })
}

function render_five_higher_revenues(url){
    fetch(url, {
        method: 'get'
    }).then(function(result){
        return result.json()
    }).then(function(data){
        const ctx = document.getElementById('higher_revenues').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.labels,
                datasets: [{
                    label: "Receitas",
                    data: data.data,
                    backgroundColor: ['#1ea8cb', '#34b0d0', '#4ab9d5', '#61c2da', '#78cadf'],
                    borderColor: ['#1ea8cb', '#34b0d0', '#4ab9d5', '#61c2da', '#78cadf'],
                    borderWidth: 1
                }]
            }
        });
    })
}

function render_five_higher_expenditures(url){
    fetch(url, {
        method: 'get'
    }).then(function(result){
        return result.json()
    }).then(function(data){
        const ctx = document.getElementById('higher_expenditures').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.labels,
                datasets: [{
                    label: "Despesas",
                    data: data.data,
                    backgroundColor: ['#cb1ea8', '#d034b0', '#d54ab9', '#da61c2', '#df78ca'],
                    borderColor: ['#cb1ea8', '#d034b0', '#d54ab9', '#da61c2', '#df78ca'],
                    borderWidth: 1
                }]
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

// function render_new_revenues_row() {
//     var revenues_row = document.getElementById("revenues_row")
//
//     const lista = [1, 2, 3, 4, 5]
//
//     for (index in lista) {
//         revenues_row.
//     }
// }