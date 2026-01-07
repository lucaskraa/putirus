// XP System
let xp = parseInt(localStorage.getItem('xp')) || 0;
let level = parseInt(localStorage.getItem('level')) || 1;

// Hearts System
let hearts = parseInt(localStorage.getItem('hearts')) || 5;
const maxHearts = 5;
let lastHeartRefillTime = parseInt(localStorage.getItem('lastHeartRefillTime')) || Date.now();

// Streak System
let streak = parseInt(localStorage.getItem('streak')) || 0;
let lastLoginDate = localStorage.getItem('lastLoginDate') || new Date().toDateString();

// Daily Goal
const dailyGoalXP = 50;
let dailyXP = parseInt(localStorage.getItem('dailyXP')) || 0;
let dailyGoalAchieved = localStorage.getItem('dailyGoalDate') === new Date().toDateString();

document.addEventListener('DOMContentLoaded', () => {
    checkStreak();
    refillHearts(); // Check and refill on load
    updateProgress();
    updateHearts();
    updateStreak();
    updateDailyGoal();
    setInterval(refillHearts, 60000); // Check every minute

    // Navegação com hash para parecer páginas diferentes
    const initialSection = location.hash.slice(1) || 'home';
    showSection(initialSection);

    window.addEventListener('popstate', () => {
        const section = location.hash.slice(1) || 'home';
        showSection(section);
    });
});

function checkStreak() {
    const today = new Date().toDateString();
    if (lastLoginDate !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        if (lastLoginDate === yesterday.toDateString()) {
            streak++;
        } else {
            streak = 1;
        }
        lastLoginDate = today;
        localStorage.setItem('streak', streak);
        localStorage.setItem('lastLoginDate', today);
        resetDailyGoal();
    }
}

function updateStreak() {
    const streakElement = document.getElementById('streak');
    if (streakElement) {
        streakElement.innerText = `Streak: ${streak} dias`;
    }
}

function resetDailyGoal() {
    dailyXP = 0;
    dailyGoalAchieved = false;
    localStorage.setItem('dailyXP', dailyXP);
    localStorage.setItem('dailyGoalDate', new Date().toDateString());
    updateDailyGoal();
}

function updateDailyGoal() {
    const dailyGoalDiv = document.getElementById('daily-goal');
    if (dailyGoalDiv) {
        dailyGoalDiv.innerText = `Meta diária: ${dailyXP}/${dailyGoalXP} XP`;
        if (dailyGoalAchieved) {
            dailyGoalDiv.innerText += ' - Alcançada! +20 XP Bônus';
        }
    }
}

function updateProgress() {
    const xpElement = document.getElementById('xp');
    const levelElement = document.getElementById('level');
    const progressFill = document.getElementById('progress-fill');
    if (xpElement) xpElement.innerText = xp;
    if (levelElement) levelElement.innerText = level;
    if (progressFill) {
        const progress = (xp % (level * 100)) / (level * 100) * 100;
        progressFill.style.width = `${progress}%`;
    }
    localStorage.setItem('xp', xp);
    localStorage.setItem('level', level);
}

function addXP(amount) {
    xp += amount;
    dailyXP += amount;
    if (dailyXP >= dailyGoalXP && !dailyGoalAchieved) {
        dailyGoalAchieved = true;
        addXP(20); // Bonus
        alert('Meta diária alcançada! +20 XP Bônus');
    }
    localStorage.setItem('dailyXP', dailyXP);
    if (xp >= level * 100) {
        level++;
        alert(`Parabéns! Você subiu para o nível ${level}!`);
    }
    updateProgress();
    updateDailyGoal();
    updateLeaderboard();
}

function updateHearts() {
    const heartsElement = document.getElementById('hearts');
    if (heartsElement) {
        heartsElement.innerText = '❤️'.repeat(hearts) + '♡'.repeat(maxHearts - hearts);
    }
    localStorage.setItem('hearts', hearts);
}

function loseHeart() {
    if (hearts > 0) {
        hearts--;
        updateHearts();
        lastHeartRefillTime = Date.now();
        localStorage.setItem('lastHeartRefillTime', lastHeartRefillTime);
        return true;
    } else {
        alert('Sem corações restantes! Espere para recarregar ou pratique mais tarde.');
        return false;
    }
}

function refillHearts() {
    const now = Date.now();
    const timeDiff = Math.floor((now - lastHeartRefillTime) / (1000 * 60 * 30)); // 30 min per heart
    if (timeDiff > 0 && hearts < maxHearts) {
        hearts = Math.min(hearts + timeDiff, maxHearts);
        lastHeartRefillTime = now;
        localStorage.setItem('lastHeartRefillTime', lastHeartRefillTime);
        updateHearts();
    }
}

// Navigation with hash for page-like feel
function showSection(sectionId) {
    document.querySelectorAll('main section').forEach(section => {
        section.classList.add('hidden');
        section.classList.remove('active');
    });
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.remove('hidden');
        targetSection.classList.add('active');
    }
    history.pushState(null, '', '#' + sectionId);
    // Init section-specific content
    if (sectionId === 'vocabulary') loadVocabularyCards();
    if (sectionId === 'grammar') grammarQuiz();
    if (sectionId === 'pronunciation') loadPronunciationCards();
    if (sectionId === 'conversation') conversationExercise();
    if (sectionId === 'lessons') { startQuiz(); startGame(); startMatchingGame(); }
}

// Expanded Vocabulary - with corrected audio URLs
const vocabulary = [
    { russian: 'я', portuguese: 'eu', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D1%8F&tl=ru' },
    { russian: 'ты', portuguese: 'tu', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D1%82%D1%8B&tl=ru' },
    { russian: 'он', portuguese: 'ele', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%BE%D0%BD&tl=ru' },
    { russian: 'она', portuguese: 'ela', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%BE%D0%BD%D0%B0&tl=ru' },
    { russian: 'оно', portuguese: 'isto', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%BE%D0%BD%D0%BE&tl=ru' },
    { russian: 'мы', portuguese: 'nós', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%BC%D1%8B&tl=ru' },
    { russian: 'вы', portuguese: 'vós', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%B2%D1%8B&tl=ru' },
    { russian: 'они', portuguese: 'eles', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%BE%D0%BD%D0%B8&tl=ru' },
    { russian: 'что', portuguese: 'O quê', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D1%87%D1%82%D0%BE&tl=ru' },
    { russian: 'кто', portuguese: 'Quem', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%BA%D1%82%D0%BE&tl=ru' },
    { russian: 'где', portuguese: 'Onde', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%B3%D0%B4%D0%B5&tl=ru' },
    { russian: 'зачем', portuguese: 'Porquê', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%B7%D0%B0%D1%87%D0%B5%D0%BC&tl=ru' },
    { russian: 'как', portuguese: 'Como', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%BA%D0%B0%D0%BA&tl=ru' },
    { russian: 'какой', portuguese: 'Qual', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%BA%D0%B0%D0%BA%D0%BE%D0%B9&tl=ru' },
    { russian: 'когда', portuguese: 'Quando', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%BA%D0%BE%D0%B3%D0%B4%D0%B0&tl=ru' },
    { russian: 'тогда', portuguese: 'então', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D1%82%D0%BE%D0%B3%D0%B4%D0%B0&tl=ru' },
    { russian: 'если', portuguese: 'se', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%B5%D1%81%D0%BB%D0%B8&tl=ru' },
    { russian: 'на самом деле', portuguese: 'mesmo', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%BD%D0%B0%20%D1%81%D0%B0%D0%BC%D0%BE%D0%BC%20%D0%B4%D0%B5%D0%BB%D0%B5&tl=ru' },
    { russian: 'но', portuguese: 'mas', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%BD%D0%BE&tl=ru' },
    { russian: 'потому что', portuguese: 'porque', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%BF%D0%BE%D1%82%D0%BE%D0%BC%D1%83%20%D1%87%D1%82%D0%BE&tl=ru' },
    { russian: 'не', portuguese: 'não', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%BD%D0%B5&tl=ru' },
    { russian: 'это', portuguese: 'isto', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D1%8D%D1%82%D0%BE&tl=ru' },
    { russian: 'Мне нужно это', portuguese: 'Eu preciso disto', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%9C%D0%BD%D0%B5%20%D0%BD%D1%83%D0%B6%D0%BD%D0%BE%20%D1%8D%D1%82%D0%BE&tl=ru' },
    { russian: 'Сколько это стоит?', portuguese: 'Quanto é ...?', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%A1%D0%BA%D0%BE%D0%BB%D1%8C%D0%BA%D0%BE%20%D1%8D%D1%82%D0%BE%20%D1%81%D1%82%D0%BE%D0%B8%D1%82%3F&tl=ru' },
    { russian: 'что', portuguese: 'aquilo', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D1%87%D1%82%D0%BE&tl=ru' },
    { russian: 'всё', portuguese: 'tudo', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%B2%D1%81%D1%91&tl=ru' },
    { russian: 'или', portuguese: 'ou', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%B8%D0%BB%D0%B8&tl=ru' },
    { russian: 'и', portuguese: 'e', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%B8&tl=ru' },
    { russian: 'знать', portuguese: 'saber', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%B7%D0%BD%D0%B0%D1%82%D1%8C&tl=ru' },
    { russian: 'Я знаю', portuguese: 'Eu sei', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%AF%20%D0%B7%D0%BD%D0%B0%D1%8E&tl=ru' },
    { russian: 'Я не знаю', portuguese: 'Eu não sei', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%AF%20%D0%BD%D0%B5%20%D0%B7%D0%BD%D0%B0%D1%8E&tl=ru' },
    { russian: 'думать', portuguese: 'pensar', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%B4%D1%83%D0%BC%D0%B0%D1%82%D1%8C&tl=ru' },
    { russian: 'приходить', portuguese: 'vir', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%BF%D1%80%D0%B8%D1%85%D0%BE%D0%B4%D0%B8%D1%82%D1%8C&tl=ru' },
    { russian: 'класть', portuguese: 'colocar', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%BA%D0%BB%D0%B0%D1%81%D1%82%D1%8C&tl=ru' },
    { russian: 'брать', portuguese: 'tirar', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%B1%D1%80%D0%B0%D1%82%D1%8C&tl=ru' },
    { russian: 'находить', portuguese: 'encontrar', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%BD%D0%B0%D1%85%D0%BE%D0%B4%D0%B8%D1%82%D1%8C&tl=ru' },
    { russian: 'слушать', portuguese: 'ouvir', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D1%81%D0%BB%D1%83%D1%88%D0%B0%D1%82%D1%8C&tl=ru' },
    { russian: 'работать', portuguese: 'trabalhar', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%B0%D1%82%D1%8C&tl=ru' },
    { russian: 'говорить', portuguese: 'falar', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%B3%D0%BE%D0%B2%D0%BE%D1%80%D0%B8%D1%82%D1%8C&tl=ru' },
    { russian: 'давать', portuguese: 'dar', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%B4%D0%B0%D0%B2%D0%B0%D1%82%D1%8C&tl=ru' },
    { russian: 'нравиться', portuguese: 'gostar', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%BD%D1%80%D0%B0%D0%B2%D0%B8%D1%82%D1%8C%D1%81%D1%8F&tl=ru' },
    { russian: 'помогать', portuguese: 'ajudar', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%BF%D0%BE%D0%BC%D0%BE%D0%B3%D0%B0%D1%82%D1%8C&tl=ru' },
    { russian: 'любить', portuguese: 'amar', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%BB%D1%8E%D0%B1%D0%B8%D1%82%D1%8C&tl=ru' },
    { russian: 'звонить', portuguese: 'telefonar', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%B7%D0%B2%D0%BE%D0%BD%D0%B8%D1%82%D1%8C&tl=ru' },
    { russian: 'ждать', portuguese: 'esperar', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%B6%D0%B4%D0%B0%D1%82%D1%8C&tl=ru' },
    { russian: 'Ты мне нравишься', portuguese: 'Eu gosto de ti', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%A2%D1%8B%20%D0%BC%D0%BD%D0%B5%20%D0%BD%D1%80%D0%B0%D0%B2%D0%B8%D1%88%D1%8C%D1%81%D1%8F&tl=ru' },
    { russian: 'Мне это не нравится', portuguese: 'Eu não gosto disto', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%9C%D0%BD%D0%B5%20%D1%8D%D1%82%D0%BE%20%D0%BD%D0%B5%20%D0%BD%D1%80%D0%B0%D0%B2%D0%B8%D1%82%D1%81%D1%8F&tl=ru' },
    { russian: 'Ты любишь меня?', portuguese: 'Gostas de mim?', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%A2%D1%8B%20%D0%BB%D1%8E%D0%B1%D0%B8%D1%88%D1%8C%20%D0%BC%D0%B5%D0%BD%D1%8F%3F&tl=ru' },
    { russian: 'Я люблю тебя', portuguese: 'Eu amo-te', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%AF%20%D0%BB%D1%8E%D0%B1%D0%BB%D1%8E%20%D1%82%D0%B5%D0%B1%D1%8F&tl=ru' },
    { russian: 'ноль', portuguese: '0', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%BD%D0%BE%D0%BB%D1%8C&tl=ru' },
    { russian: 'один', portuguese: '1', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%BE%D0%B4%D0%B8%D0%BD&tl=ru' },
    { russian: 'два', portuguese: '2', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%B4%D0%B2%D0%B0&tl=ru' },
    { russian: 'три', portuguese: '3', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D1%82%D1%80%D0%B8&tl=ru' },
    { russian: 'четыре', portuguese: '4', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D1%87%D0%B5%D1%82%D1%8B%D1%80%D0%B5&tl=ru' },
    { russian: 'пять', portuguese: '5', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%BF%D1%8F%D1%82%D1%8C&tl=ru' },
    { russian: 'шесть', portuguese: '6', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D1%88%D0%B5%D1%81%D1%82%D1%8C&tl=ru' },
    { russian: 'семь', portuguese: '7', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D1%81%D0%B5%D0%BC%D1%8C&tl=ru' },
    { russian: 'восемь', portuguese: '8', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%B2%D0%BE%D1%81%D0%B5%D0%BC%D1%8C&tl=ru' },
    { russian: 'девять', portuguese: '9', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%B4%D0%B5%D0%B2%D1%8F%D1%82%D1%8C&tl=ru' },
    { russian: 'десять', portuguese: '10', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%B4%D0%B5%D1%81%D1%8F%D1%82%D1%8C&tl=ru' },
    { russian: 'одиннадцать', portuguese: '11', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%BE%D0%B4%D0%B8%D0%BD%D0%BD%D0%B0%D0%B4%D1%86%D0%B0%D1%82%D1%8C&tl=ru' },
    { russian: 'двенадцать', portuguese: '12', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%B4%D0%B2%D0%B5%D0%BD%D0%B0%D0%B4%D1%86%D0%B0%D1%82%D1%8C&tl=ru' },
    { russian: 'тринадцать', portuguese: '13', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D1%82%D1%80%D0%B8%D0%BD%D0%B0%D0%B4%D1%86%D0%B0%D1%82%D1%8C&tl=ru' },
    { russian: 'четырнадцать', portuguese: '14', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D1%87%D0%B5%D1%82%D1%8B%D1%80%D0%BD%D0%B0%D0%B4%D1%86%D0%B0%D1%82%D1%8C&tl=ru' },
    { russian: 'пятнадцать', portuguese: '15', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%BF%D1%8F%D1%82%D0%BD%D0%B0%D0%B4%D1%86%D0%B0%D1%82%D1%8C&tl=ru' },
    { russian: 'шестнадцать', portuguese: '16', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D1%88%D0%B5%D1%81%D1%82%D0%BD%D0%B0%D0%B4%D1%86%D0%B0%D1%82%D1%8C&tl=ru' },
    { russian: 'семнадцать', portuguese: '17', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D1%81%D0%B5%D0%BC%D0%BD%D0%B0%D0%B4%D1%86%D0%B0%D1%82%D1%8C&tl=ru' },
    { russian: 'восемнадцать', portuguese: '18', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%B2%D0%BE%D1%81%D0%B5%D0%BC%D0%BD%D0%B0%D0%B4%D1%86%D0%B0%D1%82%D1%8C&tl=ru' },
    { russian: 'девятнадцать', portuguese: '19', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%B4%D0%B5%D0%B2%D1%8F%D1%82%D0%BD%D0%B0%D0%B4%D1%86%D0%B0%D1%82%D1%8C&tl=ru' },
    { russian: 'двадцать', portuguese: '20', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%B4%D0%B2%D0%B0%D0%B4%D1%86%D0%B0%D1%82%D1%8C&tl=ru' },
    { russian: 'новый', portuguese: 'novo', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%BD%D0%BE%D0%B2%D1%8B%D0%B9&tl=ru' },
    { russian: 'старый', portuguese: 'velho', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D1%81%D1%82%D0%B0%D1%80%D1%8B%D0%B9&tl=ru' },
    { russian: 'немногие', portuguese: 'poucos', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%BD%D0%B5%D0%BC%D0%BD%D0%BE%D0%B3%D0%B8%D0%B5&tl=ru' },
    { russian: 'многие', portuguese: 'muitos', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%BC%D0%BD%D0%BE%D0%B3%D0%B8%D0%B5&tl=ru' },
    { russian: 'сколько?', portuguese: 'Quanto é?', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D1%81%D0%BA%D0%BE%D0%BB%D1%8C%D0%BA%D0%BE%3F&tl=ru' },
    { russian: 'сколько?', portuguese: 'Quantos?', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D1%81%D0%BA%D0%BE%D0%BB%D1%8C%D0%BA%D0%BE%3F&tl=ru' },
    { russian: 'неправильный', portuguese: 'errado', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%BD%D0%B5%D0%BF%D1%80%D0%B0%D0%B2%D0%B8%D0%BB%D1%8C%D0%BD%D1%8B%D0%B9&tl=ru' },
    { russian: 'правильный', portuguese: 'correto', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%BF%D1%80%D0%B0%D0%B2%D0%B8%D0%BB%D1%8C%D0%BD%D1%8B%D0%B9&tl=ru' },
    { russian: 'плохой', portuguese: 'mau', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%BF%D0%BB%D0%BE%D1%85%D0%BE%D0%B9&tl=ru' },
    { russian: 'хороший', portuguese: 'bom', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D1%85%D0%BE%D1%80%D0%BE%D1%88%D0%B8%D0%B9&tl=ru' },
    { russian: 'счастливый', portuguese: 'feliz', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D1%81%D1%87%D0%B0%D1%81%D1%82%D0%BB%D0%B8%D0%B2%D1%8B%D0%B9&tl=ru' },
    { russian: 'короткий', portuguese: 'curto', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%BA%D0%BE%D1%80%D0%BE%D1%82%D0%BA%D0%B8%D0%B9&tl=ru' },
    { russian: 'длинный', portuguese: 'comprido', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%B4%D0%BB%D0%B8%D0%BD%D0%BD%D1%8B%D0%B9&tl=ru' },
    { russian: 'маленький', portuguese: 'pequeno', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%BC%D0%B0%D0%BB%D0%B5%D0%BD%D1%8C%D0%BA%D0%B8%D0%B9&tl=ru' },
    { russian: 'большой', portuguese: 'grande', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%B1%D0%BE%D0%BB%D1%8C%D1%88%D0%BE%D0%B9&tl=ru' },
    { russian: 'там', portuguese: 'ali', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D1%82%D0%B0%D0%BC&tl=ru' },
    { russian: 'здесь', portuguese: 'aqui', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%B7%D0%B4%D0%B5%D1%81%D1%8C&tl=ru' },
    { russian: 'правый', portuguese: 'direita', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%BF%D1%80%D0%B0%D0%B2%D1%8B%D0%B9&tl=ru' },
    { russian: 'левый', portuguese: 'esquerda', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%BB%D0%B5%D0%B2%D1%8B%D0%B9&tl=ru' },
    { russian: 'красивый', portuguese: 'belo', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%BA%D1%80%D0%B0%D1%81%D0%B8%D0%B2%D1%8B%D0%B9&tl=ru' },
    { russian: 'молодой', portuguese: 'jovem', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%BC%D0%BE%D0%BB%D0%BE%D0%B4%D0%BE%D0%B9&tl=ru' },
    { russian: 'старый', portuguese: 'velho', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D1%81%D1%82%D0%B0%D1%80%D1%8B%D0%B9&tl=ru' },
    { russian: 'здравствуйте', portuguese: 'Olá', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%B7%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5&tl=ru' },
    { russian: 'увидимся позже', portuguese: 'Até logo', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D1%83%D0%B2%D0%B8%D0%B4%D0%B8%D0%BC%D1%81%D1%8F%20%D0%BF%D0%BE%D0%B7%D0%B6%D0%B5&tl=ru' },
    { russian: 'окей', portuguese: 'Ok', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%BE%D0%BA%D0%B5%D0%B9&tl=ru' },
    { russian: 'береги себя', portuguese: 'Tem cuidado', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%B1%D0%B5%D1%80%D0%B5%D0%B3%D0%B8%20%D1%81%D0%B5%D0%B1%D1%8F&tl=ru' },
    { russian: 'не переживай', portuguese: 'Não te preocupes', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%BD%D0%B5%20%D0%BF%D0%B5%D1%80%D0%B5%D0%B6%D0%B8%D0%B2%D0%B0%D0%B9&tl=ru' },
    { russian: 'конечно', portuguese: 'Claro', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%BA%D0%BE%D0%BD%D0%B5%D1%87%D0%BD%D0%BE&tl=ru' },
    { russian: 'добрый день', portuguese: 'Bom dia', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%B4%D0%BE%D0%B1%D1%80%D1%8B%D0%B9%20%D0%B4%D0%B5%D0%BD%D1%8C&tl=ru' },
    { russian: 'привет', portuguese: 'Olá', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%BF%D1%80%D0%B8%D0%B2%D0%B5%D1%82&tl=ru' },
    // Additional from original sample to blend
    { russian: 'Привет', portuguese: 'Olá', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%9F%D1%80%D0%B8%D0%B2%D0%B5%D1%82&tl=ru' },
    { russian: 'Пока', portuguese: 'Tchau', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%9F%D0%BE%D0%BA%D0%B0&tl=ru' },
    { russian: 'Спасибо', portuguese: 'Obrigado', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%A1%D0%BF%D0%B0%D1%81%D0%B8%D0%B1%D0%BE&tl=ru' },
    { russian: 'Мама', portuguese: 'Mãe', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%9C%D0%B0%D0%BC%D0%B0&tl=ru' },
    { russian: 'Папа', portuguese: 'Pai', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%9F%D0%B0%D0%BF%D0%B0&tl=ru' },
    { russian: 'Брат', portuguese: 'Irmão', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%91%D1%80%D0%B0%D1%82&tl=ru' },
    { russian: 'Сестра', portuguese: 'Irmã', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%A1%D0%B5%D1%81%D1%82%D1%80%D0%B0&tl=ru' },
    { russian: 'Хлеб', portuguese: 'Pão', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%A5%D0%BB%D0%B5%D0%B1&tl=ru' },
    { russian: 'Вода', portuguese: 'Água', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%92%D0%BE%D0%B4%D0%B0&tl=ru' },
    { russian: 'Яблоко', portuguese: 'Maçã', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%AF%D0%B1%D0%BB%D0%BE%D0%BA%D0%BE&tl=ru' },
    { russian: 'Кот', portuguese: 'Gato', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%9A%D0%BE%D1%82&tl=ru' },
    { russian: 'Собака', portuguese: 'Cão', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%A1%D0%BE%D0%B1%D0%B0%D0%BA%D0%B0&tl=ru' },
    { russian: 'Красный', portuguese: 'Vermelho', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%9A%D1%80%D0%B0%D1%81%D0%BD%D1%8B%D0%B9&tl=ru' },
    { russian: 'Синий', portuguese: 'Azul', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%A1%D0%B8%D0%BD%D0%B8%D0%B9&tl=ru' },
    { russian: 'Зелёный', portuguese: 'Verde', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%97%D0%B5%D0%BB%D1%91%D0%BD%D1%8B%D0%B9&tl=ru' },
    { russian: 'Один', portuguese: 'Um', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%9E%D0%B4%D0%B8%D0%BD&tl=ru' },
    { russian: 'Два', portuguese: 'Dois', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%94%D0%B2%D0%B0&tl=ru' },
    { russian: 'Три', portuguese: 'Três', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%A2%D1%80%D0%B8&tl=ru' },
    { russian: 'Время', portuguese: 'Tempo', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%92%D1%80%D0%B5%D0%BC%D1%8F&tl=ru' },
    { russian: 'Сегодня', portuguese: 'Hoje', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%A1%D0%B5%D0%B3%D0%BE%D0%B4%D0%BD%D1%8F&tl=ru' },
    { russian: 'Завтра', portuguese: 'Amanhã', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%97%D0%B0%D0%B2%D1%82%D1%80%D0%B0&tl=ru' },
    { russian: 'Аэропорт', portuguese: 'Aeroporto', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%90%D1%8D%D1%80%D0%BE%D0%BF%D0%BE%D1%80%D1%82&tl=ru' },
    { russian: 'Поезд', portuguese: 'Trem', audio: 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=%D0%9F%D0%BE%D0%B5%D0%B7%D0%B4&tl=ru' },
];

function loadVocabularyCards() {
    const container = document.querySelector('#vocabulary .card-container');
    if (container) {
        container.innerHTML = '';
        vocabulary.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('flashcard');
            card.innerHTML = `
                <div class="flashcard-inner">
                    <div class="flashcard-front">${item.russian}</div>
                    <div class="flashcard-back">${item.portuguese}</div>
                </div>
                <button class="audio-button" onclick="playAudio('${item.audio}')">Ouvir</button>
            `;
            card.addEventListener('click', () => card.classList.toggle('flipped'));
            container.appendChild(card);
        });
    }
}

function playAudio(url) {
    const audio = new Audio(url);
    audio.play().catch(error => console.error('Audio play error:', error));
}

// Expanded Grammar Quiz - 30 questions based on beginner rules
const grammarQuestions = [
    { question: 'Qual é o caso usado para sujeitos?', options: ['Nominativo', 'Genitivo', 'Dativo', 'Acusativo'], correct: 0 },
    { question: 'Como se diz "Do gato" em russo?', options: ['Кот', 'Кота', 'Коту', 'Котом'], correct: 1 },
    { question: 'Qual preposição significa "em"?', options: ['В', 'На', 'С', 'К'], correct: 0 },
    { question: 'Forma passada de "falar" para masculino?', options: ['Говорил', 'Говорила', 'Говорило', 'Говорили'], correct: 0 },
    { question: 'Adjetivo para "casa vermelha"?', options: ['Красный дом', 'Красная дом', 'Красное дом', 'Красные дом'], correct: 0 },
    { question: 'Pronome para "Nós"?', options: ['Я', 'Ты', 'Мы', 'Вы'], correct: 2 },
    { question: 'Qual o gênero de "кот"?', options: ['Masculino', 'Feminino', 'Neutro'], correct: 0 },
    { question: 'Pronome possessivo para "meu" masculino?', options: ['Мой', 'Моя', 'Моё', 'Мои'], correct: 0 },
    { question: 'Conjugação de "говорить" para "eu"?', options: ['Говорю', 'Говоришь', 'Говорит', 'Говорим'], correct: 0 },
    { question: 'Caso para objeto direto?', options: ['Nominativo', 'Genitivo', 'Dativo', 'Acusativo'], correct: 3 },
    { question: 'Preposição para "com"?', options: ['В', 'На', 'С', 'К'], correct: 2 },
    { question: 'Forma negativa de "Я говорю"?', options: ['Я говорю не', 'Я не говорю', 'Не я говорю', 'Говорю не'], correct: 1 },
    { question: 'Conjugação de "смотреть" para "tu"?', options: ['Смотрю', 'Смотришь', 'Смотрит', 'Смотрим'], correct: 1 },
    { question: 'Caso para localização "em"?', options: ['Preposicional', 'Instrumental', 'Genitivo', 'Dativo'], correct: 0 },
    { question: 'Caso para objeto indireto "para"?', options: ['Preposicional', 'Instrumental', 'Genitivo', 'Dativo'], correct: 3 },
    { question: 'Caso para posse "de"?', options: ['Preposicional', 'Instrumental', 'Genitivo', 'Dativo'], correct: 2 },
    { question: 'Caso para instrumento "com"?', options: ['Preposicional', 'Instrumental', 'Genitivo', 'Dativo'], correct: 1 },
    { question: 'Plural de "кот"?', options: ['Коты', 'Кота', 'Коту', 'Котом'], correct: 0 },
    { question: 'Passado imperfeito de "говорить" para fem?', options: ['Говорил', 'Говорила', 'Говорило', 'Говорили'], correct: 1 },
    { question: 'Futuro imperfeito de "говорить" para "eu"?', options: ['Буду говорить', 'Говорил', 'Говорю', 'Говоришь'], correct: 0 },
    { question: 'Construção para "eu tenho um livro"?', options: ['У меня есть книга', 'Я имею книгу', 'Книга у меня', 'Есть книга мне'], correct: 0 },
    { question: 'Negativa para "eu tenho"?', options: ['У меня нет', 'Не у меня есть', 'Я не имею', 'Нет книга мне'], correct: 0 },
    { question: 'Verbo "быть" no passado masculino?', options: ['Был', 'Была', 'Было', 'Были'], correct: 0 },
    { question: 'Qual pergunta para "quem"?', options: ['Кто', 'Что', 'Где', 'Когда'], correct: 0 },
    { question: 'Preposição para "para" direção?', options: ['К', 'С', 'В', 'На'], correct: 0 },
    { question: 'Aspecto para ação completada?', options: ['Imperfeito', 'Perfeito', 'Presente', 'Futuro'], correct: 1 },
    { question: 'Conjugação regular de "иметь" para "eu"?', options: ['Имею', 'Имеешь', 'Имеет', 'Имеем'], correct: 0 },
    { question: 'Caso para "sobre o gato"?', options: ['О коте', 'Кота', 'Коту', 'Котом'], correct: 0 },
    { question: 'Adjetivo concorda em?', options: ['Gênero, número, caso', 'Apenas gênero', 'Apenas número', 'Apenas caso'], correct: 0 },
    { question: 'Conjunção para "ou"?', options: ['И', 'Но', 'Или', 'Потому что'], correct: 2 },
    { question: 'Advérbio para "bem"?', options: ['Хорошо', 'Плохо', 'Быстро', 'Здесь'], correct: 0 },
];

let currentGrammarQuestion = 0;

function grammarQuiz() {
    if (hearts === 0) {
        const grammarQuizDiv = document.getElementById('grammar-quiz');
        if (grammarQuizDiv) {
            grammarQuizDiv.innerHTML = '<p>Sem corações! Recarregue para tentar novamente.</p>';
        }
        return;
    }
    const quizDiv = document.getElementById('grammar-quiz');
    if (quizDiv) {
        quizDiv.innerHTML = '';
        if (currentGrammarQuestion < grammarQuestions.length) {
            const q = grammarQuestions[currentGrammarQuestion];
            quizDiv.innerHTML = `
                <p class="quiz-question">${q.question}</p>
                <div class="quiz-options">
                    ${q.options.map((opt, idx) => `<button class="quiz-button" onclick="checkGrammarAnswer(${idx})">${opt}</button>`).join('')}
                </div>
            `;
        } else {
            quizDiv.innerHTML = '<p>Quiz completado! +50 XP</p>';
            addXP(50);
            currentGrammarQuestion = 0;
        }
    }
}

function checkGrammarAnswer(selected) {
    const q = grammarQuestions[currentGrammarQuestion];
    if (selected === q.correct) {
        alert('Correto!');
        addXP(10);
    } else {
        alert('Errado! A resposta correta é ' + q.options[q.correct]);
        loseHeart();
    }
    currentGrammarQuestion++;
    grammarQuiz();
}

// Expanded Conversation Exercise - 20+ from daily phrases
const conversationExercises = [
    { prompt: 'Como se diz "Olá, como vai?"', answer: 'Привет, как дела?' },
    { prompt: 'Responda a "Сколько стоит это?"', answer: 'Сто рублей' },
    { prompt: 'Peça borscht no restaurante.', answer: 'Борщ, пожалуйста' },
    { prompt: 'Pergunte direções para o metrô.', answer: 'Извините, где метро?' },
    { prompt: 'Diga "Obrigado"', answer: 'Спасибо' },
    { prompt: 'Diga "Por favor"', answer: 'Пожалуйста' },
    { prompt: 'Diga "Eu não entendo"', answer: 'Я не понимаю' },
    { prompt: 'Pergunte "Que horas são?"', answer: 'Который час?' },
    { prompt: 'Diga "Sim"', answer: 'Да' },
    { prompt: 'Diga "Não"', answer: 'Нет' },
    { prompt: 'Pergunte "Você fala português?"', answer: 'Вы говорите по-португальски?' },
    { prompt: 'Diga "Bom dia"', answer: 'Доброе утро' },
    { prompt: 'Diga "Boa noite"', answer: 'Добрый вечер' },
    { prompt: 'Diga "Até logo"', answer: 'До свидания' },
    { prompt: 'Pergunte "Quanto custa?"', answer: 'Сколько это стоит?' },
    { prompt: 'Diga "Eu gosto de ti"', answer: 'Ты мне нравишься' },
    { prompt: 'Diga "Eu amo-te"', answer: 'Я люблю тебя' },
    { prompt: 'Pergunte "Gostas de mim?"', answer: 'Ты любишь меня?' },
    { prompt: 'Diga "Eu sei"', answer: 'Я знаю' },
    { prompt: 'Diga "Eu não sei"', answer: 'Я не знаю' },
    { prompt: 'Diga "Tem cuidado"', answer: 'Береги себя' },
    { prompt: 'Diga "Não te preocupes"', answer: 'Не переживай' },
];

let currentConversationExercise = 0;

function conversationExercise() {
    if (hearts === 0) {
        const conversationExerciseDiv = document.getElementById('conversation-exercise');
        if (conversationExerciseDiv) {
            conversationExerciseDiv.innerHTML = '<p>Sem corações! Recarregue para tentar novamente.</p>';
        }
        return;
    }
    const exerciseDiv = document.getElementById('conversation-exercise');
    if (exerciseDiv) {
        exerciseDiv.innerHTML = '';
        if (currentConversationExercise < conversationExercises.length) {
            const ex = conversationExercises[currentConversationExercise];
            exerciseDiv.innerHTML = `
                <p class="quiz-question">${ex.prompt}</p>
                <input type="text" id="conv-input" class="quiz-input">
                <button class="quiz-button" onclick="checkConversationAnswer()">Verificar</button>
            `;
        } else {
            exerciseDiv.innerHTML = '<p>Exercício completado! +50 XP</p>';
            addXP(50);
            currentConversationExercise = 0;
        }
    }
}

function checkConversationAnswer() {
    const ex = conversationExercises[currentConversationExercise];
    const input = document.getElementById('conv-input').value.trim().toLowerCase();
    if (input === ex.answer.toLowerCase()) {
        alert('Correto!');
        addXP(10);
    } else {
        alert('Errado! A resposta correta é ' + ex.answer);
        loseHeart();
    }
    currentConversationExercise++;
    conversationExercise();
}

// Expanded Lessons Quiz - 30 questions based on vocabulary translations
const lessonsQuestions = [
    { question: 'Tradução de "Olá"?', options: ['Пока', 'Привет', 'Спасибо', 'Да'], correct: 1 },
    { question: 'Qual é "Mãe" em russo?', options: ['Папа', 'Мама', 'Брат', 'Сестра'], correct: 1 },
    { question: 'Cor vermelha?', options: ['Синий', 'Зелёный', 'Красный', 'Жёлтый'], correct: 2 },
    { question: 'Tradução de "eu"?', options: ['ты', 'я', 'он', 'она'], correct: 1 },
    { question: 'Qual é "tu" em russo?', options: ['ты', 'вы', 'мы', 'они'], correct: 0 },
    { question: 'Tradução de "ele"?', options: ['она', 'оно', 'он', 'мы'], correct: 2 },
    { question: 'Qual é "ela" em russo?', options: ['он', 'она', 'оно', 'вы'], correct: 1 },
    { question: 'Tradução de "isto"?', options: ['оно', 'мы', 'вы', 'они'], correct: 0 },
    { question: 'Qual é "nós" em russo?', options: ['вы', 'мы', 'они', 'ты'], correct: 1 },
    { question: 'Tradução de "vós"?', options: ['вы', 'они', 'мы', 'я'], correct: 0 },
    { question: 'Qual é "eles" em russo?', options: ['они', 'вы', 'мы', 'ты'], correct: 0 },
    { question: 'Tradução de "O quê"?', options: ['кто', 'где', 'что', 'как'], correct: 2 },
    { question: 'Qual é "Quem" em russo?', options: ['что', 'кто', 'где', 'зачем'], correct: 1 },
    { question: 'Tradução de "Onde"?', options: ['где', 'зачем', 'как', 'какой'], correct: 0 },
    { question: 'Qual é "Porquê" em russo?', options: ['как', 'зачем', 'когда', 'тогда'], correct: 1 },
    { question: 'Tradução de "Como"?', options: ['какой', 'когда', 'как', 'если'], correct: 2 },
    { question: 'Qual é "Qual" em russo?', options: ['какой', 'тогда', 'если', 'на самом деле'], correct: 0 },
    { question: 'Tradução de "Quando"?', options: ['тогда', 'когда', 'если', 'но'], correct: 1 },
    { question: 'Qual é "então" em russo?', options: ['если', 'тогда', 'но', 'потому что'], correct: 1 },
    { question: 'Tradução de "se"?', options: ['но', 'если', 'потому что', 'не'], correct: 1 },
    { question: 'Qual é "mesmo" em russo?', options: ['на самом деле', 'но', 'потому что', 'не'], correct: 0 },
    { question: 'Tradução de "mas"?', options: ['потому что', 'но', 'не', 'это'], correct: 1 },
    { question: 'Qual é "porque" em russo?', options: ['не', 'потому что', 'это', 'Мне нужно это'], correct: 1 },
    { question: 'Tradução de "não"?', options: ['это', 'не', 'Мне нужно это', 'Сколько это стоит?'], correct: 1 },
    { question: 'Qual é "isto" em russo?', options: ['не', 'это', 'что', 'всё'], correct: 1 },
    { question: 'Tradução de "Eu preciso disto"?', options: ['Сколько это стоит?', 'Мне нужно это', 'что', 'всё'], correct: 1 },
    { question: 'Qual é "Quanto é ...?" em russo?', options: ['что', 'Сколько это стоит?', 'всё', 'или'], correct: 1 },
    { question: 'Tradução de "aquilo"?', options: ['всё', 'что', 'или', 'и'], correct: 1 },
    { question: 'Qual é "tudo" em russo?', options: ['или', 'всё', 'и', 'знать'], correct: 1 },
    { question: 'Tradução de "ou"?', options: ['и', 'или', 'знать', 'Я знаю'], correct: 1 },
];

let currentLessonQuestion = 0;

function startQuiz() {
    if (hearts === 0) {
        const quizContainer = document.getElementById('quiz-container');
        if (quizContainer) {
            quizContainer.innerHTML = '<p>Sem corações! Recarregue para tentar novamente.</p>';
        }
        return;
    }
    const quizContainer = document.getElementById('quiz-container');
    if (quizContainer) {
        quizContainer.innerHTML = '';
        if (currentLessonQuestion < lessonsQuestions.length) {
            const q = lessonsQuestions[currentLessonQuestion];
            quizContainer.innerHTML = `
                <p class="quiz-question">${q.question}</p>
                <div class="quiz-options">
                    ${q.options.map((opt, idx) => `<button class="quiz-button" onclick="checkLessonAnswer(${idx})">${opt}</button>`).join('')}
                </div>
            `;
        } else {
            quizContainer.innerHTML = '<p>Quiz completado! +50 XP</p>';
            addXP(50);
            currentLessonQuestion = 0;
        }
    }
}

function checkLessonAnswer(selected) {
    const q = lessonsQuestions[currentLessonQuestion];
    if (selected === q.correct) {
        alert('Correto!');
        addXP(10);
    } else {
        alert('Errado! A resposta correta é ' + q.options[q.correct]);
        loseHeart();
    }
    currentLessonQuestion++;
    startQuiz();
}

// Improved Memory Game
let memoryDifficulty = 'medium';

function startGame() {
    if (hearts === 0) {
        const gameContainer = document.getElementById('game-container');
        if (gameContainer) {
            gameContainer.innerHTML = '<p>Sem corações! Recarregue para tentar novamente.</p>';
        }
        return;
    }
    const gameContainer = document.getElementById('game-container');
    if (gameContainer) {
        gameContainer.innerHTML = '';
        let pairCount;
        switch (memoryDifficulty) {
            case 'easy': pairCount = 10; break;
            case 'medium': pairCount = 20; break;
            case 'hard': pairCount = 30; break;
            default: pairCount = 20;
        }
        const memoryPairs = vocabulary.slice(0, pairCount).map(item => ({
            russian: item.russian,
            portuguese: item.portuguese
        }));
        let cards = [];
        memoryPairs.forEach((pair, index) => {
            cards.push({ value: pair.russian, pairId: index, type: 'russian' });
            cards.push({ value: pair.portuguese, pairId: index, type: 'portuguese' });
        });
        cards = cards.sort(() => Math.random() - 0.5);
        cards.forEach((item) => {
            const card = document.createElement('div');
            card.classList.add('memory-card');
            card.dataset.pairId = item.pairId;
            card.dataset.value = item.value;
            card.innerText = '?';
            card.addEventListener('click', flipCard);
            gameContainer.appendChild(card);
        });
    }
}

let flippedCards = [];

function flipCard(e) {
    const card = this;
    if (flippedCards.length < 2 && !card.classList.contains('flipped') && !card.classList.contains('matched')) {
        card.classList.add('flipped');
        card.innerText = card.dataset.value;
        flippedCards.push(card);
        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 1000);
        }
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.pairId === card2.dataset.pairId) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        addXP(20);
    } else {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        card1.innerText = '?';
        card2.innerText = '?';
        loseHeart();
    }
    flippedCards = [];
    const matchedCount = document.querySelectorAll('.memory-card.matched').length;
    const totalCards = document.querySelectorAll('.memory-card').length;
    if (matchedCount === totalCards && totalCards > 0) {
        alert('Jogo de memória completado! +100 XP');
        addXP(100);
    }
}

// Pronunciation - Synced with vocabulary
function loadPronunciationCards() {
    const container = document.getElementById('pronunciation-cards');
    if (container) {
        container.innerHTML = '';
        vocabulary.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('flashcard');
            card.innerHTML = `
                <div class="flashcard-inner">
                    <div class="flashcard-front">${item.russian}</div>
                    <div class="flashcard-back">${item.portuguese}</div>
                </div>
                <button class="audio-button" onclick="playAudio('https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=${encodeURIComponent(item.russian)}&tl=ru')">Ouvir</button>
            `;
            card.addEventListener('click', () => card.classList.toggle('flipped'));
            container.appendChild(card);
        });
    }
}

// Pronunciation Quiz
const pronunciationQuestions = vocabulary.slice(0, 20);
let currentPronQuestion = 0;

function startPronQuiz() {
    if (hearts === 0) {
        const pronQuiz = document.getElementById('pron-quiz');
        if (pronQuiz) {
            pronQuiz.innerHTML = '<p>Sem corações!</p>';
        }
        return;
    }
    const quizDiv = document.getElementById('pron-quiz');
    if (quizDiv) {
        if (currentPronQuestion < pronunciationQuestions.length) {
            const q = pronunciationQuestions[currentPronQuestion];
            quizDiv.innerHTML = `
                <button class="quiz-button audio-button" onclick="playAudio('${q.audio}')">Ouvir Áudio</button>
                <input type="text" id="pron-input" class="quiz-input">
                <button class="quiz-button" onclick="checkPronAnswer()">Verificar</button>
            `;
        } else {
            quizDiv.innerHTML = '<p>Quiz completado! +50 XP</p>';
            addXP(50);
            currentPronQuestion = 0;
        }
    }
}

function checkPronAnswer() {
    const q = pronunciationQuestions[currentPronQuestion];
    const input = document.getElementById('pron-input').value.trim().toLowerCase();
    if (input === q.russian.toLowerCase()) {
        alert('Correto!');
        addXP(10);
    } else {
        alert('Errado! Era ' + q.russian);
        loseHeart();
    }
    currentPronQuestion++;
    startPronQuiz();
}

// Word Matching Game
function startMatchingGame() {
    if (hearts === 0) {
        const matchingContainer = document.getElementById('matching-container');
        if (matchingContainer) {
            matchingContainer.innerHTML = '<p>Sem corações!</p>';
        }
        return;
    }
    const container = document.getElementById('matching-container');
    if (container) {
        container.innerHTML = '';
        const pairs = vocabulary.slice(0, 10);
        let rusCards = pairs.map(p => p.russian).sort(() => Math.random() - 0.5);
        let ptCards = pairs.map(p => p.portuguese).sort(() => Math.random() - 0.5);
        const createCard = (value, type) => {
            const card = document.createElement('div');
            card.classList.add('matching-card');
            card.innerText = value;
            card.dataset.type = type;
            card.dataset.value = value;
            card.addEventListener('click', () => matchClick(card));
            container.appendChild(card);
        };
        rusCards.forEach(r => createCard(r, 'rus'));
        ptCards.forEach(p => createCard(p, 'pt'));
    }
}

let selectedMatch = null;

function matchClick(card) {
    if (selectedMatch) {
        const matchFound = vocabulary.some(v =>
            (v.russian === (card.dataset.type === 'rus' ? card.dataset.value : selectedMatch.dataset.value)) &&
            (v.portuguese === (card.dataset.type === 'pt' ? card.dataset.value : selectedMatch.dataset.value))
        );
        if (matchFound) {
            card.classList.add('matched');
            selectedMatch.classList.add('matched');
            addXP(15);
        } else {
            loseHeart();
        }
        selectedMatch = null;
    } else {
        selectedMatch = card;
    }
    const matchedCount = document.querySelectorAll('.matching-card.matched').length;
    if (matchedCount === 20) {
        alert('Matching completado! +80 XP');
        addXP(80);
    }
}

// Leaderboard Simulation
let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [{ name: 'Você', score: xp }];

function updateLeaderboard() {
    leaderboard[0].score = xp;
    leaderboard.sort((a, b) => b.score - a.score);
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
    const lbList = document.getElementById('lb-list');
    if (lbList) {
        lbList.innerHTML = leaderboard.slice(0, 5).map(entry => `<li>${entry.name}: ${entry.score} XP</li>`).join('');
    }
}
