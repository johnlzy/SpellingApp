// --- STATE ---
let currentQueue = [];
let queueDetails = {}; // Map of word -> sentence
let completedWords = [];
let currentIndex = 0;
let timerInterval = null;
let timeLeft = 0;
let currentConfig = {
    lang: 'en',
    timer: 60,
    rate: 0.4,
    mode: 'paper'
};

// --- DOM ELEMENTS ---
const dom = {
    landing: document.getElementById('landing-view'),
    test: document.getElementById('test-view'),
    results: document.getElementById('results-view'),
    userSel: document.getElementById('user-select'),
    langSel: document.getElementById('lang-select'),
    weekSel: document.getElementById('week-select'),
    wordInput: document.getElementById('word-input'),
    settingsBox: document.getElementById('settings-box'),
    settingsArrow: document.getElementById('settings-arrow'),
    randomCheck: document.getElementById('randomize-check'),
    timerSel: document.getElementById('timer-select'),
    speedSel: document.getElementById('speed-select'),
    modeSel: document.getElementById('mode-select'),
    card: document.getElementById('card-display'),
    timerDisplay: document.getElementById('timer'),
    progressBar: document.getElementById('progress-bar'),
    resultsList: document.getElementById('results-list'),
    typeInput: document.getElementById('type-input')
};

// --- INITIALIZATION ---
function init() {
    populateWeeks();
    dom.userSel.addEventListener('change', populateWeeks);
    dom.langSel.addEventListener('change', populateWeeks);
    dom.weekSel.addEventListener('change', updateWordInput);
    
    // Setup initial text box
    updateWordInput();

    // Speech Synthesis warmup
    window.speechSynthesis.getVoices();
}

function toggleSettings() {
    dom.settingsBox.classList.toggle('open');
    dom.settingsArrow.innerText = dom.settingsBox.classList.contains('open') ? '▲' : '▼';
}

function populateWeeks() {
    const user = dom.userSel.value;
    const lang = dom.langSel.value;
    const listObj = DATABASE[user][lang];
    
    dom.weekSel.innerHTML = '';
    if (listObj) {
        for (let week in listObj) {
            const opt = document.createElement('option');
            opt.value = week;
            opt.innerText = week;
            dom.weekSel.appendChild(opt);
        }
    }
    updateWordInput();
}

function updateWordInput() {
    const user = dom.userSel.value;
    const lang = dom.langSel.value;
    const week = dom.weekSel.value;
    
    // Database now contains objects {w: word, s: sentence}
    // We map them to just words for the text area
    if (DATABASE[user][lang] && DATABASE[user][lang][week]) {
        const wordsOnly = DATABASE[user][lang][week].map(item => item.w);
        dom.wordInput.value = wordsOnly.join(', ');
    } else {
        dom.wordInput.value = '';
    }
}

// --- TEST LOGIC ---

function startTest() {
    // 1. Config
    const rawInput = dom.wordInput.value.split(',').map(w => w.trim()).filter(w => w.length > 0);
    if (rawInput.length === 0) return alert("Please enter some words!");

    currentConfig.lang = dom.langSel.value;
    
    // Handle Unlimited Timer
    const timerVal = dom.timerSel.value;
    currentConfig.timer = (timerVal === 'unlimited') ? 'unlimited' : parseInt(timerVal);
    
    currentConfig.rate = parseFloat(dom.speedSel.value);
    currentConfig.mode = dom.modeSel.value;
    currentConfig.random = dom.randomCheck.checked;

    // 2. Queue & Sentence Lookup Setup
    // We need to match the strings in textarea back to the objects in DATABASE to get sentences.
    // If the user typed a new word, it won't have a sentence.
    
    const user = dom.userSel.value;
    const lang = dom.langSel.value;
    const week = dom.weekSel.value;
    
    // Create a lookup map from the CURRENT list in database
    const dbList = (DATABASE[user][lang] && DATABASE[user][lang][week]) ? DATABASE[user][lang][week] : [];
    
    queueDetails = {};
    dbList.forEach(item => {
        queueDetails[item.w] = item.s;
    });

    currentQueue = [...rawInput];
    if (currentConfig.random) {
        currentQueue.sort(() => Math.random() - 0.5);
    }
    completedWords = [];
    currentIndex = 0;

    // 3. UI Setup
    dom.landing.style.display = 'none';
    dom.results.style.display = 'none';
    dom.test.style.display = 'block';
    
    if (currentConfig.mode === 'typed') {
        dom.typeInput.style.display = 'block';
        dom.typeInput.focus();
    } else {
        dom.typeInput.style.display = 'none';
    }

    loadWord();
}

function loadWord() {
    if (currentIndex >= currentQueue.length) {
        endTest();
        return;
    }

    const rawWord = currentQueue[currentIndex];
    const parsed = parseWord(rawWord, currentConfig.lang);

    // Reset UI
    dom.card.className = 'word-card swipe-in blurred';
    dom.card.innerText = parsed.display;
    dom.typeInput.value = '';
    dom.typeInput.className = '';
    updateProgress();

    // Speak
    speak(parsed.spoken);

    // Timer
    resetTimer();
}

function resetTimer() {
    clearInterval(timerInterval);
    
    if (currentConfig.timer === 'unlimited') {
        dom.timerDisplay.innerText = '∞';
        return; 
    }

    timeLeft = currentConfig.timer;
    dom.timerDisplay.innerText = timeLeft;
    
    timerInterval = setInterval(() => {
        timeLeft--;
        dom.timerDisplay.innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            nextWord(); 
        }
    }, 1000);
}

function parseWord(raw, lang) {
    if (lang === 'zh' && raw.includes(" - ")) {
        const parts = raw.split(" - ");
        const prefix = parts[0];
        const rest = parts[1];
        const wordOnly = rest.split('(')[0].trim();
        const spoken = prefix + "... " + wordOnly; 
        const display = rest;
        return { raw, display, spoken, answer: wordOnly };
    }
    return { raw, display: raw, spoken: raw, answer: raw };
}

function speak(text) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = currentConfig.rate;
    
    if (currentConfig.lang === 'zh') {
        utterance.lang = 'zh-CN';
    } else {
        utterance.lang = 'en-GB';
    }
    
    window.speechSynthesis.speak(utterance);
}

// --- BUTTON ACTIONS ---

function repeatWord() {
    const raw = currentQueue[currentIndex];
    const parsed = parseWord(raw, currentConfig.lang);
    speak(parsed.spoken);
}

function readSentence() {
    const raw = currentQueue[currentIndex];
    // Lookup sentence
    const sentence = queueDetails[raw];
    
    if (sentence) {
        speak(sentence);
    } else {
        // Fallback for custom words
        speak(currentConfig.lang === 'zh' ? "没有例句" : "No sentence available");
    }
}

function revealWord() {
    dom.card.classList.remove('blurred');
    dom.card.classList.add('revealed');
    recordResult(false);
}

function nextWord() {
    const raw = currentQueue[currentIndex];
    const parsed = parseWord(raw, currentConfig.lang);

    if (currentConfig.mode === 'typed') {
        const inputVal = dom.typeInput.value.trim();
        const correctVal = parsed.answer.trim();
        const isRevealed = dom.card.classList.contains('revealed');
        
        if (!isRevealed) {
            if (inputVal.toLowerCase() === correctVal.toLowerCase()) {
                recordResult(true);
            } else {
                recordResult(false);
                dom.typeInput.className = 'wrong';
            }
        }
    } else {
        const isRevealed = dom.card.classList.contains('revealed');
        if (!isRevealed) {
            recordResult(true);
        }
    }

    dom.card.classList.remove('swipe-in');
    dom.card.classList.add('swipe-out');

    setTimeout(() => {
        currentIndex++;
        loadWord();
    }, 400);
}

function recordResult(isCorrect) {
    if (completedWords.length === currentIndex) {
        completedWords.push({
            word: currentQueue[currentIndex],
            correct: isCorrect
        });
    } else {
        completedWords[currentIndex].correct = isCorrect;
    }
}

function endTestEarly() {
    clearInterval(timerInterval);
    endTest();
}

function updateProgress() {
    const pct = (currentIndex / currentQueue.length) * 100;
    dom.progressBar.style.width = pct + '%';
}

// --- RESULTS ---

function endTest() {
    dom.test.style.display = 'none';
    dom.results.style.display = 'block';
    renderResults();
}

function renderResults() {
    dom.resultsList.innerHTML = '';
    
    currentQueue.forEach((word, idx) => {
        let status = false; 
        if (idx < completedWords.length) {
            status = completedWords[idx].correct;
        }

        const parsed = parseWord(word, currentConfig.lang);

        const div = document.createElement('div');
        div.className = 'result-item';
        if (!status) div.classList.add('wrong-mark');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = word;
        checkbox.checked = !status; 

        const text = document.createElement('span');
        text.innerText = parsed.display;

        div.appendChild(checkbox);
        div.appendChild(text);
        dom.resultsList.appendChild(div);
    });
}

function retestWrong() {
    const checks = dom.resultsList.querySelectorAll('input[type="checkbox"]:checked');
    const wrongs = Array.from(checks).map(c => c.value);
    
    if (wrongs.length === 0) {
        alert("Great job! No words selected to retest.");
        return;
    }

    dom.wordInput.value = wrongs.join(', ');
    dom.results.style.display = 'none';
    dom.landing.style.display = 'block'; 
}

function resetApp() {
    dom.results.style.display = 'none';
    dom.landing.style.display = 'block'; 
}

init();
