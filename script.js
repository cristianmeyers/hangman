const words = {
    fr: {
        easy: ["chat", "chien", "arbre", "maison", "voiture"],
        medium: ["ordinateur", "plante", "fenêtre", "école", "souris"],
        hard: [
            "mélisse", "camomille", "romarin", "procrastination", "développement",
            "programmation", "vulnérabilité", "cybersécurité", "réseau", "algorithmique",
            "optimisation", "abstraction", "architecture", "synchronisation", "intelligence",
            "apprentissage", "infrastructure", "fonctionnalité", "implémentation", "résolution",
            "simulation", "logique", "intergiciel", "information", "décision", "manipulation",
            "interactivité", "spécification", "informatisation", "matérialisation", "réalisation",
            "exploitation", "exécution", "fonctionnement", "représentation", "encapsulation",
            "parallélisation", "connectivité", "cloud", "serveur", "opérationnel", "conception",
            "prototype", "modélisation", "traitement", "analyse"
        ]
    },
    en: {
        easy: ["cat", "dog", "tree", "house", "car"],
        medium: ["computer", "plant", "window", "school", "mouse"],
        hard: [
            "procrastination", "development", "programming", "vulnerability", "cybersecurity",
            "network", "algorithm", "optimization", "abstraction", "architecture",
            "synchronization", "intelligence", "learning", "infrastructure", "functionality",
            "implementation", "resolution", "simulation", "logic", "middleware", "information",
            "decision", "manipulation", "interactivity", "specification", "computerization",
            "materialization", "realization", "exploitation", "execution", "operation",
            "representation", "encapsulation", "parallelization", "connectivity", "cloud",
            "server", "operational", "design", "prototype", "modeling", "processing", "analysis"
        ]
    },
    es: {
        easy: ["gato", "perro", "árbol", "casa", "coche"],
        medium: ["computadora", "planta", "ventana", "escuela", "ratón"],
        hard: [
            "procrastinación", "desarrollo", "programación", "vulnerabilidad", "ciberseguridad",
            "red", "algoritmo", "optimización", "abstracción", "arquitectura",
            "sincronización", "inteligencia", "aprendizaje", "infraestructura", "funcionalidad",
            "implementación", "resolución", "simulación", "lógica", "middleware", "información",
            "decisión", "manipulación", "interactividad", "especificación", "informatización",
            "materialización", "realización", "explotación", "ejecución", "operación",
            "representación", "encapsulación", "paralelización", "conectividad", "nube",
            "servidor", "operacional", "diseño", "prototipo", "modelado", "procesamiento", "análisis"
        ]
    }
};

let selectedWord;
let attempts;
let guessedLetters;
let wrongLetters;

const wordDisplay = document.getElementById("wordDisplay");
const wrongLettersDisplay = document.getElementById("wrongLetters");
const attemptsDisplay = document.getElementById("attempts");
const letterInput = document.getElementById("letterInput");
const submitButton = document.getElementById("submitLetter");
const messageDisplay = document.getElementById("message");
const restartButton = document.getElementById("restartButton");
const startButton = document.getElementById("startGame");
const levelSelect = document.getElementById("level");
const languageSelect = document.getElementById("language");

// Función para normalizar letras (eliminar acentos)
function normalizeLetter(letter) {
    return letter.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// Función para iniciar el juego
function startGame() {
    const level = levelSelect.value;
    const language = languageSelect.value;

    // Obtener una palabra aleatoria de la lista de palabras
    selectedWord = words[language][level][Math.floor(Math.random() * words[language][level].length)];
    switch (level) {
        case "easy":
            attempts = 6;
            break;
        case "medium":
            attempts = 5;
            break;
        case "hard":
            attempts = 4;
            break;
    }
    
    guessedLetters = [];
    wrongLetters = [];
    updateDisplay();
    messageDisplay.innerHTML = '';
    restartButton.style.display = 'none';
    submitButton.disabled = false;
}

// Función para actualizar la visualización de la palabra
function updateDisplay() {
    wordDisplay.innerHTML = selectedWord.split('').map(letter => (guessedLetters.includes(normalizeLetter(letter)) ? letter : "_")).join(' ');
    wrongLettersDisplay.innerHTML = wrongLetters.join(', ');
    attemptsDisplay.innerHTML = attempts;
}

// Función para manejar la adivinanza
function guessLetter() {
    const letter = letterInput.value.toLowerCase();
    letterInput.value = '';
    
    if (guessedLetters.includes(letter) || wrongLetters.includes(letter) || letter === '') {
        return;
    }

    if (selectedWord.includes(normalizeLetter(letter))) {
        guessedLetters.push(normalizeLetter(letter));
    } else {
        wrongLetters.push(letter);
        attempts--;
    }

    updateDisplay();

    // Comprobar si se ganó o perdió
    if (attempts === 0) {
        messageDisplay.innerHTML = `Vous avez perdu! Le mot était "${selectedWord}".`;
        submitButton.disabled = true;
        restartButton.style.display = 'block';
    } else if (!wordDisplay.innerHTML.includes("_")) {
        messageDisplay.innerHTML = "Félicitations! Vous avez deviné le mot.";
        submitButton.disabled = true;
        restartButton.style.display = 'block';
    }
}

// Función para reiniciar el juego
function restartGame() {
    startGame();
}

// Eventos
startButton.addEventListener("click", startGame);
submitButton.addEventListener("click", guessLetter);
restartButton.addEventListener("click", restartGame);
