// Fonction qui me permet d'utiliser les clavier

document.addEventListener("keydown", function(event) {
    const key = event.key;
    if (/\d/.test(key) || "+-*/().".includes(key)) {
        Touches(key);
    } else if (key === "Enter") {
        calculateResult();
    } else if (key === "Backspace") {
        deleteLast();
    } else if (key === "Escape") {
        clearDisplay();
    }
});

function Touches(value) {
    document.getElementById("display").value += value;
    AfficherHistorique();
}

function EffachesTous() {
    document.getElementById("display").value = "";
    AfficherHistorique();
}

function EffaceDernier() {
    let display = document.getElementById("display");
    display.value = display.value.slice(0, -1);
    AfficherHistorique();
}

function Resultat() {
    let display = document.getElementById("display");
    let expression = display.value;

    try {
        let result = eval(expression);
        display.value = result;
        AjouteHistorique(expression, result);
    } catch (e) {
        display.value = "Erreur";
    }
    AfficherHistorique();
}

function AjouteHistorique(expression, result) {
    let historyList = document.getElementById("history");
    let listItem = document.createElement("li");
    listItem.textContent = `${expression} = ${result}`;
    historyList.prepend(listItem);
}

// Afficher/Masquer l'historique avec le bouton horloge 🕘
function MasquerHistorique() {
    let historyContainer = document.getElementById("history-container");
    historyContainer.classList.toggle("show");
}

// Masquer l'historique lorsque l'on clique sur un bouton de la calculatrice
function AfficherHistorique() {
    let historyContainer = document.getElementById("history-container");
    if (historyContainer.classList.contains("show")) {
        historyContainer.classList.remove("show");
    }
}

// Ajouter un écouteur d'événements pour masquer l'historique lorsque l'on clique sur un bouton
document.querySelectorAll('.buttons button').forEach(button => {
    button.addEventListener('click', AfficherHistorique);
});