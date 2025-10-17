let ducatCount = 0;
let history = [];

// --- Wichtige Konstanten ---
const DUCAT_PLAT_RATIO = 5; // Ziel: 1 Platin für 5 Dukaten (20 Platin für 100 Dukaten Teil)

// --- Initialisierung und Speichern ---

// Lädt den gespeicherten Stand beim Start
function loadState() {
    const savedCount = localStorage.getItem('ducatCount');
    const savedHistory = localStorage.getItem('history');

    if (savedCount !== null) {
        ducatCount = parseInt(savedCount);
    }
    if (savedHistory !== null) {
        history = JSON.parse(savedHistory);
    }

    updateDisplay();
}

// Speichert den aktuellen Stand
function saveState() {
    localStorage.setItem('ducatCount', ducatCount);
    localStorage.setItem('history', JSON.stringify(history));
}

// --- Hauptfunktionen ---

function addDucats(amount, source) {
    if (amount <= 0) return;

    ducatCount += amount;

    // Fügt den Eintrag zur Historie hinzu
    history.unshift({
        type: 'gain',
        amount: amount,
        description: `Verkauf: ${source}`,
        timestamp: new Date().toLocaleString()
    });

    updateDisplay();
    saveState();
}

function addCustomDucats() {
    const input = document.getElementById('customAmount');
    const amount = parseInt(input.value);

    if (isNaN(amount) || amount <= 0) {
        alert('Bitte geben Sie eine gültige Zahl > 0 ein.');
        return;
    }

    addDucats(amount, 'Benutzerdefiniert');
    input.value = ''; // Eingabefeld leeren
}

function spendDucats() {
    const amountInput = document.getElementById('spendAmount');
    const itemInput = document.getElementById('spendItemName');
    const amount = parseInt(amountInput.value);
    const itemName = itemInput.value.trim() || 'Baro Kauf';

    if (isNaN(amount) || amount <= 0) {
        alert('Bitte geben Sie einen gültigen Dukaten-Betrag > 0 ein.');
        return;
    }

    if (amount > ducatCount) {
        alert(`Sie haben nicht genügend Dukaten (${ducatCount}).`);
        return;
    }

    if (!confirm(`Sicher, dass Sie ${amount} Dukaten für "${itemName}" ausgeben möchten?`)) {
        return;
    }

    ducatCount -= amount;

    // Fügt den Eintrag zur Historie hinzu
    history.unshift({
        type: 'loss',
        amount: amount,
        description: `Kauf: ${itemName}`,
        timestamp: new Date().toLocaleString()
    });

    amountInput.value = ''; // Eingabefelder leeren
    itemInput.value = '';

    updateDisplay();
    saveState();
}

function clearHistory() {
    if (confirm("Sind Sie sicher, dass Sie die gesamte Historie löschen möchten?")) {
        history = [];
        saveState();
        updateDisplay();
    }
}


// --- Anzeige aktualisieren ---

function updateDisplay() {
    // 1. Dukaten-Zähler aktualisieren
    document.getElementById('ducatCount').textContent = ducatCount.toLocaleString('de-DE');

    // 2. Historie aktualisieren
    const list = document.getElementById('historyList');
    list.innerHTML = ''; // Liste leeren

    history.forEach(entry => {
        const listItem = document.createElement('li');
        const sign = entry.type === 'gain' ? '+' : '-';
        const cssClass = entry.type === 'gain' ? 'history-gain' : 'history-loss';

        // Historie-Text
        const textSpan = document.createElement('span');
        textSpan.textContent = `${entry.description}`;
        
        // Betrags-Span
        const amountSpan = document.createElement('span');
        amountSpan.className = cssClass;
        amountSpan.textContent = `${sign}${entry.amount} Dukaten`;

        // Zeitstempel
        const dateSpan = document.createElement('span');
        dateSpan.className = 'history-date';
        dateSpan.textContent = entry.timestamp;

        // Zusammenfügen
        listItem.appendChild(textSpan);
        listItem.appendChild(amountSpan);
        // Da wir nur zwei Spalten im Flexbox-Layout haben, fügen wir das Datum unter der Beschreibung hinzu
        
        const textWrapper = document.createElement('div');
        textWrapper.style.display = 'flex';
        textWrapper.style.flexDirection = 'column';
        textWrapper.style.gap = '2px';
        textWrapper.appendChild(textSpan);
        textWrapper.appendChild(dateSpan);

        // Ersetze die direkte TextSpan durch den Wrapper
        listItem.removeChild(textSpan);
        listItem.prepend(textWrapper);

        list.appendChild(listItem);
    });
    
    // 3. Dukaten/Platin Rate aktualisieren
    document.getElementById('platRate').textContent = `${DUCAT_PLAT_RATIO}:1`;
}

// App starten
loadState();
