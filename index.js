
let currentXP = 0;
let currentLevel = 1;
let unlockedSections = ['home', 'vocabulary']; // Seções desbloqueadas inicialmente

function showSection(sectionId) {
    if (!unlockedSections.includes(sectionId)) {
        alert(`Esta seção está bloqueada! Alcance o nível necessário para desbloquear.`);
        return;
    }
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        if (section.id === sectionId) {
            section.classList.add('active');
            section.classList.remove('hidden');
        } else {
            section.classList.add('hidden');
            section.classList.remove('active');
        }
    });
    // Animação de transição
    const activeSection = document.getElementById(sectionId);
    activeSection.style.animation = 'fadeIn 0.5s';
}

function updateXP(addXP) {
    currentXP += addXP;
    checkLevelUp();
    document.getElementById('xp').textContent = currentXP;
    document.getElementById('level').textContent = currentLevel;
    localStorage.setItem('xp', currentXP);
    localStorage.setItem('level', currentLevel);
    localStorage.setItem('unlockedSections', JSON.stringify(unlockedSections));
    // Feedback visual
    const xpElement = document.getElementById('xp');
    xpElement.style.color = 'green';
    setTimeout(() => { xpElement.style.color = '#333'; }, 1000);
}

function checkLevelUp() {
    const xpNeeded = 100 * currentLevel;
    if (currentXP >= xpNeeded) {
        currentLevel++;
        alert(`Parabéns! Você subiu para o nível ${currentLevel}! Nova seção desbloqueada.`);
        unlockNextSection();
    }
}

function unlockNextSection() {
    const allSections = ['home', 'vocabulary', 'grammar', 'pronunciation', 'conversation', 'culture', 'lessons', 'music', 'podcasts'];
    const nextSection = allSections.find(sec => !unlockedSections.includes(sec));
    if (nextSection) {
        unlockedSections.push(nextSection);
    }
}

function loadProgress() {
    const savedXP = localStorage.getItem('xp');
    const savedLevel = localStorage.getItem('level');
    const savedUnlocked = localStorage.getItem('unlockedSections');
    if (savedXP) currentXP = parseInt(savedXP);
    if (savedLevel) currentLevel = parseInt(savedLevel);
    if (savedUnlocked) unlockedSections = JSON.parse(savedUnlocked);
    document.getElementById('xp').textContent = currentXP;
    document.getElementById('level').textContent = currentLevel;
}

// Dados de exemplo extensos para vocabulário
const vocabulary = [
    { russian: 'Привет', portuguese: 'Olá', audio: 'https://example.com/audio/privet.mp3', example: 'Привет, как дела?' },
    { russian: 'Спасибо', portuguese: 'Obrigado', audio: 'https://example.com/audio/spasibo.mp3', example: 'Спасибо за помощь!' },
    { russian: 'Да', portuguese: 'Sim', audio: 'https://example.com/audio/da.mp3', example: 'Да, я согласен.' },
    { russian: 'Нет', portuguese: 'Não', audio: 'https://example.com/audio/net.mp3', example: 'Нет, спасибо.' },
    { russian: 'Пожалуйста', portuguese: 'Por favor', audio: 'https://example.com/audio/pozhaluysta.mp3', example: 'Чай, пожалуйста.' },
    { russian: 'Дом', portuguese: 'Casa', audio: 'https://example.com/audio/dom.mp3', example: 'Я иду домой.' },
    { russian: 'Кот', portuguese: 'Gato', audio: 'https://example.com/audio/kot.mp3', example: 'Кот спит на диване.' },
    { russian: 'Собака', portuguese: 'Cachorro', audio: 'https://example.com/audio/sobaka.mp3', example: 'Собака лает.' },
    { russian: 'Еда', portuguese: 'Comida', audio: 'https://example.com/audio/eda.mp3', example: 'Вкусная еда.' },
    { russian: 'Вода', portuguese: 'Água', audio: 'https://example.com/audio/voda.mp3', example: 'Стакан воды.' },
    { russian: 'Книга', portuguese: 'Livro', audio: 'https://example.com/audio/kniga.mp3', example: 'Интересная книга.' },
    { russian: 'Школа', portuguese: 'Escola', audio: 'https://example.com/audio/shkola.mp3', example: 'Я хожу в школу.' },
    { russian: 'Университет', portuguese: 'Universidade', audio: 'https://example.com/audio/universitet.mp3', example: 'Студент университета.' },
    { russian: 'Работа', portuguese: 'Trabalho', audio: 'https://example.com/audio/rabota.mp3', example: 'Хорошая работа.' },
    { russian: 'Друг', portuguese: 'Amigo', audio: 'https://example.com/audio/drug.mp3', example: 'Мой лучший друг.' },
    { russian: 'Семья', portuguese: 'Família', audio: 'https://example.com/audio/semya.mp3', example: 'Семья важна.' },
    { russian: 'Любовь', portuguese: 'Amor', audio: 'https://example.com/audio/lyubov.mp3', example: 'Вечная любовь.' },
    { russian: 'Музыка', portuguese: 'Música', audio: 'https://example.com/audio/muzyka.mp3', example: 'Классическая музыка.' },
    { russian: 'Фильм', portuguese: 'Filme', audio: 'https://example.com/audio/film.mp3', example: 'Интересный фильм.' },
    { russian: 'Спорт', portuguese: 'Esporte', audio: 'https://example.com/audio/sport.mp3', example: 'Любимый спорт.' },
    { russian: 'Путешествие', portuguese: 'Viagem', audio: 'https://example.com/audio/puteshestvie.mp3', example: 'Долгое путешествие.' },
    { russian: 'Город', portuguese: 'Cidade', audio: 'https://example.com/audio/gorod.mp3', example: 'Большой город.' },
    { russian: 'Страна', portuguese: 'País', audio: 'https://example.com/audio/strana.mp3', example: 'Моя страна.' },
    { russian: 'Мир', portuguese: 'Mundo', audio: 'https://example.com/audio/mir.mp3', example: 'Весь мир.' },
    { russian: 'Время', portuguese: 'Tempo', audio: 'https://example.com/audio/vremya.mp3', example: 'Время летит.' },
    { russian: 'День', portuguese: 'Dia', audio: 'https://example.com/audio/den.mp3', example: 'Хороший день.' },
    { russian: 'Ночь', portuguese: 'Noite', audio: 'https://example.com/audio/noch.mp3', example: 'Тёмная ночь.' },
    { russian: 'Утро', portuguese: 'Manhã', audio: 'https://example.com/audio/utro.mp3', example: 'Раннее утро.' },
    { russian: 'Вечер', portuguese: 'Tarde/Noite', audio: 'https://example.com/audio/vecher.mp3', example: 'Приятный вечер.' },
    { russian: 'Год', portuguese: 'Ano', audio: 'https://example.com/audio/god.mp3', example: 'Новый год.' }
];

function loadVocabularyCards() {
    const container = document.querySelector('.card-container');
    container.innerHTML = '';
    vocabulary.forEach(word => {
        const card = document.createElement('div');
        card.classList.add('flashcard');
        card.innerHTML = `
            <div class="flashcard-inner">
                <div class="flashcard-front">
                    <p>${word.russian}</p>
                    <audio controls src="${word.audio}"></audio>
                    <p>Exemplo: ${word.example}</p>
                </div>
                <div class="flashcard-back">
                    <p>${word.portuguese}</p>
                </div>
            </div>
        `;
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
            updateXP(5);
            playAudio(word.audio); // Toca áudio ao flipar
        });
        card.addEventListener('mouseover', () => {
            card.style.transform = 'scale(1.05)';
        });
        card.addEventListener('mouseout', () => {
            card.style.transform = 'scale(1)';
        });
        container.appendChild(card);
    });
    // Adiciona drag and drop para reorganizar cards
    makeDraggable(container);
}

function playAudio(src) {
    const audio = new Audio(src);
    audio.play();
}

function makeDraggable(container) {
    const cards = container.querySelectorAll('.flashcard');
    cards.forEach(card => {
        card.draggable = true;
        card.addEventListener('dragstart', dragStart);
        card.addEventListener('dragover', dragOver);
        card.addEventListener('drop', drop);
    });
}

function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
    setTimeout(() => this.style.display = 'none', 0);
}

function dragOver(e) {
    e.preventDefault();
}

function drop(e) {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    const draggable = document.getElementById(id);
    draggable.style.display = 'block';
    e.target.closest('.card-container').insertBefore(draggable, e.target);
    updateXP(2); // XP por interação de drag
}

// Quiz interativo extenso com timer
const quizQuestions = [
    { question: 'O que significa "Привет"?', options: ['Olá', 'Adeus', 'Obrigado'], answer: 'Olá' },
    { question: 'O que significa "Спасибо"?', options: ['Por favor', 'Obrigado', 'Sim'], answer: 'Obrigado' },
    { question: 'O que significa "Да"?', options: ['Não', 'Sim', 'Talvez'], answer: 'Sim' },
    { question: 'O que significa "Нет"?', options: ['Sim', 'Não', 'Obrigado'], answer: 'Não' },
    { question: 'O que significa "Дом"?', options: ['Casa', 'Carro', 'Árvore'], answer: 'Casa' },
    { question: 'O que significa "Кот"?', options: ['Cachorro', 'Gato', 'Pássaro'], answer: 'Gato' },
    { question: 'O que significa "Собака"?', options: ['Gato', 'Cachorro', 'Peixe'], answer: 'Cachorro' },
    { question: 'O que significa "Еда"?', options: ['Bebida', 'Comida', 'Roupa'], answer: 'Comida' },
    { question: 'O que significa "Вода"?', options: ['Água', 'Fogo', 'Ar'], answer: 'Água' },
    { question: 'O que significa "Книга"?', options: ['Livro', 'Caneta', 'Papel'], answer: 'Livro' },
    { question: 'O que significa "Школа"?', options: ['Hospital', 'Escola', 'Loja'], answer: 'Escola' },
    { question: 'O que significa "Работа"?', options: ['Trabalho', 'Férias', 'Jogo'], answer: 'Trabalho' },
    { question: 'O que significa "Друг"?', options: ['Inimigo', 'Amigo', 'Estranho'], answer: 'Amigo' },
    { question: 'O que significa "Семья"?', options: ['Família', 'Amigos', 'Vizinhos'], answer: 'Família' },
    { question: 'O que significa "Любовь"?', options: ['Ódio', 'Amor', 'Medo'], answer: 'Amor' },
    { question: 'O que significa "Музыка"?', options: ['Silêncio', 'Música', 'Ruído'], answer: 'Música' },
    { question: 'O que significa "Фильм"?', options: ['Livro', 'Filme', 'Música'], answer: 'Filme' },
    { question: 'O que significa "Спорт"?', options: ['Esporte', 'Estudo', 'Trabalho'], answer: 'Esporte' },
    { question: 'O que significa "Путешествие"?', options: ['Viagem', 'Casa', 'Trabalho'], answer: 'Viagem' },
    { question: 'O que significa "Город"?', options: ['Cidade', 'País', 'Vilarejo'], answer: 'Cidade' }
];

let quizTimer;
let currentQuestionIndex = 0;
let quizScore = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    quizScore = 0;
    displayQuizQuestion();
    startTimer(30); // 30 segundos por pergunta
}

function displayQuizQuestion() {
    const container = document.getElementById('quiz-container');
    container.innerHTML = '';
    if (currentQuestionIndex >= quizQuestions.length) {
        endQuiz();
        return;
    }
    const q = quizQuestions[currentQuestionIndex];
    const div = document.createElement('div');
    div.innerHTML = `
        <p>${q.question}</p>
        ${q.options.map(opt => `<button onclick="checkAnswer('${opt}')">${opt}</button>`).join('')}
        <div id="timer">Tempo restante: 30s</div>
    `;
    container.appendChild(div);
}

function checkAnswer(selected) {
    const correct = quizQuestions[currentQuestionIndex].answer;
    if (selected === correct) {
        alert('Correto!');
        quizScore++;
        updateXP(10);
    } else {
        alert('Errado! A resposta correta é ' + correct);
    }
    currentQuestionIndex++;
    clearTimeout(quizTimer);
    displayQuizQuestion();
    startTimer(30);
}

function startTimer(seconds) {
    const timerElement = document.getElementById('timer');
    let timeLeft = seconds;
    timerElement.textContent = `Tempo restante: ${timeLeft}s`;
    quizTimer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Tempo restante: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(quizTimer);
            alert('Tempo esgotado!');
            currentQuestionIndex++;
            displayQuizQuestion();
            startTimer(30);
        }
    }, 1000);
}

function endQuiz() {
    const container = document.getElementById('quiz-container');
    container.innerHTML = `<p>Quiz terminado! Pontuação: ${quizScore}/${quizQuestions.length}</p>`;
    updateXP(quizScore * 5); // Bônus por pontuação
}

// Quiz de Gramática similar com interatividade
const grammarQuestions = [
    { question: 'Qual caso é usado para sujeitos?', options: ['Genitivo', 'Nominativo', 'Acusativo'], answer: 'Nominativo' },
    { question: 'Exemplo de verbo no presente: Я ... (falo)', options: ['говорил', 'говорю', 'буду говорить'], answer: 'говорю' },
    // Adicionar mais 18 questões
    { question: 'Caso para posse?', options: ['Nominativo', 'Genitivo', 'Dativo'], answer: 'Genitivo' },
    { question: 'Adjetivos concordam em?', options: ['Gênero, número, caso', 'Apenas gênero', 'Apenas caso'], answer: 'Gênero, número, caso' },
    { question: 'Pronome para "eu"?', options: ['Ты', 'Я', 'Он'], answer: 'Я' },
    { question: 'Preposição "em" (local)?', options: ['На', 'В', 'С'], answer: 'В' },
    { question: 'Conjunção "e"?', options: ['Но', 'И', 'Потому что'], answer: 'И' },
    { question: 'Advérbio "rapidamente"?', options: ['Хорошо', 'Быстро', 'Плохо'], answer: 'Быстро' },
    { question: 'Número "um"?', options: ['Два', 'Один', 'Три'], answer: 'Один' },
    { question: 'Verbo no passado: Я ... (falei)', options: ['говорю', 'говорил', 'буду говорить'], answer: 'говорил' },
    { question: 'Pronome para "você" (informal)?', options: ['Вы', 'Ты', 'Они'], answer: 'Ты' },
    { question: 'Preposição "com"?', options: ['В', 'На', 'С'], answer: 'С' },
    { question: 'Conjunção "mas"?', options: ['И', 'Но', 'Потому что'], answer: 'Но' },
    { question: 'Advérbio "bem"?', options: ['Быстро', 'Хорошо', 'Медленно'], answer: 'Хорошо' },
    { question: 'Número "dois"?', options: ['Один', 'Два', 'Три'], answer: 'Два' },
    { question: 'Pronome para "ele"?', options: ['Она', 'Он', 'Оно'], answer: 'Он' },
    { question: 'Preposição "sobre"?', options: ['В', 'На', 'С'], answer: 'На' },
    { question: 'Conjunção "porque"?', options: ['И', 'Но', 'Потому что'], answer: 'Потому что' },
    { question: 'Advérbio "lentamente"?', options: ['Быстро', 'Хорошо', 'Медленно'], answer: 'Медленно' },
    { question: 'Número "três"?', options: ['Два', 'Три', 'Четыре'], answer: 'Три' }
];

function grammarQuiz() {
    currentQuestionIndex = 0;
    quizScore = 0;
    displayGrammarQuestion();
    startTimer(30);
}

function displayGrammarQuestion() {
    const container = document.getElementById('grammar-quiz');
    container.innerHTML = '';
    if (currentQuestionIndex >= grammarQuestions.length) {
        endQuiz(); // Reusa função endQuiz
        return;
    }
    const q = grammarQuestions[currentQuestionIndex];
    const div = document.createElement('div');
    div.innerHTML = `
        <p>${q.question}</p>
        ${q.options.map(opt => `<button onclick="checkGrammarAnswer('${opt}')">${opt}</button>`).join('')}
        <div id="timer">Tempo restante: 30s</div>
    `;
    container.appendChild(div);
}

function checkGrammarAnswer(selected) {
    const correct = grammarQuestions[currentQuestionIndex].answer;
    if (selected === correct) {
        alert('Correto!');
        quizScore++;
        updateXP(10);
    } else {
        alert('Errado! A resposta correta é ' + correct);
    }
    currentQuestionIndex++;
    clearTimeout(quizTimer);
    displayGrammarQuestion();
    startTimer(30);
}

// Exercício de Conversação com input do usuário
const conversations = [
    { prompt: 'Complete: - Привет! ___ дела?', answer: 'Как' },
    { prompt: 'Complete: - Хорошо, ___ ! А у тебя?', answer: 'спасибо' },
    // Mais 18 para extensividade
    { prompt: 'Complete: - Сколько ___ это?', answer: 'стоит' },
    { prompt: 'Complete: - Сто ___ .', answer: 'рублей' },
    { prompt: 'Complete: - Что вы хотите ___ ?', answer: 'заказать' },
    { prompt: 'Complete: - Борщ, ___ .', answer: 'пожалуйста' },
    { prompt: 'Complete: - Добрый ___ !', answer: 'день' },
    { prompt: 'Complete: - До ___ !', answer: 'свидания' },
    { prompt: 'Complete: - Извините, ___ время?', answer: 'который' },
    { prompt: 'Complete: - Два ___ .', answer: 'часа' },
    { prompt: 'Complete: - Где ___ метро?', answer: 'находится' },
    { prompt: 'Complete: - Прямо по ___ .', answer: 'улице' },
    { prompt: 'Complete: - Я ___ русский.', answer: 'изучаю' },
    { prompt: 'Complete: - Это ___ книга.', answer: 'интересная' },
    { prompt: 'Complete: - У меня ___ собака.', answer: 'есть' },
    { prompt: 'Complete: - Я люблю ___ .', answer: 'музыку' },
    { prompt: 'Complete: - Завтра будет ___ .', answer: 'дождь' },
    { prompt: 'Complete: - Сколько ___ лет?', answer: 'тебе' },
    { prompt: 'Complete: - Мне ___ лет.', answer: 'двадцать' },
    { prompt: 'Complete: - Спасибо за ___ !', answer: 'подарок' }
];

let convIndex = 0;

function conversationExercise() {
    convIndex = 0;
    displayConvExercise();
}

function displayConvExercise() {
    const container = document.getElementById('conversation-exercise');
    container.innerHTML = '';
    if (convIndex >= conversations.length) {
        container.innerHTML = '<p>Exercício completo!</p>';
        updateXP(50); // Bônus final
        return;
    }
    const c = conversations[convIndex];
    const div = document.createElement('div');
    div.innerHTML = `
        <p>${c.prompt}</p>
        <input type="text" id="conv-input" placeholder="Digite a palavra faltante">
        <button onclick="checkConvAnswer()">Verificar</button>
    `;
    container.appendChild(div);
}

function checkConvAnswer() {
    const input = document.getElementById('conv-input').value.trim().toLowerCase();
    const correct = conversations[convIndex].answer.toLowerCase();
    if (input === correct) {
        alert('Correto!');
        updateXP(15);
    } else {
        alert('Errado! Correto: ' + correct);
    }
    convIndex++;
    displayConvExercise();
}

// Jogo de Memória interativo
let memoryCards = vocabulary.slice(0, 8).flatMap(word => [
    { type: 'russian', content: word.russian, pair: word.portuguese },
    { type: 'portuguese', content: word.portuguese, pair: word.russian }
]).sort(() => Math.random() - 0.5);

let firstCard = null;
let secondCard = null;
let lockBoard = false;

function startGame() {
    const container = document.getElementById('game-container');
    container.innerHTML = '';
    memoryCards.forEach((card, index) => {
        const div = document.createElement('div');
        div.classList.add('memory-card');
        div.dataset.pair = card.pair;
        div.innerHTML = `<p class="hidden">${card.content}</p>`;
        div.addEventListener('click', flipCard);
        container.appendChild(div);
    });
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');
    this.querySelector('p').classList.remove('hidden');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;

    checkForMatch();
}

function checkForMatch() {
    if (firstCard.dataset.pair === secondCard.querySelector('p').textContent) {
        disableCards();
        updateXP(20);
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        firstCard.querySelector('p').classList.add('hidden');
        secondCard.classList.remove('flipped');
        secondCard.querySelector('p').classList.add('hidden');
        resetBoard();
    }, 1500);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

// Adiciona suporte a reconhecimento de fala para pronúncia (se browser suportar)
function startPronunciationPractice() {
    if ('SpeechRecognition' in window) {
        const recognition = new SpeechRecognition();
        recognition.lang = 'ru-RU';
        recognition.onresult = (event) => {
            const spoken = event.results[0][0].transcript;
            // Comparar com palavra esperada, ex: se correto, XP
            alert(`Você disse: ${spoken}`);
            updateXP(25);
        };
        recognition.start();
    } else {
        alert('Reconhecimento de fala não suportado neste navegador.');
    }
}

// Adiciona botão para prática de pronúncia na seção
document.addEventListener('DOMContentLoaded', () => {
    const pronSection = document.getElementById('pronunciation');
    const btn = document.createElement('button');
    btn.textContent = 'Praticar Pronúncia com Microfone';
    btn.onclick = startPronunciationPractice;
    pronSection.appendChild(btn);
});

// Carregar progresso ao iniciar
window.onload = () => {
    loadProgress();
    // Adiciona animações globais
    document.body.style.animation = 'fadeIn 1s';
};

// Definição de animações no CSS já existe, mas reforça aqui se necessário
const style = document.createElement('style');
style.innerHTML = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    .memory-card {
        width: 100px;
        height: 150px;
        margin: 5px;
        background: #bbb;
        cursor: pointer;
        display: inline-block;
    }
    .memory-card.flipped {
        background: #2980b9;
        color: white;
    }
    .memory-card p.hidden {
        display: none;
    }
`;
document.head.appendChild(style);