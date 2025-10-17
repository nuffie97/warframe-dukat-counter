let currentDukats = 0;
// NEU: Zähler für die einzelnen Teile-Werte
let partCounters = {
    15: 0,
    45: 0,
    100: 0
};

const historyList = document.getElementById('history-list');
const dukatCountDisplay = document.getElementById('dukat-count');
// NEU: Referenzen zu den neuen Anzeigeelementen
const count15Display = document.getElementById('count-15');
const count45Display = document.getElementById('count-45');
const count100Display = document.getElementById('count-100');


/**
 * Aktualisiert die Anzeige des Dukaten-Zählers und der Teile-Zähler.
 */
function updateDisplay() {
    dukatCountDisplay.textContent = currentDukats;
    // NEU: Aktualisiere die Teile-Zähler
    count15Display.textContent = partCounters[15];
    count45Display.textContent = partCounters[45];
    count100Display.textContent = partCounters[100];
}

/**
 * Fügt Dukaten hinzu, erhöht den entsprechenden Teile-Zähler und speichert den Vorgang in der Historie.
 * @param {number} amount - Die Menge der hinzuzufügenden Dukaten (15, 45 oder 100).
 */
function addDukats(amount) {
    if (amount <= 0 || !partCounters.hasOwnProperty(amount)) return;

    // 1. Dukaten-Zähler und Teile-Zähler aktualisieren
    currentDukats += amount;
    partCounters[amount]++;
    updateDisplay();

    // 2. Historie-Eintrag erstellen
    const now = new Date();
    const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    const historyItem = document.createElement('li');
    
    let partType = '';
    if (amount === 15) partType = 'Bronze';
    else if (amount === 45) partType = 'Silber';
    else if (amount === 100) partType = 'Gold';
    
    historyItem.textContent = `[${timeString}] +1 ${partType} Teil (+${amount} Dukaten). Neuer Stand: ${currentDukats}`;
    
    // Fügt den neuen Eintrag ganz oben hinzu (neueste zuerst)
    historyList.prepend(historyItem);
}

/**
 * Setzt den gesamten Zähler und alle Teile-Zähler zurück und protokolliert den Reset.
 */
function resetCounter() {
    if (currentDukats === 0) return;

    const oldDukats = currentDukats;
    
    // 1. Alle Zähler zurücksetzen
    currentDukats = 0;
    partCounters = { 15: 0, 45: 0, 100: 0 };
    updateDisplay();
    
    // 2. Historie-Eintrag erstellen
    const now = new Date();
    const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    const historyItem = document.createElement('li');
    historyItem.textContent = `[${timeString}] Zähler komplett zurückgesetzt (Dukaten: ${oldDukats}).`;
    historyItem.style.fontWeight = 'bold';
    
    // Fügt den neuen Eintrag ganz oben hinzu
    historyList.prepend(historyItem);
}

// Initialer Aufruf, um den Zähler beim Start auf 0 zu setzen
document.addEventListener('DOMContentLoaded', updateDisplay);