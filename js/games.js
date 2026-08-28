/* ==============================================
   NOSSA HISTÓRIA - GAMES MODULE
   Memory Game, Puzzle, Hearts Rain
   ============================================== */

let gameState = {
    currentGame: null,
    memoryCards: [],
    memoryFlipped: [],
    memoryMatched: [],
    attempts: 0,
    puzzleBoard: [],
    heartsCollected: 0
};

// ==============================================
// GAME INITIALIZATION
// ==============================================

function startGame(gameType) {
    closeGame();
    gameState.currentGame = gameType;
    
    const gameContainer = document.getElementById(gameType + 'Game');
    if (gameContainer) {
        gameContainer.classList.remove('hidden');
        gameContainer.classList.add('active');
    }
    
    switch(gameType) {
        case 'memory':
            initMemoryGame();
            break;
        case 'puzzle':
            initPuzzleGame();
            break;
        case 'hearts':
            initHeartsGame();
            break;
    }
}

function closeGame() {
    const containers = document.querySelectorAll('.game-container');
    containers.forEach(container => {
        container.classList.remove('active');
        container.classList.add('hidden');
    });
}

window.startGame = startGame;
window.closeGame = closeGame;

// ==============================================
// MEMORY GAME (Match Pairs)
// ==============================================

function initMemoryGame() {
    const board = document.getElementById('memoryBoard');
    board.innerHTML = '';
    
    gameState.memoryCards = [];
    gameState.memoryFlipped = [];
    gameState.memoryMatched = [];
    gameState.attempts = 0;
    
    // Create pairs (8 pairs = 16 tiles)
    const icons = ['❤️', '💕', '💖', '💗', '💝', '💘', '💞', '💓'];
    const cards = [...icons, ...icons];
    
    // Shuffle
    cards.sort(() => 0.5 - Math.random());
    
    // Create tiles
    cards.forEach((icon, index) => {
        const tile = document.createElement('div');
        tile.className = 'memory-tile';
        tile.dataset.icon = icon;
        tile.dataset.index = index;
        tile.textContent = '?';
        
        tile.addEventListener('click', () => flipMemoryTile(tile, index));
        
        board.appendChild(tile);
        gameState.memoryCards.push({ icon, index, element: tile });
    });
    
    updateAttempts();
}

function flipMemoryTile(tile, index) {
    if (gameState.memoryFlipped.length >= 2) return;
    if (gameState.memoryFlipped.includes(index)) return;
    if (gameState.memoryMatched.includes(index)) return;
    
    tile.classList.add('flipped');
    tile.textContent = tile.dataset.icon;
    gameState.memoryFlipped.push(index);
    
    if (gameState.memoryFlipped.length === 2) {
        checkMemoryMatch();
    }
}

function checkMemoryMatch() {
    gameState.attempts++;
    updateAttempts();
    
    const [first, second] = gameState.memoryFlipped;
    const firstCard = gameState.memoryCards[first];
    const secondCard = gameState.memoryCards[second];
    
    if (firstCard.icon === secondCard.icon) {
        // Match!
        firstCard.element.classList.add('matched');
        secondCard.element.classList.add('matched');
        gameState.memoryMatched.push(first, second);
        
        showNotification('Par encontrado! ❤️', 'success');
        gameState.memoryFlipped = [];
        
        // Check win
        if (gameState.memoryMatched.length === gameState.memoryCards.length) {
            setTimeout(() => {
                showNotification(`🎉 Você venceu em ${gameState.attempts} tentativas!`, 'success');
                saveProgress('memoryGameWon', true);
            }, 300);
        }
    } else {
        // No match
        setTimeout(() => {
            firstCard.element.classList.remove('flipped');
            secondCard.element.classList.remove('flipped');
            firstCard.element.textContent = '?';
            secondCard.element.textContent = '?';
            gameState.memoryFlipped = [];
        }, 800);
    }
}

function updateAttempts() {
    const attemptsEl = document.getElementById('attempts');
    if (attemptsEl) {
        attemptsEl.textContent = gameState.attempts;
    }
}

// ==============================================
// PUZZLE GAME (3x3)
// ==============================================

function initPuzzleGame() {
    const board = document.getElementById('puzzleBoard');
    const preview = document.getElementById('puzzlePreview');
    
    board.innerHTML = '';
    preview.innerHTML = '';
    
    gameState.puzzleBoard = Array(9).fill(null);
    
    // Create 9 slots on board
    for (let i = 0; i < 9; i++) {
        const slot = document.createElement('div');
        slot.className = 'puzzle-slot';
        slot.id = 'slot-' + i;
        slot.dataset.slotIndex = i;
        
        // Drag over
        slot.addEventListener('dragover', (e) => e.preventDefault());
        slot.addEventListener('drop', (e) => dropPuzzlePiece(e, i));
        
        board.appendChild(slot);
    }
    
    // Create pieces to solve (emoji puzzle)
    const puzzleEmojis = ['❤️', '💕', '💖', '💗', '💝', '💘', '💞', '💓', '✨'];
    
    puzzleEmojis.forEach((emoji, index) => {
        const piece = document.createElement('div');
        piece.className = 'puzzle-piece';
        piece.textContent = emoji;
        piece.draggable = true;
        piece.dataset.pieceIndex = index;
        
        piece.addEventListener('dragstart', (e) => {
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('pieceIndex', index);
        });
        
        preview.appendChild(piece);
    });
    
    // Show preview pattern
    const patternPreview = document.createElement('div');
    patternPreview.style.cssText = 'font-size: 60px; grid-column: 1/-1; text-align: center;';
    patternPreview.innerHTML = puzzleEmojis.join(' ');
    preview.insertBefore(patternPreview, preview.firstChild);
}

function dropPuzzlePiece(e, slotIndex) {
    e.preventDefault();
    const pieceIndex = parseInt(e.dataTransfer.getData('pieceIndex'));
    
    const slot = document.getElementById('slot-' + slotIndex);
    const emoji = ['❤️', '💕', '💖', '💗', '💝', '💘', '💞', '💓', '✨'][pieceIndex];
    
    if (!slot.innerHTML) {
        slot.innerHTML = emoji;
        slot.classList.add('filled');
        gameState.puzzleBoard[slotIndex] = pieceIndex;
        
        // Check if puzzle complete
        if (gameState.puzzleBoard.every(item => item !== null)) {
            showNotification('🎉 Puzzle completado!', 'success');
            saveProgress('puzzleWon', true);
        }
    }
}

function resetPuzzle() {
    initPuzzleGame();
}

window.resetPuzzle = resetPuzzle;

// ==============================================
// HEARTS RAIN GAME
// ==============================================

function initHeartsGame() {
    const container = document.getElementById('heartsContainer');
    container.innerHTML = '';
    
    gameState.heartsCollected = 0;
    updateHeartsCount();
    
    // Create 15 falling hearts
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            createFallingHeart(container);
        }, i * 200);
    }
}

function createFallingHeart(container) {
    const heart = document.createElement('div');
    heart.className = 'heart-falling';
    heart.textContent = '❤️';
    
    const randomLeft = Math.random() * (window.innerWidth - 40);
    const duration = 3 + Math.random() * 2; // 3-5 seconds
    
    heart.style.left = randomLeft + 'px';
    heart.style.top = '-50px';
    heart.style.animationDuration = duration + 's';
    
    // Click to collect
    heart.addEventListener('click', (e) => {
        e.stopPropagation();
        collectHeart(heart);
    });
    
    // Mobile touch
    heart.addEventListener('touchstart', (e) => {
        e.stopPropagation();
        collectHeart(heart);
    });
    
    container.appendChild(heart);
    
    // Remove after animation
    setTimeout(() => {
        if (heart.parentElement) {
            heart.remove();
        }
    }, (duration * 1000) + 500);
}

function collectHeart(heartElement) {
    gameState.heartsCollected++;
    updateHeartsCount();
    
    // Animate removal
    heartElement.style.animation = 'pulse 0.3s ease-out';
    setTimeout(() => {
        heartElement.style.opacity = '0';
        setTimeout(() => heartElement.remove(), 300);
    }, 300);
    
    if (gameState.heartsCollected === 15) {
        showNotification('🎉 Todos os corações foram coletados!', 'success');
        saveProgress('heartsGameWon', true);
    }
}

function updateHeartsCount() {
    const counter = document.getElementById('heartsCollected');
    if (counter) {
        counter.textContent = gameState.heartsCollected;
    }
}

// ==============================================
// EXPORT FUNCTIONS
// ==============================================

window.initMemoryGame = initMemoryGame;
window.initPuzzleGame = initPuzzleGame;
window.initHeartsGame = initHeartsGame;
window.checkMemoryMatch = checkMemoryMatch;
window.dropPuzzlePiece = dropPuzzlePiece;
