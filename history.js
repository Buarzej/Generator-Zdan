var historyQueue = [];
var historyIndicator = -1;
var historyMaxLength = 100;
var currentView = "";

function undo() {
    sentences = copyArray(historyQueue[--historyIndicator]);

    document.getElementById("redo").disabled = "";
    if (historyIndicator === 0) {
        document.getElementById("undo").disabled = "disabled";
    }

    if (currentView === "changeSentenceOrder") {
        generateChangeSentenceOrder();
    } else if (currentView === "mergeColumns") {
        generateMergeColumns();
    } else if (currentView === "moveColumns") {
        generateMoveColumns();
    } else {
        removeList();
        generateList();
    }
}

function redo() {
    sentences = copyArray(historyQueue[++historyIndicator]);

    document.getElementById("undo").disabled = "";
    if (historyIndicator === historyQueue.length - 1) {
        document.getElementById("redo").disabled = "disabled";
    }

    if (currentView === "changeSentenceOrder") {
        generateChangeSentenceOrder();
    } else if (currentView === "mergeColumns") {
        generateMergeColumns();
    } else if (currentView === "moveColumns") {
        generateMoveColumns();
    } else {
        removeList();
        generateList();
    }

    removeList();
    generateList();
}

function addToHistory() {
    // Test przepełnienia historii
    if (historyQueue.length === historyMaxLength && historyIndicator === historyQueue.length - 1) {
        historyQueue.splice(0, 1);
        historyQueue.push(copyArray(sentences));
        return
    }

    if (historyIndicator !== historyQueue.length - 1) {
        historyQueue.splice(historyIndicator + 1, historyQueue.length - historyIndicator - 1);
    }
    historyQueue.push(copyArray(sentences));
    historyIndicator++;

    document.getElementById("redo").disabled = "disabled";
    if (historyQueue.length >= 2) {
        document.getElementById("undo").disabled = "";
    }
}

function clearHistory() {
    historyQueue = [];
    historyIndicator = -1;
    document.getElementById("undo").disabled = "disabled";
    document.getElementById("redo").disabled = "disabled";
    addToHistory();
}