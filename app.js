// --- STATE ---
let currentQueue = [];
let completedWords = []; // Array of objects {word: str, correct: bool}
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
    
    if (DATABASE[user][lang] && DATABASE[user][lang][week]) {
        dom.wordInput.value = DATABASE[user][lang][week].join(', ');
    } else {
        dom.wordInput.value = '';
    }
}

// --- TEST LOGIC ---

function startTest() {
    // 1. Config
    const rawWords = dom.wordInput.value.split(',').map(w => w.trim()).filter(w => w.length > 0);
    if (rawWords.length === 0) return alert("Please enter some words!");

    currentConfig.lang = dom.langSel.value;
    currentConfig.timer = parseInt(dom.timerSel.value);
    currentConfig.rate = parseFloat(dom.speedSel.value);
    currentConfig.mode = dom.modeSel.value;
    currentConfig.random = dom.randomCheck.checked;

    // 2. Queue Setup
    currentQueue = [...rawWords];
    if (currentConfig.random) {
        currentQueue.sort(() => Math.random() - 0.5);
    }
    completedWords = [];
    currentIndex = 0;

    // 3. UI Setup
    dom.landing.style.display = 'none';
    dom.results.style.display = 'none';
    dom.test.style.display = 'block';
    
    // Mode Specifics
    if (currentConfig.mode === 'typed') {
        dom.typeInput.style.display = 'block';
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
    timeLeft = currentConfig.timer;
    dom.timerDisplay.innerText = timeLeft;
    
    timerInterval = setInterval(() => {
        timeLeft--;
        dom.timerDisplay.innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            nextWord(); // Auto move next
        }
    }, 1000);
}

function parseWord(raw, lang) {
    // Handle "Prefix - Word (Pinyin)" for Chinese
    if (lang === 'zh' && raw.includes(" - ")) {
        // Ex: 汉语拼音 - 了解 (liǎo jiě)
        const parts = raw.split(" - ");
        const prefix = parts[0]; // 汉语拼音
        const rest = parts[1];   // 了解 (liǎo jiě)
        
        // Clean word for speech (remove pinyin parens)
        // Speech: "汉语拼音... [pause] ... 了解"
        const wordOnly = rest.split('(')[0].trim();
        const spoken = prefix + "... " + wordOnly; 
        
        // Display: "了解 (liǎo jiě)" (keep pinyin)
        const display = rest;

        return { raw, display, spoken, answer: wordOnly };
    }
    
    // Standard
    return { raw, display: raw, spoken: raw, answer: raw };
}

function speak(text) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = currentConfig.rate;
    
    // Lang select
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

function revealWord() {
    // Mark as wrong
    dom.card.classList.remove('blurred');
    dom.card.classList.add('revealed');
    // We track it as wrong immediately if revealed
    recordResult(false);
}

function nextWord() {
    const raw = currentQueue[currentIndex];
    const parsed = parseWord(raw, currentConfig.lang);

    // Validation for Typed Mode
    if (currentConfig.mode === 'typed') {
        const inputVal = dom.typeInput.value.trim();
        const correctVal = parsed.answer.trim();
        
        // Check if already revealed (assumed wrong), or verify input
        const isRevealed = dom.card.classList.contains('revealed');
        
        if (!isRevealed) {
            // Simple case insensitive check
            if (inputVal.toLowerCase() === correctVal.toLowerCase()) {
                recordResult(true);
            } else {
                recordResult(false);
                // UX: Show it was wrong briefly?
                dom.typeInput.className = 'wrong';
            }
        }
    } else {
        // Paper mode
        const isRevealed = dom.card.classList.contains('revealed');
        if (isRevealed) {
            // If they revealed, it's definitely wrong.
        } else {
            recordResult(true);
        }
    }

    // Animation
    dom.card.classList.remove('swipe-in');
    dom.card.classList.add('swipe-out');

    setTimeout(() => {
        currentIndex++;
        loadWord();
    }, 400); // Wait for animation
}

function recordResult(isCorrect) {
    // Prevent double recording for same index
    if (completedWords.length === currentIndex) {
        completedWords.push({
            word: currentQueue[currentIndex],
            correct: isCorrect
        });
    } else {
        // Update existing if we are just clicking Reveal then Next
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
    
    // Fill in any skipped words if ended early
    currentQueue.forEach((word, idx) => {
        let status = false; // default wrong if skipped
        if (idx < completedWords.length) {
            status = completedWords[idx].correct;
        }

        const parsed = parseWord(word, currentConfig.lang);

        const div = document.createElement('div');
        div.className = 'result-item';
        if (!status) div.classList.add('wrong-mark');

        // Checkbox logic: Checked = Wrong (User selects what to retest)
        // If the app detected it wrong, pre-check it.
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

    // Setup retest
    dom.wordInput.value = wrongs.join(', ');
    dom.results.style.display = 'none';
    dom.landing.style.display = 'block'; 
}

function resetApp() {
    dom.results.style.display = 'none';
    dom.landing.style.display = 'block'; 
}

// Run init
init();
