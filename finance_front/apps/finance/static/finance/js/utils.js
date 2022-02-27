function renderMonthAndYearSelect(url) {
    fetch(url, {
        method: 'get'
    }).then(function (result) {
        return result.json()
    }).then(function (data) {
        const {years, months} = data;
        let month_select = document.getElementById("month_select");
        let year_select = document.getElementById("year_select");

        for (let index in years) {
            year_select.options[year_select.options.length] = new Option(years[index], years[index]);
        }
        for (let index in months) {
            month_select.options[month_select.options.length] = new Option(months[index], index);
        }
    })
}

function getDateFromMonthAndYearSelect() {
    let month_select = document.getElementById("month_select");
    let year_select = document.getElementById("year_select");

    if (year_select.options.selectedIndex === 0 || month_select.options.selectedIndex === 0) {
        return new Date();
    }
    const year = year_select[year_select.options.selectedIndex].value;
    const month = month_select[month_select.options.selectedIndex].value;
    return new Date(year, month - 1);
}

function setTotalsMonthlyResume(totalRevenue, totalExpenditure, balance) {
    document.getElementById('total_revenues').innerHTML = totalRevenue
    document.getElementById('current_balance').innerHTML = balance
    document.getElementById('total_expenditure').innerHTML = totalExpenditure

    if (balance > 0) {
        document.getElementById('icon_balance').style.color = '#69BDCB'
    }
}