function bootSequence() {
    activateFiles();
    activateKeyboardShortcuts();
    activateEditEnter();
    addToHistory();
    generateList();
    fitTable();
    activateDesktopVersion()
}

function activateEnter() {  // Aktywuje zatwierdzanie dodawania nowych zdań enterem
    for (let i = 1; i <= maxColumn; i++) {
        var input = document.getElementById("new" + i);
        input.addEventListener("keyup", function (event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                document.getElementById("add" + i).click();
            }
        });
    }
}

function activateEditEnter() {  // Aktywuje zatwierdzanie zdań enterem w oknie dialogowym edycji zdań
    var editSentencesInput = document.getElementById("edit-sentences-dialog-textbox");
    editSentencesInput.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            editNextSentence();
        }
    });
}

function activateFiles() {
    var temp = [];
    var input = document.getElementById("fileInput");
    input.addEventListener('change', function selectedFileChanged() {
        if (this.files.length !== 0) {
            const reader = new FileReader();
            reader.onload = function fileReadCompleted() {
                try {
                    temp = JSON.parse(reader.result.toString());
                } catch (ex) {
                    console.error(ex);
                    snackbar("Ten plik nie zawiera listy");
                    return
                }

                // Sprawdzanie konwersji pliku
                if (Array.isArray(temp)) {
                    orderOfCombining = "horizontal";
                    sentences = temp;

                    // Konwersja tablic jednowymiarowych
                    if (getdim(temp) !== false) {
                        if (getdim(temp).length === 1) {
                            sentences = [];
                            sentences.push(temp);
                            clearHistory();
                            removeList();
                            generateList();
                            snackbar("Pomyślnie wczytano listę");
                            return
                        }
                    }

                    // Scalanie kolumn w jedną w wersji mobilnej
                    if (isSmallScreen() && temp.length > 1) {
                        openOneColumnDialog();
                        return
                    }

                    clearHistory();
                    removeList();
                    generateList();
                    snackbar("Pomyślnie wczytano listę");
                    return
                }

                orderOfCombining = temp.order;
                sentences = temp.list;

                // Scalanie kolumn w jedną w wersji mobilnej
                if (isSmallScreen() && temp.list.length > 1) {
                    openOneColumnDialog();
                    return
                }

                clearHistory();
                removeList();
                generateList();
                snackbar("Pomyślnie wczytano listę");
            };
            reader.readAsText(this.files[0]);
        }
    });
}

function activateDesktopVersion() {
    if (isDesktopComputer()) {
        for (let j = 0; j < 10; j++) { // Nie wiem, czemu działa, ale działa
            var mobileElements = document.getElementsByClassName("mdl-layout--large-screen-only");
            for (let i = 0; i < mobileElements.length; i++) {
                mobileElements[i].classList.remove("mdl-layout--large-screen-only");
            }
        }
    }
}

function activateKeyboardShortcuts() {
    document.onkeydown = function () {
        var evtobj = window.event ? event : e
        if (evtobj.keyCode === 90 && evtobj.ctrlKey && evtobj.shiftKey) {
            document.getElementById("redo").click();
        } else if (evtobj.keyCode === 89 && evtobj.ctrlKey) {
            document.getElementById("redo").click();
        } else if (evtobj.keyCode === 90 && evtobj.ctrlKey) {
            document.getElementById("undo").click();
        }
    }
}


function fitTable() {
    if (isSmallScreen()) {
        document.getElementById("table-new-sentence").style.width = "auto";
    }
}

function clickCheckbox(labelID, checkboxID) {
    var checkboxLabel = document.getElementById(labelID);
    var checkbox = document.getElementById(checkboxID);
    if (checkbox.checked) {
        checkboxLabel.MaterialCheckbox.uncheck();
    } else {
        checkboxLabel.MaterialCheckbox.check();
    }
}

function snackbar(string) {
    var notification = document.querySelector('.mdl-js-snackbar');
    notification.MaterialSnackbar.showSnackbar(
        {message: string}
    );
}

function writeToFile(content) {
    var a = document.createElement("a");
    var file = new Blob([content], {type: 'text/plain'});
    a.href = URL.createObjectURL(file);
    a.download = "lista.txt";
    a.click();
}

function isSmallScreen() {
    if (isDesktopComputer()) {
        return false
    }
    return document.getElementById("layout").classList.contains("is-small-screen")
}

function isDesktopComputer() {
    return (typeof window.orientation === "undefined") && (navigator.userAgent.indexOf('IEMobile') === -1);
}

function arrayMove(arr, fromIndex, toIndex) {
    var element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
}

function copyArray(aObject) {
    if (!aObject) {
        return aObject;
    }
    let v;
    let bObject = Array.isArray(aObject) ? [] : {};
    for (const k in aObject) {
        v = aObject[k];
        bObject[k] = (typeof v === "object") ? copyArray(v) : v;
    }
    return bObject;
}

/*function synchronizeSettings() {
    if (getCookie("twoColumns") === "1") {
        twoColumns = "1";
    }
}

function setCookie(cname, cvalue) {
    var d = new Date();
    d.setTime(d.getTime() + (90 * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}*/