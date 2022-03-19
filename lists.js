let sentences = [[]];
let orderOfCombining = "horizontal";
let maxColumn;
let maxRow;

let checkedCheckboxes = [];

let changeSentenceOrderID = [];
let changeSentenceOrderButtons = [];
let editSentenceCounter;
let editSentenceList;

function generateList() {
    const list = document.createElement('table');
    list.className = "mdl-data-table mdl-js-data-table center";
    list.style = "margin-top: 24px; margin-bottom: 24px";
    list.id = "list";

    const content = document.getElementById("content");
    const tableBody = document.createElement('tbody');
    let tableRow;
    let tableData;
    let buttons;

    maxColumn = sentences.length;
    maxRow = 0;
    for (let i = 0; i < maxColumn; i++) {
        maxRow = Math.max(maxRow, sentences[i].length);
    }

    for (let j = 0; j < maxRow; j++) {
        tableRow = document.createElement('tr');
        for (let i = 0; i < maxColumn; i++) {
            if (sentences[i][j] !== undefined) {
                tableData = document.createElement('td');
                tableData.className = "mdl-data-table__cell--non-numeric";
                tableData.onclick = function () {
                    clickCheckbox("checkbox-label" + (i + 1) + "-" + (j + 1), "checkbox" + (i + 1) + "-" + (j + 1));
                };
                tableData.innerHTML = "<label id=\"checkbox-label" + (i + 1) + "-" + (j + 1) + "\" class=\"mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect\" for=\"checkbox" + (i + 1) + "-" + (j + 1) + "\"><input type=\"checkbox\" id=\"checkbox" + (i + 1) + "-" + (j + 1) + "\" class=\"mdl-checkbox__input\"/></label>";
                tableRow.appendChild(tableData);
                tableData = document.createElement('td');
                tableData.className = "mdl-data-table__cell--non-numeric sentence-cell";
                tableData.onclick = function () {
                    clickCheckbox("checkbox-label" + (i + 1) + "-" + (j + 1), "checkbox" + (i + 1) + "-" + (j + 1));
                };
                tableData.innerText = sentences[i][j];
                tableRow.appendChild(tableData);
            } else {
                tableData = document.createElement('td');
                tableData.className = "mdl-data-table__cell--non-numeric";
                tableRow.appendChild(tableData);
                tableData = document.createElement('td');
                tableData.className = "mdl-data-table__cell--non-numeric sentence-cell";
                tableRow.appendChild(tableData);
            }
        }
        tableBody.appendChild(tableRow);
    }

    // Dodawanie zdania.
    tableRow = document.createElement('tr');
    for (let i = 0; i < maxColumn; i++) {
        tableData = document.createElement('td');
        tableData.className = "mdl-data-table__cell--non-numeric";
        tableData.innerHTML = "<button class=\"mdl-button mdl-js-button mdl-button--icon\" id=\"add" + (i + 1) + "\" onclick=\"addSentences(" + (i + 1) + ")\"><i class=\"material-icons\">add</i></button>";
        tableRow.appendChild(tableData);
        tableData = document.createElement('td');
        tableData.className = "mdl-data-table__cell--non-numeric";
        if (isSmallScreen()) {
            tableData.innerHTML = "<div id=\"table-new-sentence\" class=\"mdl-textfield mdl-js-textfield mdl-textfield--floating-label\" style=\"width: auto\"><input class=\"mdl-textfield__input\" type=\"text\" autocomplete=\"no\" id=\"new" + (i + 1) + "\"><label class=\"mdl-textfield__label\" for=\"new" + (i + 1) + "\">Nowe zdanie...</label></div>";
        } else {
            tableData.innerHTML = "<div id=\"table-new-sentence\" class=\"mdl-textfield mdl-js-textfield mdl-textfield--floating-label\"><input class=\"mdl-textfield__input\" type=\"text\" autocomplete=\"no\" id=\"new" + (i + 1) + "\"><label class=\"mdl-textfield__label\" for=\"new" + (i + 1) + "\">Nowe zdanie...</label></div>";
        }
        tableRow.appendChild(tableData);
    }
    tableBody.appendChild(tableRow);

    // Przyciski.
    buttons = document.createElement('div');
    buttons.id = "buttons";
    buttons.className = "center-buttons"
    buttons.innerHTML = "<button style=\"margin: 0 8px 8px 0\" onclick=\"combineSentences()\" class=\"mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent\">Połącz zdania</button><button style=\"margin: 0 8px 8px 0\" onclick=\"removeSentences()\" class=\"mdl-button mdl-js-button\">Usuń zaznaczone</button><button style=\"margin: 0 0 8px 0\" onclick=\"editSentences()\" class=\"mdl-button mdl-js-button\">Edytuj zaznaczone</button>";

    list.appendChild(tableBody);
    content.appendChild(list);
    content.appendChild(buttons);
    componentHandler.upgradeDom();

    activateEnter();
    loadCheckboxes();
    currentView = "list";
}

function generateChangeSentenceOrder() {
    removeList();
    const list = document.createElement('table');
    list.className = "mdl-data-table mdl-js-data-table center";
    list.style = "margin-top: 24px; margin-bottom: 24px";
    list.id = "list";

    const content = document.getElementById("content");
    const tableBody = document.createElement('tbody');
    let tableRow;
    let tableData;
    let buttons;

    maxColumn = sentences.length;
    maxRow = 0;
    for (let i = 0; i < maxColumn; i++) {
        maxRow = Math.max(maxRow, sentences[i].length);
    }

    const blockedColumns = new Array(maxColumn);
    changeSentenceOrderButtons = [];
    for (let j = 0; j <= maxRow; j += 0.5) {
        tableRow = document.createElement('tr');
        if (Number.isInteger(j)) {
            for (let i = 0; i < maxColumn; i++) {
                tableData = document.createElement('td');
                tableData.className = "mdl-data-table__cell--non-numeric";
                tableRow.appendChild(tableData);
                tableData = document.createElement('td');
                tableData.className = "mdl-data-table__cell--non-numeric";
                if (blockedColumns[i] !== true) {
                    if (isSmallScreen()) {
                        tableData.innerHTML = "<div style=\"width: auto\"><button onclick=\"changeSentenceOrder(" + i + ", " + j + ")\" class=\"mdl-button mdl-js-button\" id=\"change-sentence-order-button" + i + "-" + j + "\" disabled=\"disabled\">Przenieś tutaj</button></div>"
                    } else {
                        tableData.innerHTML = "<div class=\"spacer-div-cell\"><button onclick=\"changeSentenceOrder(" + i + ", " + j + ")\" class=\"mdl-button mdl-js-button\" id=\"change-sentence-order-button" + i + "-" + j + "\" disabled=\"disabled\">Przenieś tutaj</button></div>"
                    }
                    changeSentenceOrderButtons.push("change-sentence-order-button" + i + "-" + j);
                }
                tableRow.appendChild(tableData);
            }
        } else {
            for (let i = 0; i < maxColumn; i++) {
                if (sentences[i][j - 0.5] !== undefined) {
                    tableData = document.createElement('td');
                    tableData.className = "mdl-data-table__cell--non-numeric";
                    tableData.onclick = function () {
                        document.getElementById("change-sentence-order-sentence-button" + i + "-" + (j - 0.5)).click();
                    }
                    tableData.innerHTML = "<button class=\"mdl-button mdl-js-button mdl-button--icon\" id=\"change-sentence-order-sentence-button" + i + "-" + (j - 0.5) + "\" onclick=\"activateChangeSentenceOrder(" + i + ", " + (j - 0.5) + ")\"><i class=\"material-icons\" id=\"change-sentence-order-sentence-button-icon" + i + "-" + (j - 0.5) + "\">open_with</i></button>";
                    tableRow.appendChild(tableData);
                    tableData = document.createElement('td');
                    tableData.className = "mdl-data-table__cell--non-numeric sentence-cell";
                    tableData.style = "height: 57px";
                    tableData.id = "change-sentence-order-sentence-cell" + i + "-" + (j - 0.5);
                    tableData.onclick = function () {
                        document.getElementById("change-sentence-order-sentence-button" + i + "-" + (j - 0.5)).click();
                    }
                    tableData.innerText = sentences[i][j - 0.5];
                    tableRow.appendChild(tableData);
                } else {
                    tableData = document.createElement('td');
                    tableData.className = "mdl-data-table__cell--non-numeric";
                    tableRow.appendChild(tableData);
                    tableData = document.createElement('td');
                    tableData.className = "mdl-data-table__cell--non-numeric sentence-cell";
                    tableRow.appendChild(tableData);
                    blockedColumns[i] = true;
                }
            }
        }
        tableBody.appendChild(tableRow);
    }

    // Przycisk wyjścia z trybu zmiany kolejności.
    buttons = document.createElement('div');
    buttons.id = "buttons";
    buttons.className = "center-buttons";
    buttons.innerHTML = "<button id=\"change-sentence-order-button-done\" style=\"margin: 0 0 8px 0\" onclick=\"removeList(); generateList()\" class=\"mdl-button mdl-js-button mdl-button--raised mdl-button--accent\">Gotowe</button><button id=\"change-sentence-order-button-cancel\" style=\"margin: 0 0 8px 0; display: none\" onclick=\"generateChangeSentenceOrder()\" class=\"mdl-button mdl-js-button mdl-button--raised mdl-button--accent\">Anuluj</button>";

    list.appendChild(tableBody);
    content.appendChild(list);
    content.appendChild(buttons);
    componentHandler.upgradeDom();
    currentView = "changeSentenceOrder";
}

function removeList() {
    mergeID = -1;
    moveID = -1;
    changeSentenceOrderID = [];
    changeSentenceOrderButtons = [];

    const oldList = document.getElementById("list");
    const oldButtons = document.getElementById("buttons");
    oldList.remove();
    oldButtons.remove();
}

function addSentences(column) {
    saveCheckboxes();

    const clickedInput = document.getElementById("new" + column);
    if (clickedInput.value === "") {
        clickedInput.focus();
        return
    }
    let input;
    for (let i = 0; i < maxColumn; i++) {
        input = document.getElementById("new" + (i + 1));
        if (input.value !== "") {
            sentences[i].push(input.value.toString());
        }
    }
    addToHistory();
    removeList();
    generateList();
    document.getElementById("new" + column).focus();
}

function removeSentences() {
    for (let i = 1; i <= maxColumn; i++) {
        let pomocnicza = 0;
        const koniec = sentences[i - 1].length;
        for (let j = 1; j <= koniec; j++) {
            const checkbox = document.getElementById("checkbox" + i + "-" + j);
            if (checkbox.checked) {
                sentences[i - 1].splice(j - 1 - pomocnicza, 1);
                pomocnicza++;
            }
        }
    }
    addToHistory();
    removeList();
    generateList();
}

function combineSentences() {
    const wybrane = [];
    if (orderOfCombining === "horizontal") {
        for (let i = 1; i <= maxRow; i++) {
            for (let j = 1; j <= maxColumn; j++) {
                var checkbox = document.getElementById("checkbox" + j + "-" + i);
                if (checkbox === null) continue;
                if (checkbox.checked) {
                    wybrane.push(sentences[j - 1][i - 1]);
                }
            }
        }
    } else {
        for (let i = 1; i <= maxColumn; i++) {
            const koniec = sentences[i - 1].length;
            for (let j = 1; j <= koniec; j++) {
                var checkbox = document.getElementById("checkbox" + i + "-" + j);
                if (checkbox.checked) {
                    wybrane.push(sentences[i - 1][j - 1]);
                }
            }
        }
    }
    if (wybrane.length === 0) {
        snackbar("Wybierz zdania do połączenia");
        return
    }
    const element = document.createElement('textarea');
    element.value = wybrane.join(" ");
    document.body.appendChild(element);
    element.select();
    document.execCommand('copy');
    document.body.removeChild(element);
    snackbar("Skopiowano do schowka!");
}

function activateChangeSentenceOrder(column, row) {
    changeSentenceOrderID = [column, row];

    for (let i = 0; i < changeSentenceOrderButtons.length; i++) {
        document.getElementById(changeSentenceOrderButtons[i]).disabled = "";
    }
    document.getElementById("change-sentence-order-button" + column + "-" + row).disabled = "disabled";
    document.getElementById("change-sentence-order-button" + column + "-" + (row + 1)).disabled = "disabled";

    for (let i = 0; i < maxColumn; i++) {
        const koniec = sentences[i].length;
        for (let j = 0; j < koniec; j++) {
            const sentenceButton = document.getElementById("change-sentence-order-sentence-button" + i + "-" + j);
            const sentenceCell = document.getElementById("change-sentence-order-sentence-cell" + i + "-" + j);
            const sentenceButtonIcon = document.getElementById("change-sentence-order-sentence-button-icon" + i + "-" + j);
            sentenceButton.disabled = "disabled";
            sentenceCell.className = "mdl-data-table__cell--non-numeric disabled-sentence-cell";
            if (i !== column || j !== row) {
                sentenceButtonIcon.innerText = "";
            }
        }
    }
    document.getElementById("change-sentence-order-button-done").style.display = "none";
    document.getElementById("change-sentence-order-button-cancel").style.display = "inline-block";
}

function changeSentenceOrder(toColumn, toRow) {
    const column = changeSentenceOrderID[0];
    const row = changeSentenceOrderID[1];
    if (column === toColumn) {
        if (toRow < row) {
            arrayMove(sentences[column], row, toRow);
        } else {
            arrayMove(sentences[column], row, toRow - 1)
        }
    } else {
        sentences[toColumn].splice(toRow, 0, sentences[column][row]);
        sentences[column].splice(row, 1);
    }
    addToHistory();
    generateChangeSentenceOrder();
}

function editSentences() {
    editSentenceList = [];
    for (let i = 1; i <= maxColumn; i++) {
        const koniec = sentences[i - 1].length;
        for (let j = 1; j <= koniec; j++) {
            const checkbox = document.getElementById("checkbox" + i + "-" + j);
            if (checkbox.checked) {
                editSentenceList.push([sentences[i - 1][j - 1], i - 1, j - 1]);
            }
        }
    }
    if (editSentenceList.length === 0) {
        snackbar("Zaznacz zdania do edycji");
        return
    }

    document.getElementById("edit-sentences-dialog-textbox").value = editSentenceList[0][0];
    editSentenceCounter = 0;

    const dialogButton = document.getElementById("edit-sentences-dialog-button");
    if (editSentenceList.length === 1) {
        dialogButton.innerText = "Gotowe";
    } else {
        dialogButton.innerText = "Następne zdanie";
    }

    // Otworzenie okna dialogowego edycji zdań
    const dialog = document.querySelector("#edit-sentences-dialog");
    if (!dialog.showModal) {
        dialogPolyfill.registerDialog(dialog);
    }
    dialog.showModal();
    document.getElementById("edit-sentences-dialog-textbox").focus();

    // Odznaczenie checkboxów
    removeList();
    generateList();
}

function editNextSentence() {
    const dialogButton = document.getElementById("edit-sentences-dialog-button");
    const dialogTextbox = document.getElementById("edit-sentences-dialog-textbox");

    const column = editSentenceList[editSentenceCounter][1];
    const row = editSentenceList[editSentenceCounter][2];
    sentences[column].splice(row, 1, dialogTextbox.value);
    addToHistory();
    removeList();
    generateList();

    if (editSentenceCounter + 1 === editSentenceList.length) {
        const dialog = document.querySelector("#edit-sentences-dialog");
        dialog.close();
        return
    }
    dialogTextbox.value = editSentenceList[++editSentenceCounter][0];
    dialogTextbox.focus();

    if (editSentenceCounter + 1 === editSentenceList.length) {
        dialogButton.innerText = "Gotowe";
    }
}

function saveCheckboxes() {
    checkedCheckboxes = [];
    for (let i = 1; i <= sentences.length; i++) {
        const koniec = sentences[i - 1].length;
        for (let j = 1; j <= koniec; j++) {
            const checkbox = document.getElementById("checkbox" + i + "-" + j);
            if (checkbox.checked) {
                checkedCheckboxes.push([i, j]);
            }
        }
    }
}

function loadCheckboxes() {
    for (let i = 0; i < checkedCheckboxes.length; i++) {
        const checkboxLabel = document.getElementById("checkbox-label" + checkedCheckboxes[i][0] + "-" + checkedCheckboxes[i][1]);
        checkboxLabel.MaterialCheckbox.check();
    }
    checkedCheckboxes = [];
}