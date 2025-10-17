let currentDukats = 0;
const historyList = document.getElementById('history-list');
const dukatCountDisplay = document.getElementById('dukat-count');

/**
 * Aktualisiert die Anzeige des Dukaten-Zählers.
 */
function updateDisplay() {
    dukatCountDisplay.textContent = currentDukats;
}

/**
 * Fügt Dukaten hinzu und speichert den Vorgang in der Historie.
 * @param {number} amount - Die Menge der hinzuzufügenden Dukaten.
 */
function addDukats(amount) {
    if (amount <= 0) return;

    // 1. Dukaten-Zähler aktualisieren
    currentDukats += amount;
    updateDisplay();

    // 2. Historie-Eintrag erstellen
    const now = new Date();
    const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    const historyItem = document.createElement('li');
    historyItem.textContent = `[${timeString}] +${amount} Dukaten. Neuer Stand: ${currentDukats}`;
    
    // Fügt den neuen Eintrag ganz oben hinzu (neueste zuerst)
    historyList.prepend(historyItem);
}

/**
 * Setzt den Zähler zurück und protokolliert den Reset.
 */
function resetCounter() {
    if (currentDukats === 0) return; // Nichts zu tun

    const oldDukats = currentDukats;
    
    // 1. Zähler zurücksetzen
    currentDukats = 0;
    updateDisplay();
    
    // 2. Historie-Eintrag erstellen
    const now = new Date();
    const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    const historyItem = document.createElement('li');
    historyItem.textContent = `[${timeString}] Zähler zurückgesetzt von ${oldDukats} auf 0.`;
    historyItem.style.fontWeight = 'bold'; // Hebt den Reset hervor
    
    // Fügt den neuen Eintrag ganz oben hinzu
    historyList.prepend(historyItem);
}

// Initialer Aufruf, um den Zähler beim Start auf 0 zu setzen
document.addEventListener('DOMContentLoaded', updateDisplay);