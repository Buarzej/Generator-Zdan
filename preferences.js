orderOfCombiningListenerExists = false;
oneColumnDialogListenerExists = false;
editSentencesDialogListenerExists = false;

function openList() {
    const input = document.getElementById("fileInput");
    input.click();
}

function saveList() {
    let isEmpty = true;
    for (let i = 0; i < maxColumn; i++) {
        if (sentences[i].length !== 0) {
            isEmpty = false;
            break
        }
    }
    if (isEmpty) {
        snackbar("Lista jest pusta");
        return
    }
    const listObject = {order: orderOfCombining, list: sentences};
    const jsonArray = JSON.stringify(listObject);
    writeToFile(jsonArray);
}

function openOrderOfCombiningDialog() {
    const oneColumnInfo = document.getElementById("order-of-combining-one-column-info");
    if (maxColumn !== 1) {
        oneColumnInfo.style.display = "none";
    } else {
        oneColumnInfo.style.display = "block";
    }

    const horizontalRadioButton = document.getElementById("order-of-combining-radio1");
    const verticalRadioButton = document.getElementById("order-of-combining-radio2");
    if (orderOfCombining === "horizontal") {
        horizontalRadioButton.parentNode.MaterialRadio.check();
        verticalRadioButton.parentNode.MaterialRadio.uncheck();
    } else {
        horizontalRadioButton.parentNode.MaterialRadio.uncheck();
        verticalRadioButton.parentNode.MaterialRadio.check();
    }

    const dialog = document.querySelector("#order-of-combining-dialog");
    if (!dialog.showModal) {
        dialogPolyfill.registerDialog(dialog);
    }
    dialog.showModal();
    if (!orderOfCombiningListenerExists) {
        dialog.querySelector('.close').addEventListener('click', function () {
            for (let i = 1; i <= 2; i++) {
                const radioButton = document.getElementById("order-of-combining-radio" + i);
                if (radioButton.checked) {
                    orderOfCombining = radioButton.value;
                    break
                }
            }
            dialog.close();
        });
        orderOfCombiningListenerExists = true;
    }
}

function initiateRemoveColumns() {
    if (maxColumn === 1) {
        snackbar("Nie można usunąć wszystkich kolumn");
        return
    }
    generateRemoveColumns();
}

function initiateMergeColumns() {
    if (maxColumn === 1) {
        snackbar("Za mało kolumn do połączenia");
        return
    }
    generateMergeColumns();
}

function initiateMoveColumns() {
    if (maxColumn === 1) {
        snackbar("Za mało kolumn do zmiany kolejności");
        return
    }
    generateMoveColumns();
}

function initiateChangeSentenceOrder() {
    if (maxRow === 0 || (maxRow === 1 && maxColumn === 1)) {
        snackbar("Nie ma czego zmieniać");
        return
    }
    generateChangeSentenceOrder();
}

function openOneColumnDialog() {
    const dialog = document.querySelector("#one-column-dialog");
    if (!dialog.showModal) {
        dialogPolyfill.registerDialog(dialog);
    }
    dialog.showModal();
    if (!oneColumnDialogListenerExists) {
        dialog.querySelector('.close').addEventListener('click', function () {
            dialog.close();
            mergeColumnsIntoOne();
            removeList();
            generateList();
        });
        oneColumnDialogListenerExists = true;
    }
}