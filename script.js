let ducatCount = 0;
let history = [];

// ... (Alle anderen Funktionen: loadState, saveState, addDucats, addCustomDucats, spendDucats)
// ...

function resetDucats() {
    if (confirm("Sind Sie sicher, dass Sie den Dukaten-Zähler auf 0 zurücksetzen möchten? Die Historie bleibt erhalten.")) {
        ducatCount = 0;

        // Optional: Füge einen Eintrag in die Historie ein
        history.unshift({
            type: 'reset',
            amount: 0,
            description: 'Zähler manuell auf 0 zurückgesetzt',
            timestamp: new Date().toLocaleString()
        });
        
        updateDisplay();
        saveState();
    }
}

function clearHistory() {
    if (confirm("Sind Sie sicher, dass Sie die gesamte Historie löschen möchten?")) {
        history = [];
        // ACHTUNG: Der Dukaten-Zähler bleibt hier erhalten
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
        let sign = '';
        let cssClass = '';

        if (entry.type === 'gain') {
            sign = '+';
            cssClass = 'history-gain';
        } else if (entry.type === 'loss') {
            sign = '-';
            cssClass = 'history-loss';
        } else { // Typ 'reset'
            cssClass = 'history-reset'; // Könnte im CSS einen eigenen Stil bekommen
        }

        // Historie-Text
        const textSpan = document.createElement('span');
        textSpan.textContent = `${entry.description}`;
        
        // Betrags-Span
        const amountSpan = document.createElement('span');
        amountSpan.className = cssClass;
        amountSpan.textContent = entry.type === 'reset' ? '—' : `${sign}${entry.amount} Dukaten`;

        // Zeitstempel
        const dateSpan = document.createElement('span');
        dateSpan.className = 'history-date';
        dateSpan.textContent = entry.timestamp;

        // Zusammenfügen
        const textWrapper = document.createElement('div');
        textWrapper.style.display = 'flex';
        textWrapper.style.flexDirection = 'column';
        textWrapper.style.gap = '2px';
        textWrapper.appendChild(textSpan);
        textWrapper.appendChild(dateSpan);

        listItem.appendChild(textWrapper);
        listItem.appendChild(amountSpan);
        
        list.appendChild(listItem);
    });
    
    // 3. Dukaten/Platin Rate aktualisieren
    document.getElementById('platRate').textContent = `${DUCAT_PLAT_RATIO}:1`;
}

// App starten
loadState();
