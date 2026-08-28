/* ==============================================
   NOSSA HISTÓRIA - QUIZ MODULE
   Romantic Quiz Questions & Results
   ============================================== */

const quizData = [
    {
        question: 'Qual foi o lugar do nosso primeiro encontro?',
        options: ['[LOCAL 1]', '[LOCAL 2]', '[LOCAL 3]', '[LOCAL 4]'],
        correct: 0
    },
    {
        question: 'Em que mês nos conhecemos?',
        options: ['[MÊS 1]', '[MÊS 2]', '[MÊS 3]', '[MÊS 4]'],
        correct: 0
    },
    {
        question: 'Qual é a cor favorita do(a) meu amor?',
        options: ['[COR 1]', '[COR 2]', '[COR 3]', '[COR 4]'],
        correct: 0
    },
    {
        question: 'Qual é nosso filme favorito?',
        options: ['[FILME 1]', '[FILME 2]', '[FILME 3]', '[FILME 4]'],
        correct: 0
    },
    {
        question: 'Qual é a música especial da nossa história?',
        options: ['[MÚSICA 1]', '[MÚSICA 2]', '[MÚSICA 3]', '[MÚSICA 4]'],
        correct: 0
    },
    {
        question: 'Para onde gostaríamos de viajar juntos?',
        options: ['[PAÍS 1]', '[PAÍS 2]', '[PAÍS 3]', '[PAÍS 4]'],
        correct: 0
    }
];

let quizState = {
    currentQuestion: 0,
    score: 0,
    answers: []
};

function initializeQuiz() {
    const container = document.getElementById('quizContainer');
    const result = document.getElementById('quizResult');
    
    container.classList.remove('hidden');
    result.classList.add('hidden');
    
    quizState = {
        currentQuestion: 0,
        score: 0,
        answers: []
    };
    
    renderQuestion();
}

function renderQuestion() {
    const container = document.getElementById('quizContainer');
    const question = quizData[quizState.currentQuestion];
    
    container.innerHTML = `
        <div class="quiz-question">
            <h3>${quizState.currentQuestion + 1}. ${question.question}</h3>
            <div class="quiz-options">
                ${question.options.map((option, index) => `
                    <label class="quiz-option" onclick="selectQuizOption(${index})">
                        <input type="radio" name="answer" value="${index}">
                        ${option}
                    </label>
                `).join('')}
            </div>
        </div>
        <div class="quiz-submit">
            <button class="btn btn-primary" onclick="nextQuestion()">Próxima</button>
        </div>
    `;
}

function selectQuizOption(index) {
    const options = document.querySelectorAll('.quiz-option');
    options.forEach(opt => opt.classList.remove('selected'));
    options[index].classList.add('selected');
    options[index].querySelector('input').checked = true;
    quizState.answers[quizState.currentQuestion] = index;
}

function nextQuestion() {
    if (quizState.answers[quizState.currentQuestion] === undefined) {
        showNotification('Por favor, selecione uma resposta!', 'error');
        return;
    }
    
    // Check answer
    if (quizState.answers[quizState.currentQuestion] === quizData[quizState.currentQuestion].correct) {
        quizState.score++;
    }
    
    quizState.currentQuestion++;
    
    if (quizState.currentQuestion < quizData.length) {
        renderQuestion();
    } else {
        showQuizResult();
    }
}

function showQuizResult() {
    const container = document.getElementById('quizContainer');
    const result = document.getElementById('quizResult');
    const percentage = Math.round((quizState.score / quizData.length) * 100);
    
    container.classList.add('hidden');
    result.classList.remove('hidden');
    
    let resultMessage = '';
    if (percentage === 100) {
        resultMessage = '🎉 Você é um especialista em nossa história! Perfeito!';
    } else if (percentage >= 80) {
        resultMessage = '❤️ Você conhece bem nossa história!';
    } else if (percentage >= 60) {
        resultMessage = '💕 Você conhece alguns detalhes especiais!';
    } else if (percentage >= 40) {
        resultMessage = '💭 Ainda há muito para aprender sobre nós!';
    } else {
        resultMessage = '📖 Que tal estudar nossa história juntos?';
    }
    
    document.getElementById('resultContent').innerHTML = `
        <p style="font-size: 48px; margin-bottom: 20px;">${percentage}%</p>
        <p>${quizState.score} de ${quizData.length} respostas corretas</p>
        <p style="margin-top: 20px; font-size: 18px; color: #ff6b9d;">${resultMessage}</p>
    `;
    
    saveProgress('quizScore', quizState.score);
}

function resetQuiz() {
    initializeQuiz();
}

// ==============================================
// LETTER ANIMATION
// ==============================================

const letterContent = `Meu amor,

Não sou muito bom com palavras, mas preciso que você saiba...

Desde o primeiro momento em que nos conhecemos, meu mundo mudou. Você trouxe luz, amor e alegria para minha vida.

Cada momento com você é especial. Cada conversa, cada gesto, cada olhar.

Você é meu melhor amigo, meu amor, meu tudo.

Obrigado por estar ao meu lado. Obrigado por acreditar em nós.

Quero construir uma vida repleta de memórias ao seu lado. Quero acordar com você, dormir com você, envelhecer com você.

Você é meu maior presente da vida.

Te amo mais a cada dia.`;

function setupLetterAnimation() {
    const letterText = document.getElementById('letterText');
    const btn = document.querySelector('#letter .btn');
    
    if (btn) {
        btn.addEventListener('click', startLetterAnimation);
    }
}

function startLetterAnimation() {
    const letterText = document.getElementById('letterText');
    letterText.textContent = '';
    
    let index = 0;
    const speed = 30; // ms per character
    
    function typeWriter() {
        if (index < letterContent.length) {
            letterText.textContent += letterContent.charAt(index);
            index++;
            setTimeout(typeWriter, speed);
        }
    }
    
    typeWriter();
}

// ==============================================
// DIARY FUNCTIONS
// ==============================================

function saveDiaryEntry() {
    const textarea = document.getElementById('diaryTextarea');
    const text = textarea.value.trim();
    
    if (!text) {
        showNotification('Digite algo antes de salvar!', 'error');
        return;
    }
    
    let entries = loadData('diaryEntries') || [];
    
    entries.unshift({
        text: text,
        date: new Date().toLocaleString('pt-BR'),
        timestamp: Date.now()
    });
    
    saveData('diaryEntries', entries);
    textarea.value = '';
    
    loadDiaryEntries();
    showNotification('Memória salva! ❤️', 'success');
}

function loadDiaryEntries() {
    const container = document.getElementById('diaryEntries');
    const entries = loadData('diaryEntries') || [];
    
    if (entries.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #b0b0c8;">Nenhuma memória registrada ainda...</p>';
        return;
    }
    
    container.innerHTML = entries.map((entry, index) => `
        <div class="diary-entry-item">
            <div class="diary-entry-date">${entry.date}</div>
            <div class="diary-entry-text">${entry.text}</div>
            <button style="
                margin-top: 10px;
                padding: 5px 15px;
                background: rgba(239, 68, 68, 0.1);
                border: 1px solid rgba(239, 68, 68, 0.3);
                color: #ef4444;
                border-radius: 4px;
                font-size: 12px;
                cursor: pointer;
            " onclick="deleteDiaryEntry(${index})">Deletar</button>
        </div>
    `).join('');
}

function deleteDiaryEntry(index) {
    if (confirm('Tem certeza que quer deletar esta memória?')) {
        let entries = loadData('diaryEntries') || [];
        entries.splice(index, 1);
        saveData('diaryEntries', entries);
        loadDiaryEntries();
        showNotification('Memória deletada.', 'info');
    }
}

// ==============================================
// GALLERY FUNCTIONS
// ==============================================

function addPhoto(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        let photos = loadData('galleryPhotos') || [];
        
        photos.push({
            src: e.target.result,
            timestamp: Date.now()
        });
        
        saveData('galleryPhotos', photos);
        loadGalleryPhotos();
        showNotification('Foto adicionada! 📸', 'success');
    };
    
    reader.readAsDataURL(file);
}

function loadGalleryPhotos() {
    const grid = document.getElementById('galleryGrid');
    const photos = loadData('galleryPhotos') || [];
    
    // Keep add button
    const addButton = grid.querySelector('.add-photo');
    grid.innerHTML = '';
    grid.appendChild(addButton);
    
    photos.forEach((photo, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.innerHTML = `
            <img src="${photo.src}" alt="Foto ${index + 1}">
            <div style="
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0,0,0,0.7);
                display: flex;
                align-items: flex-end;
                padding: 10px;
                opacity: 0;
                transition: opacity 0.3s;
            " class="photo-overlay">
                <button style="
                    width: 100%;
                    padding: 8px;
                    background: rgba(239, 68, 68, 0.8);
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 12px;
                " onclick="deletePhoto(${index})">Deletar</button>
            </div>
        `;
        
        item.addEventListener('mouseenter', () => {
            item.querySelector('.photo-overlay').style.opacity = '1';
        });
        item.addEventListener('mouseleave', () => {
            item.querySelector('.photo-overlay').style.opacity = '0';
        });
        
        grid.appendChild(item);
    });
}

function deletePhoto(index) {
    if (confirm('Deletar esta foto?')) {
        let photos = loadData('galleryPhotos') || [];
        photos.splice(index, 1);
        saveData('galleryPhotos', photos);
        loadGalleryPhotos();
        showNotification('Foto removida.', 'info');
    }
}

// ==============================================
// TIMER FUNCTIONS
// ==============================================

function initializeTimer() {
    const startDate = loadData('relationshipStartDate');
    const setup = document.getElementById('timerSetup');
    const display = document.getElementById('timerDisplay');
    
    if (startDate) {
        setup.classList.add('hidden');
        display.classList.remove('hidden');
        startTimerInterval();
    } else {
        setup.classList.remove('hidden');
        display.classList.add('hidden');
    }
}

function setStartDate() {
    const input = document.getElementById('startDate');
    const date = input.value;
    
    if (!date) {
        showNotification('Selecione uma data!', 'error');
        return;
    }
    
    saveData('relationshipStartDate', date);
    initializeTimer();
    showNotification('Data configurada! ❤️', 'success');
}

function startTimerInterval() {
    updateTimer();
    setInterval(updateTimer, 1000);
}

function updateTimer() {
    const startDate = loadData('relationshipStartDate');
    if (!startDate) return;
    
    const start = new Date(startDate).getTime();
    const now = new Date().getTime();
    const diff = now - start;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
}

// ==============================================
// EXPORT FUNCTIONS
// ==============================================

window.initializeQuiz = initializeQuiz;
window.selectQuizOption = selectQuizOption;
window.nextQuestion = nextQuestion;
window.resetQuiz = resetQuiz;
window.startLetterAnimation = startLetterAnimation;
window.saveDiaryEntry = saveDiaryEntry;
window.deleteDiaryEntry = deleteDiaryEntry;
window.addPhoto = addPhoto;
window.deletePhoto = deletePhoto;
window.setStartDate = setStartDate;
