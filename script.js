// Fonction qui me permet d'utiliser les clavier

document.addEventListener("keydown", function(event) {
    const key = event.key;
    if (/\d/.test(key) || "+-*/().".includes(key)) {
        appendToDisplay(key);
    } else if (key === "Enter") {
        calculateResult();
    } else if (key === "Backspace") {
        deleteLast();
    } else if (key === "Escape") {
        clearDisplay();
    }
});

function appendToDisplay(value) {
    document.getElementById("display").value += value;
    hideHistory();
}

function clearDisplay() {
    document.getElementById("display").value = "";
    hideHistory();
}

function deleteLast() {
    let display = document.getElementById("display");
    display.value = display.value.slice(0, -1);
    hideHistory();
}

function calculateResult() {
    let display = document.getElementById("display");
    let expression = display.value;

    try {
        let result = eval(expression);
        display.value = result;
        addToHistory(expression, result);
    } catch (e) {
        display.value = "Erreur";
    }
    hideHistory();
}

function addToHistory(expression, result) {
    let historyList = document.getElementById("history");
    let listItem = document.createElement("li");
    listItem.textContent = `${expression} = ${result}`;
    historyList.prepend(listItem);
}

// Afficher/Masquer l'historique avec le bouton horloge 🕘
function toggleHistory() {
    let historyContainer = document.getElementById("history-container");
    historyContainer.classList.toggle("show");
}

// Masquer l'historique lorsque l'on clique sur un bouton de la calculatrice
function hideHistory() {
    let historyContainer = document.getElementById("history-container");
    if (historyContainer.classList.contains("show")) {
        historyContainer.classList.remove("show");
    }
}

// Ajouter un écouteur d'événements pour masquer l'historique lorsque l'on clique sur un bouton
document.querySelectorAll('.buttons button').forEach(button => {
    button.addEventListener('click', hideHistory);
});