/* ==============================================
   NOSSA HISTÓRIA - MEMORIES MODULE
   Memory Hunt & Collection System
   ============================================== */

// ==============================================
// MEMORY DATA STRUCTURE
// ==============================================

const memoriesData = [
    {
        id: 1,
        title: 'Primeiro Olhar',
        emoji: '👀',
        description: 'O momento em que nos vimos pela primeira vez',
        unlocked: false,
        locked: true
    },
    {
        id: 2,
        title: 'Primeiro Beijo',
        emoji: '💋',
        description: 'Um beijo que mudou tudo',
        unlocked: false,
        locked: true
    },
    {
        id: 3,
        title: 'Primeira Viagem',
        emoji: '✈️',
        description: 'Explorando novos lugares juntos',
        unlocked: false,
        locked: true
    },
    {
        id: 4,
        title: 'Noites Especiais',
        emoji: '🌙',
        description: 'Momentos mágicos sob as estrelas',
        unlocked: false,
        locked: true
    },
    {
        id: 5,
        title: 'Risos Compartilhados',
        emoji: '😄',
        description: 'Nossos melhores momentos de alegria',
        unlocked: false,
        locked: true
    },
    {
        id: 6,
        title: 'Segredo do Coração',
        emoji: '❤️',
        description: 'A memória mais especial e secreta',
        unlocked: false,
        locked: true,
        isSecret: true
    }
];

let memoriesState = {
    collected: [],
    currentAttempts: 0,
    maxAttempts: 3
};

// ==============================================
// INITIALIZE MEMORIES SCENE
// ==============================================

function initializeMemories() {
    loadMemoriesState();
    renderMemoriesGrid();
}

function loadMemoriesState() {
    const saved = loadData('memoriesState');
    if (saved) {
        memoriesState = saved;
    } else {
        memoriesState = {
            collected: [],
            currentAttempts: 0,
            maxAttempts: 3
        };
    }
}

function saveMemoriesState() {
    saveData('memoriesState', memoriesState);
}

// ==============================================
// RENDER MEMORIES GRID
// ==============================================

function renderMemoriesGrid() {
    const grid = document.getElementById('memoriesGrid');
    grid.innerHTML = '';
    
    memoriesData.forEach((memory, index) => {
        const card = createMemoryCard(memory, index);
        grid.appendChild(card);
    });
    
    updateMemoryProgress();
}

function createMemoryCard(memory, index) {
    const card = document.createElement('div');
    card.className = 'memory-card';
    
    // Check if memory is unlocked
    const isCollected = memoriesState.collected.includes(memory.id);
    
    if (isCollected) {
        card.classList.add('unlocked');
    } else {
        card.classList.add('locked');
    }
    
    card.innerHTML = `
        <div class="memory-content">
            <div>${isCollected ? memory.emoji : '🔒'}</div>
            ${isCollected ? `<p class="memory-title">${memory.title}</p>` : ''}
        </div>
    `;
    
    card.addEventListener('click', () => handleMemoryClick(memory, card));
    
    return card;
}

// ==============================================
// HANDLE MEMORY CLICK
// ==============================================

function handleMemoryClick(memory, cardElement) {
    // If already collected, show info
    if (memoriesState.collected.includes(memory.id)) {
        showMemoryDetail(memory);
        return;
    }
    
    // Generate random challenge (mini-game)
    showMemoryChallenge(memory, cardElement);
}

function showMemoryChallenge(memory, cardElement) {
    // Different challenges for each memory
    const challenges = [
        { type: 'question', difficulty: 'easy' },
        { type: 'riddle', difficulty: 'medium' },
        { type: 'memory', difficulty: 'hard' }
    ];
    
    const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)];
    
    switch(randomChallenge.type) {
        case 'question':
            showQuestionChallenge(memory, cardElement);
            break;
        case 'riddle':
            showRiddleChallenge(memory, cardElement);
            break;
        case 'memory':
            showMemoryMiniGame(memory, cardElement);
            break;
    }
}

function showQuestionChallenge(memory, cardElement) {
    const questions = {
        1: 'Qual foi o mês do nosso primeiro encontro?',
        2: 'Em que estação do ano foi nosso primeiro beijo?',
        3: 'Para qual país queremos viajar?',
        4: 'Qual é nossa música favorita?',
        5: 'Qual é nossa piada preferida?',
        6: 'Qual é o nosso número da sorte?'
    };
    
    const answer = prompt(`Desafio: ${questions[memory.id] || 'Pergunta sobre nossa história'}\n\n[VOCÊ PRECISA ADICIONAR A RESPOSTA CORRETA]`);
    
    if (answer) {
        // [CUSTOMIZE] Add your actual answers here
        const correctAnswers = {
            1: '', // Add correct answer
            2: '',
            3: '',
            4: '',
            5: '',
            6: ''
        };
        
        if (answer.toLowerCase() === correctAnswers[memory.id]?.toLowerCase()) {
            unlockMemory(memory, cardElement);
        } else {
            showNotification('Resposta incorreta. Tente novamente!', 'error');
            memoriesState.currentAttempts++;
            checkAttempts();
        }
    }
}

function showRiddleChallenge(memory, cardElement) {
    const riddles = {
        1: 'Dois olhos se encontraram e o tempo parou. Qual é este momento?',
        2: 'Nos lábios, a promessa de um futuro juntos. Qual é este gesto?',
        3: 'Novos horizontes à espera. Para onde vamos?',
        4: 'Sob as estrelas, batemos no mesmo ritmo. O que é?',
        5: 'Alegria em sua forma mais pura, compartilhada entre dois. O que é?',
        6: 'O segredo que guarda nosso maior amor...'
    };
    
    const answer = prompt(`Charada: ${riddles[memory.id] || 'Uma charada sobre nossa história'}`);
    
    if (answer) {
        // Always accept for riddles (more flexible)
        if (answer.trim().length > 0) {
            unlockMemory(memory, cardElement);
        }
    }
}

function showMemoryMiniGame(memory, cardElement) {
    // Simple memory game: remember the sequence
    const sequence = ['❤️', '💕', '💖', '💗', '💝'];
    const gameSequence = [];
    const playerSequence = [];
    
    // Show 3 cards randomly
    for (let i = 0; i < 3; i++) {
        gameSequence.push(sequence[Math.floor(Math.random() * sequence.length)]);
    }
    
    // Show sequence
    showSequence(gameSequence);
    
    function showSequence(seq) {
        let delay = 500;
        seq.forEach((item, index) => {
            setTimeout(() => {
                const modal = document.createElement('div');
                modal.style.cssText = `
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    font-size: 80px;
                    z-index: 1000;
                    animation: pulse 0.5s ease-out;
                `;
                modal.textContent = item;
                document.body.appendChild(modal);
                setTimeout(() => modal.remove(), 500);
            }, delay + (index * 600));
        });
        
        // After showing sequence, ask player to remember
        setTimeout(() => {
            const remember = prompt(
                `Lembre-se da sequência mostrada:\n${gameSequence.join(' ')}\n\nDigite os símbolos na mesma ordem`
            );
            
            if (remember) {
                if (remember.trim() === gameSequence.join('')) {
                    unlockMemory(memory, cardElement);
                } else {
                    showNotification('Sequência incorreta. Tente novamente!', 'error');
                    memoriesState.currentAttempts++;
                    checkAttempts();
                }
            }
        }, gameSequence.length * 600 + 500);
    }
}

// ==============================================
// UNLOCK MEMORY
// ==============================================

function unlockMemory(memory, cardElement) {
    if (!memoriesState.collected.includes(memory.id)) {
        memoriesState.collected.push(memory.id);
        saveMemoriesState();
        
        // Animate unlock
        cardElement.style.animation = 'pulse 0.6s ease-out';
        
        setTimeout(() => {
            cardElement.classList.remove('locked');
            cardElement.classList.add('unlocked');
            
            const content = cardElement.querySelector('.memory-content');
            content.innerHTML = `
                <div>${memory.emoji}</div>
                <p class="memory-title">${memory.title}</p>
            `;
            
            showNotification(`Memória desbloqueada: ${memory.title}! 🎉`, 'success');
            updateMemoryProgress();
            showMemoryDetail(memory);
        }, 600);
    }
}

// ==============================================
// SHOW MEMORY DETAIL
// ==============================================

function showMemoryDetail(memory) {
    const detail = document.createElement('div');
    detail.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(15, 15, 31, 0.95);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 900;
        backdrop-filter: blur(5px);
        animation: fadeIn 0.3s ease-out;
    `;
    
    detail.innerHTML = `
        <div style="
            max-width: 500px;
            background: rgba(255, 107, 157, 0.1);
            border: 1px solid rgba(255, 107, 157, 0.3);
            border-radius: 12px;
            padding: 40px;
            text-align: center;
            animation: scaleIn 0.3s ease-out;
        ">
            <div style="font-size: 80px; margin-bottom: 20px;">${memory.emoji}</div>
            <h2 style="font-size: 28px; margin-bottom: 15px; color: #ff6b9d;">${memory.title}</h2>
            <p style="font-size: 16px; color: #b0b0c8; line-height: 1.8; margin-bottom: 30px;">
                ${memory.description}
            </p>
            ${memory.isSecret ? '<p style="color: #fbbf24; font-style: italic; margin-bottom: 20px;">⭐ Esta é uma memória secreta!</p>' : ''}
            <button onclick="this.parentElement.parentElement.remove()" style="
                padding: 12px 40px;
                background: linear-gradient(135deg, #ff6b9d, #c44569);
                color: white;
                border: none;
                border-radius: 50px;
                cursor: pointer;
                font-weight: 600;
                font-size: 14px;
                transition: all 0.3s ease;
            " onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
                Fechar
            </button>
        </div>
    `;
    
    detail.addEventListener('click', function(e) {
        if (e.target === this) {
            this.remove();
        }
    });
    
    document.body.appendChild(detail);
}

// ==============================================
// UPDATE PROGRESS
// ==============================================

function updateMemoryProgress() {
    const collected = memoriesState.collected.length;
    const total = memoriesData.length;
    const percentage = (collected / total) * 100;
    
    const progressFill = document.getElementById('memoryProgress');
    const progressText = document.getElementById('memoriesFound');
    
    if (progressFill) {
        progressFill.style.width = percentage + '%';
    }
    if (progressText) {
        progressText.textContent = collected;
    }
    
    // Check if all memories collected
    if (collected === total) {
        showNotification('🎉 Todas as memórias foram desbloqueadas!', 'success');
        saveProgress('allMemoriesUnlocked', true);
    }
}

function checkAttempts() {
    if (memoriesState.currentAttempts >= memoriesState.maxAttempts) {
        showNotification(
            'Você atingiu o limite de tentativas. Tente novamente mais tarde.',
            'error'
        );
        // Could add cooldown here
    }
}

// ==============================================
// EXPORT FUNCTIONS
// ==============================================

window.initializeMemories = initializeMemories;
window.unlockMemory = unlockMemory;
