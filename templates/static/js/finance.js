function onWindowLoadingFinance() {
    window.onload = function (event) {
        renderMonthAndYearSelect("years_and_month_to_select_url");
        functionsToExecute(new Date())
    }
    captureActionFilterButton();
    captureActionNewRevenueButton();
    captureActionNewExpenditureButton();
    captureActionToRevenue();
    captureActionToExpenditure();
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

function functionsToExecute(date) {
    renderMonthlySummary("monthly_summary_url/" + date.getFullYear() + "/" + (date.getMonth() + 1));
    renderRevenueRecords("get_revenues/" + date.getFullYear() + "/" + (date.getMonth() + 1));
    renderExpenditureRecords("get_expenditures/" + date.getFullYear() + "/" + (date.getMonth() + 1));
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

        var icon = document.getElementById('icon_balance');
        if (balance > 0) {
            icon.style.color = '#69BDCB';
        } else {
            icon.style.color = '#C040B9';
        }
    })
}

function renderRevenueRecords(url) {
    fetch(url, {
        method: 'get'
    }).then(function (result) {
        return result.json()
    }).then(function (records) {
        setValuesOfSpreadsheet(records, "revenue_spreadsheet");
    })
}

function renderExpenditureRecords(url) {
    fetch(url, {
        method: 'get'
    }).then(function (result) {
        return result.json()
    }).then(function (records) {
        setValuesOfSpreadsheet(records, "expenditure_spreadsheet");
    })
}

function createCategoryOptions() {
    var category_select = document.createElement("select");
    category_select.classList.add("form-select", "category");
    for (index in categories) {
        category_select.options[category_select.options.length] = new Option(categories[index], categories[index]);
    }
    return category_select;
}
var categories = ["Categoria", "MORADIA", "ALIMENTAÇÃO", "OUTROS", "SAÚDE", "LAZER", "TRANSPORTE", "EDUCAÇÃO", "IMPREVISTOS"];

function setValuesOfSpreadsheet(records, spreadsheetType) {
    var parentDiv = document.getElementById(spreadsheetType);
    while (parentDiv.firstChild) {
        parentDiv.removeChild(parentDiv.firstChild);
    }

    for (var record in records.data) {
        var id = records.data[record]["id"];
        var newDiv = createNewRowDiv(id)

        if (spreadsheetType === "expenditure_spreadsheet") {
            var categoryOptions = createCategoryOptions();
            newDiv.appendChild(categoryOptions);
        }

        parentDiv.appendChild(newDiv);

        var revenues = document.getElementById(records.data[record]["id"]);
        var description = revenues.getElementsByClassName("description").item(0);
        var value = revenues.getElementsByClassName("value").item(0);
        var date = revenues.getElementsByClassName("date").item(0);

        if (spreadsheetType === "expenditure_spreadsheet") {
            var category = revenues.getElementsByClassName("category").item(0);
            category.disabled = true;
            category.options.selectedIndex = categories.indexOf(records.data[record]["category"])
        }

        description.defaultValue = records.data[record]["description"];
        description.disabled = true;
        value.defaultValue = "R$ " + records.data[record]["value"];
        value.disabled = true;
        date.defaultValue = records.data[record]["date"].slice(8)
        date.disabled = true;
    }
}

function createNewRowDiv(id) {
    var newDiv = document.createElement("div");
    newDiv.classList.add("input-group", "mb-3");
    newDiv.id = id;

    var newButton = createActionButton();
    newDiv.appendChild(newButton);

    var newUl = createOptionsActionButton(id);
    newDiv.appendChild(newUl);

    var inputDescription = createDescriptionInput();
    newDiv.appendChild(inputDescription);

    var inputValue = createValueInput();
    newDiv.appendChild(inputValue)

    var inputDate = createDateInput();
    newDiv.appendChild(inputDate)

    return newDiv;
}

function createActionButton() {
    var newButton = document.createElement("button");
    newButton.classList.add("btn", "btn-outline-primary", "dropdown-toggle");
    newButton.type = "button"
    newButton.innerHTML = "Ação";
    newButton.setAttribute("aria-expanded", "false");
    newButton.setAttribute("data-bs-toggle", "dropdown");
    return newButton;
}

function createDividerOptions() {
    var newLi2 = document.createElement("li");
    var newHr = document.createElement("hr");
    newHr.className = "dropdown-divider";
    newLi2.appendChild(newHr);
    return newLi2
}

function createOption(name, id) {
    var newLi3 = document.createElement("li");
    var newA2 = document.createElement("a");
    newA2.className = "dropdown-item";
    newA2.innerHTML = name;
    newA2.id = id
    newLi3.appendChild(newA2);
    return newLi3;
}

function createExtraOption(name, id) {
    var newLi3 = document.createElement("li");
    var newA2 = document.createElement("a");
    newA2.className = "dropdown-item";
    newA2.innerHTML = name;
    newA2.id = id
    newA2.hidden = true
    newLi3.appendChild(newA2);
    return newLi3;
}

function createOptionsActionButton(id) {
    var newUl = document.createElement("ul");
    newUl.className = "dropdown-menu";

    newUl.appendChild(createOption("Editar", "edit_" + id));

    newUl.appendChild(createExtraOption("Salvar", "update_" + id));

    newUl.appendChild(createDividerOptions());

    newUl.appendChild(createOption("Excluir", "delete_" + id));

    newUl.appendChild(createExtraOption("Cancelar", "cancel_" + id));

    return newUl
}

function createDescriptionInput() {
    var input = document.createElement("input");
    input.type = "text"
    input.classList.add("form-control", "description");
    input.setAttribute("aria-label", "Text input with dropdown button")
    return input
}

function createValueInput() {
    var input = document.createElement("input");
    input.type = "text"
    input.classList.add("form-control", "value");
    input.setAttribute("aria-label", "Text input with dropdown button")
    return input
}

function createDateInput() {
    var input = document.createElement("input");
    input.type = "text"
    input.classList.add("form-control", "date");
    input.setAttribute("aria-label", "Text input with dropdown button")
    return input
}

function getDate() {
    var month_select = document.getElementById("month_select");
    var year_select = document.getElementById("year_select");

    if (year_select.options.selectedIndex === 0 || month_select.options.selectedIndex === 0) {
        return new Date();
    }
    const year = year_select[year_select.options.selectedIndex].value;
    const month = month_select[month_select.options.selectedIndex].value;
    return new Date(year, month - 1)
}

function captureActionFilterButton() {
    document.getElementById("date_filter").onclick = function (e) {
        functionsToExecute(getDate());
    }
}

function captureActionNewRevenueButton() {
    var newRevenueButton = document.getElementById("new_revenue_button");

    newRevenueButton.onclick = function (e) {
        var parentDiv = document.getElementById("revenue_spreadsheet");
        var newDiv = createNewRowDiv("new_revenue");
        parentDiv.appendChild(newDiv);
        newRevenueButton.hidden = true;
        document.getElementById("save_revenue_button").hidden = false;
    };
    captureActionToSaveRevenue();
}

function captureActionNewExpenditureButton() {
    var newExpenditureButton = document.getElementById("new_expenditure_button");

    newExpenditureButton.onclick = function (e) {
        var parentDiv = document.getElementById("expenditure_spreadsheet");
        var newDiv = createNewRowDiv("new_expenditure");
        newDiv.appendChild(createCategoryOptions());
        parentDiv.appendChild(newDiv);
        newExpenditureButton.hidden = true;
        document.getElementById("save_expenditure_button").hidden = false;
    };
    captureActionToSaveExpenditure();
}

function captureActionToSaveRevenue() {
    actionToSave("revenue")
}

function captureActionToSaveExpenditure() {
    actionToSave("expenditure")
}

function getFieldsValues(element) {
    var description = element.getElementsByClassName("description").item(0).value;
    var value = element.getElementsByClassName("value").item(0).value;
    var day = element.getElementsByClassName("date").item(0).value;

    var category = element.getElementsByClassName("category").item(0)
    if (category !== null) {
        category = category.value
    }
    console.log(category)

    if (day.length < 2) {
        day = "0".concat(day)
    }

    var selectedDate = getDate();
    var month = (selectedDate.getMonth() + 1).toString()
    if (month.length < 2) {
        month = "0".concat(month)
    }
    var date = selectedDate.getFullYear() + "-" + month + "-" + day;

    value = value.replace("R$ ", '')

    return {"description": description, "value": value, "date": date, "category": category};
}

function actionToSave(type) {
    var saveButton = document.getElementById("save_" + type + "_button");

    saveButton.onclick = function (e) {
        var element = document.getElementById("new_" + type);
        var body = getFieldsValues(element);

        fetch("save_" + type + "/", {
            method: 'post',
            body: JSON.stringify(body)
        }).then(function (result) {
            return result.json()
        }).then(function (record) {
            functionsToExecute(getDate())
        })

        saveButton.hidden = true
        document.getElementById("new_" + type + "_button").hidden = false
    }
}

function captureActionToRevenue() {
    actions("revenue")
}

function captureActionToExpenditure() {
    actions("expenditure")
}

function actions(type) {
    document.getElementById(type + "_spreadsheet").onclick = function (event) {
        var id = event.target.parentElement.parentElement.parentElement.id;
        if (event.target.id === "delete_" + id) {
            var url = "delete_" + type + "/" + id;
            fetch(url, {
                method: 'get'
            }).then(function (result) {
                return result.json()
            }).then(function (data) {
                functionsToExecute(getDate())
            })
        }

        if (event.target.id === "edit_" + id) {
            enableFieldsToEdit(id)
            document.getElementById(event.target.id).hidden = true;
            document.getElementById("delete_" + id).hidden = true;
            document.getElementById("update_" + id).hidden = false;
            document.getElementById("cancel_" + id).hidden = false;
        }

        if (event.target.id === "cancel_" + id) {
            disableFieldsToEdit(id)
            document.getElementById("edit_" + id).hidden = false;
            document.getElementById("delete_" + id).hidden = false;
            document.getElementById("update_" + id).hidden = true;
            document.getElementById(event.target.id).hidden = true;
        }

        if (event.target.id === "update_" + id) {
            var element = document.getElementById(id);
            var body = getFieldsValues(element);

            fetch("update_" + type + "/" + id, {
                method: 'post',
                body: JSON.stringify(body)
            }).then(function (result) {
                return result.json()
            }).then(function (record) {
                functionsToExecute(getDate())
            })
        }
    }
}

function disableFieldsToEdit(id) {
    var specificDiv = document.getElementById(id);
    specificDiv.getElementsByClassName("description").item(0).disabled = true;
    specificDiv.getElementsByClassName("value").item(0).disabled = true;
    specificDiv.getElementsByClassName("date").item(0).disabled = true;
    var category = specificDiv.getElementsByClassName("category").item(0);
    if (category !== null) {
        category.disabled = true;
    }
}

function enableFieldsToEdit(id) {
    var specificDiv = document.getElementById(id);
    specificDiv.getElementsByClassName("description").item(0).disabled = false;
    specificDiv.getElementsByClassName("value").item(0).disabled = false;
    specificDiv.getElementsByClassName("date").item(0).disabled = false;
    var category = specificDiv.getElementsByClassName("category").item(0);
    if (category !== null) {
        category.disabled = false;
    }
}