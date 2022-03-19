let mergeID = -1;
let moveID = -1;

function generateRemoveColumns() {
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

    for (let j = 0; j < maxRow; j++) {
        tableRow = document.createElement('tr');
        for (let i = 0; i < maxColumn; i++) {
            if (sentences[i][j] !== undefined) {
                tableData = document.createElement('td');
                tableData.className = "mdl-data-table__cell--non-numeric";
                tableData.innerHTML = "<label class=\"mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect\" for=\"checkbox" + (i + 1) + "-" + (j + 1) + "\"><input type=\"checkbox\" id=\"checkbox" + (i + 1) + "-" + (j + 1) + "\" class=\"mdl-checkbox__input\" disabled=\"disabled\"/></label>";
                tableRow.appendChild(tableData);
                tableData = document.createElement('td');
                tableData.className = "mdl-data-table__cell--non-numeric disabled-sentence-cell";
                tableData.style = "height: 57px";
                tableData.innerText = sentences[i][j];
                tableRow.appendChild(tableData);
            } else {
                tableData = document.createElement('td');
                tableData.className = "mdl-data-table__cell--non-numeric";
                tableRow.appendChild(tableData);
                tableData = document.createElement('td');
                tableData.className = "mdl-data-table__cell--non-numeric disabled-sentence-cell";
                tableRow.appendChild(tableData);
            }
        }
        tableBody.appendChild(tableRow);
    }

    // Zaznaczanie do usunięcia.
    tableRow = document.createElement('tr');
    for (let i = 0; i < maxColumn; i++) {
        tableData = document.createElement('td');
        tableData.className = "mdl-data-table__cell--non-numeric";
        tableData.onclick = function () {
            clickCheckbox("checkbox-remove-label" + (i + 1), "checkbox-remove" + (i + 1));
        }
        tableData.innerHTML = "<label id=\"checkbox-remove-label" + (i + 1) + "\" class=\"mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect\" for=\"checkbox-remove" + (i + 1) + "\"><input type=\"checkbox\" id=\"checkbox-remove" + (i + 1) + "\" class=\"mdl-checkbox__input\"/></label>";
        tableRow.appendChild(tableData);
        tableData = document.createElement('td');
        tableData.className = "mdl-data-table__cell--non-numeric";
        tableData.style = "font-weight: 500; height: 96px";
        tableData.onclick = function () {
            clickCheckbox("checkbox-remove-label" + (i + 1), "checkbox-remove" + (i + 1));
        }
        tableData.innerHTML = "<div class=\"spacer-div-cell\">Zaznacz kolumnę</div>"
        tableRow.appendChild(tableData);
    }
    tableBody.appendChild(tableRow);

    // Przycisk usuwania.
    buttons = document.createElement('div');
    buttons.id = "buttons";
    buttons.className = "center-buttons"
    buttons.innerHTML = "<button style=\"margin: 0 0 8px 0\" onclick=\"removeColumns()\" class=\"mdl-button mdl-js-button mdl-button--raised mdl-button--accent\">Usuń zaznaczone</button><button style=\"margin: 0 0 8px 8px\" onclick=\"removeList(); generateList()\" class=\"mdl-button mdl-js-button\">Anuluj</button>";

    list.appendChild(tableBody);
    content.appendChild(list);
    content.appendChild(buttons);
    componentHandler.upgradeDom();
    currentView = "removeColumns";
}

function generateMergeColumns() {
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

    for (let j = 0; j < maxRow; j++) {
        tableRow = document.createElement('tr');
        for (let i = 0; i < maxColumn; i++) {
            if (sentences[i][j] !== undefined) {
                tableData = document.createElement('td');
                tableData.className = "mdl-data-table__cell--non-numeric";
                tableData.innerHTML = "<label class=\"mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect\" for=\"checkbox" + (i + 1) + "-" + (j + 1) + "\"><input type=\"checkbox\" id=\"checkbox" + (i + 1) + "-" + (j + 1) + "\" class=\"mdl-checkbox__input\" disabled=\"disabled\"/></label>";
                tableRow.appendChild(tableData);
                tableData = document.createElement('td');
                tableData.className = "mdl-data-table__cell--non-numeric disabled-sentence-cell";
                tableData.style = "height: 57px";
                tableData.innerText = sentences[i][j];
                tableRow.appendChild(tableData);
            } else {
                tableData = document.createElement('td');
                tableData.className = "mdl-data-table__cell--non-numeric";
                tableRow.appendChild(tableData);
                tableData = document.createElement('td');
                tableData.className = "mdl-data-table__cell--non-numeric disabled-sentence-cell";
                tableRow.appendChild(tableData);
            }
        }
        tableBody.appendChild(tableRow);
    }

    // Przyciski łączenia.
    tableRow = document.createElement('tr');
    for (let i = 0; i < maxColumn; i++) {
        tableData = document.createElement('td');
        tableData.className = "mdl-data-table__cell--non-numeric";
        tableData.innerHTML = "<button class=\"mdl-button mdl-js-button mdl-button--icon\" id=\"merge-icon-button" + (i + 1) + "\" onclick=\"mergeColumns(" + (i + 1) + ")\"><i class=\"material-icons\" id=\"merge-icon" + (i + 1) + "\">merge_type</i></button>"
        tableRow.appendChild(tableData);
        tableData = document.createElement('td');
        tableData.className = "mdl-data-table__cell--non-numeric";
        tableData.style = "font-weight: 500; height: 96px";
        tableData.innerHTML = "<div class=\"spacer-div-cell\"><button onclick=\"mergeColumns(" + (i + 1) + ")\" class=\"mdl-button mdl-js-button\" id=\"merge-button" + (i + 1) + "\">Połącz tę kolumnę z inną</button></div>";
        tableRow.appendChild(tableData);
    }
    tableBody.appendChild(tableRow);

    // Przycisk wyjścia z trybu łączenia.
    buttons = document.createElement('div');
    buttons.id = "buttons";
    buttons.className = "center-buttons";
    buttons.innerHTML = "<button id=\"merge-button-done\" style=\"margin: 0 0 8px 0\" onclick=\"removeList(); generateList()\" class=\"mdl-button mdl-js-button mdl-button--raised mdl-button--accent\">Gotowe</button><button id=\"merge-button-cancel\" style=\"margin: 0 0 8px 0; display: none\" onclick=\"generateMergeColumns()\" class=\"mdl-button mdl-js-button mdl-button--raised mdl-button--accent\">Anuluj</button>";

    list.appendChild(tableBody);
    content.appendChild(list);
    content.appendChild(buttons);
    componentHandler.upgradeDom();
    currentView = "mergeColumns";
}

function generateMoveColumns() {
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

    for (let j = 0; j < maxRow; j++) {
        tableRow = document.createElement('tr');
        for (let i = 0; i < maxColumn; i++) {
            if (sentences[i][j] !== undefined) {
                tableData = document.createElement('td');
                tableData.className = "mdl-data-table__cell--non-numeric";
                tableRow.appendChild(tableData);
                tableData = document.createElement('td');
                tableData.className = "mdl-data-table__cell--non-numeric disabled-sentence-cell";
                tableData.style = "height: 57px";
                tableData.innerText = sentences[i][j];
                tableRow.appendChild(tableData);
            } else {
                tableData = document.createElement('td');
                tableData.className = "mdl-data-table__cell--non-numeric";
                tableRow.appendChild(tableData);
                tableData = document.createElement('td');
                tableData.className = "mdl-data-table__cell--non-numeric disabled-sentence-cell";
                tableRow.appendChild(tableData);
            }
        }
        tableData = document.createElement('td');
        tableData.className = "mdl-data-table__cell--non-numeric";
        tableRow.appendChild(tableData);
        tableBody.appendChild(tableRow);
    }

    // Przyciski przesuwania.
    tableRow = document.createElement('tr');
    for (let i = 0; i < maxColumn; i++) {
        tableData = document.createElement('td');
        tableData.className = "mdl-data-table__cell--non-numeric";
        tableData.innerHTML = "<button class=\"mdl-button mdl-js-button mdl-button--icon\" id=\"move-icon-button" + i + "\" onclick=\"moveColumn(" + i + ")\" disabled=\"disabled\"><i class=\"material-icons\" id=\"move-icon" + i + "\">swap_horiz</i></button>"
        tableRow.appendChild(tableData);
        tableData = document.createElement('td');
        tableData.className = "mdl-data-table__cell--non-numeric";
        tableData.style = "font-weight: 500; height: 96px";
        tableData.innerHTML = "<div class=\"spacer-div-cell\"><button onclick=\"moveColumn(" + i + ")\" class=\"mdl-button mdl-js-button\" id=\"move-button" + i + "\">Przenieś tę kolumnę</button></div>";
        tableRow.appendChild(tableData);
    }
    tableData = document.createElement('td');
    tableData.className = "mdl-data-table__cell--non-numeric";
    tableData.innerHTML = "<button class=\"mdl-button mdl-js-button mdl-button--icon\" id=\"move-icon-button" + maxColumn + "\" onclick=\"moveColumn(" + maxColumn + ")\" disabled=\"disabled\"><i class=\"material-icons\" id=\"move-icon" + maxColumn + "\">swap_horiz</i></button>"
    tableRow.appendChild(tableData);
    tableBody.appendChild(tableRow);

    // Przycisk wyjścia z trybu przesuwania.
    buttons = document.createElement('div');
    buttons.id = "buttons";
    buttons.className = "center-buttons";
    buttons.innerHTML = "<button id=\"move-button-done\" style=\"margin: 0 0 8px 0\" onclick=\"removeList(); generateList()\" class=\"mdl-button mdl-js-button mdl-button--raised mdl-button--accent\">Gotowe</button><button id=\"move-button-cancel\" style=\"margin: 0 0 8px 0; display: none\" onclick=\"generateMoveColumns()\" class=\"mdl-button mdl-js-button mdl-button--raised mdl-button--accent\">Anuluj</button>";

    list.appendChild(tableBody);
    content.appendChild(list);
    content.appendChild(buttons);
    componentHandler.upgradeDom();
    currentView = "moveColumns";
}

function addColumn() {
    sentences.push([]);
    addToHistory();
    removeList();
    generateList();
}

function removeColumns() {
    const toRemove = [];
    for (let i = 1; i <= maxColumn; i++) {
        const checkbox = document.getElementById("checkbox-remove" + i);
        if (checkbox.checked) {
            toRemove.push(i);
        }
    }
    if (toRemove.length === maxColumn) {
        snackbar("Nie można usunąć wszystkich kolumn");
        return
    }
    let pomocnicza = 0;
    for (let j = 0; j < toRemove.length; j++) {
        sentences.splice(toRemove[j] - 1 - pomocnicza, 1);
        pomocnicza++;
    }
    addToHistory();
    removeList();
    generateList();
}

function mergeColumns(index) {
    if (mergeID === -1) {
        mergeID = index;
        for (let i = 1; i <= maxColumn; i++) {
            if (i === mergeID) {
                document.getElementById("merge-icon-button" + i).disabled = "disabled";
                document.getElementById("merge-button" + i).innerText = "Wybrana kolumna";
                document.getElementById("merge-button" + i).disabled = "disabled";
            } else {
                document.getElementById("merge-icon" + i).innerText = "vertical_align_top";
                document.getElementById("merge-button" + i).innerText = "Wstaw kolumnę tutaj";
            }
        }
        document.getElementById("merge-button-done").style.display = "none";
        document.getElementById("merge-button-cancel").style.display = "inline-block";
    } else {
        for (let i = 0; i < sentences[mergeID - 1].length; i++) {
            sentences[index - 1].push(sentences[mergeID - 1][i]);
        }
        sentences.splice(mergeID - 1, 1);

        addToHistory();
        if (maxColumn - 1 < 2) {
            removeList();
            generateList();
        } else {
            generateMergeColumns();
        }
    }
}

function mergeColumnsIntoOne() {
    const temp = sentences;
    sentences = [[]];
    if (orderOfCombining === "horizontal") {
        let tempMaxRow = 0;
        for (let i = 0; i < temp.length; i++) {
            tempMaxRow = Math.max(tempMaxRow, temp[i].length);
        }
        for (let i = 0; i < tempMaxRow; i++) {
            for (let j = 0; j < temp.length; j++) {
                if (i < temp[j].length) {
                    sentences[0].push(temp[j][i]);
                }
            }
        }
    } else {
        for (let i = 0; i < temp.length; i++) {
            const koniec = temp[i].length;
            for (let j = 0; j < koniec; j++) {
                sentences[0].push(temp[i][j]);
            }
        }
    }
}

function moveColumn(index) {
    if (moveID === -1) {
        moveID = index;
        for (let i = 0; i <= maxColumn; i++) {
            if (i === moveID) {
                document.getElementById("move-icon-button" + i).disabled = "";
                document.getElementById("move-icon" + i).innerText = "vertical_align_top";
                document.getElementById("move-button" + i).innerText = "Wybrana kolumna";
                document.getElementById("move-button" + i).disabled = "disabled";
            } else if (i === maxColumn) {
                document.getElementById("move-icon-button" + i).disabled = "";
                document.getElementById("move-icon" + i).innerText = "vertical_align_top";
            } else {
                document.getElementById("move-icon-button" + i).disabled = "";
                document.getElementById("move-icon" + i).innerText = "vertical_align_top";
                document.getElementById("move-button" + i).innerText = "";
                document.getElementById("move-button" + i).disabled = "disabled";
            }
        }
        document.getElementById("move-icon-button" + moveID).disabled = "disabled";
        document.getElementById("move-icon" + moveID).innerText = "vertical_align_top";
        document.getElementById("move-icon-button" + (moveID + 1)).disabled = "disabled";
        document.getElementById("move-icon" + (moveID + 1)).innerText = "vertical_align_top";

        document.getElementById("move-button-done").style.display = "none";
        document.getElementById("move-button-cancel").style.display = "inline-block";
    } else {
        if (index < moveID) {
            arrayMove(sentences, moveID, index);
        } else {
            arrayMove(sentences, moveID, index - 1)
        }
        addToHistory();
        generateMoveColumns();
    }
}