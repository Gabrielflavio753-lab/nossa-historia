/* ==============================================
   NOSSA HISTÓRIA - MAIN JAVASCRIPT
   Core Navigation & Scene Management
   ============================================== */

// ==============================================
// INITIALIZATION
// ==============================================

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Set up keyboard shortcuts
    setupKeyboardShortcuts();
    
    // Set up audio
    setupAudio();
    
    // Load saved progress
    loadProgress();
    
    // Hide loading screen after delay
    setTimeout(() => {
        document.getElementById('loadingScreen').classList.add('hidden');
        document.getElementById('mainContainer').classList.remove('hidden');
    }, 1500);
    
    // Setup opening scene
    setupOpeningScene();
}

// ==============================================
// KEYBOARD SHORTCUTS
// ==============================================

function setupKeyboardShortcuts() {
    document.addEventListener('keydown', function(event) {
        // ESC key: Skip opening or close modal
        if (event.key === 'Escape') {
            const openingScene = document.getElementById('openingScene');
            if (openingScene.classList.contains('active')) {
                skipOpening();
            }
        }
    });
}

// ==============================================
// AUDIO MANAGEMENT
// ==============================================

function setupAudio() {
    const bgMusic = document.getElementById('bgMusic');
    const musicBtn = document.getElementById('musicToggle');
    
    // Get saved audio preference
    const audioEnabled = localStorage.getItem('audioEnabled') !== 'false';
    
    if (audioEnabled) {
        bgMusic.volume = 0.3;
        musicBtn.classList.add('playing');
    } else {
        bgMusic.muted = true;
    }
    
    musicBtn.addEventListener('click', function() {
        const isMuted = bgMusic.muted;
        bgMusic.muted = !isMuted;
        musicBtn.classList.toggle('playing');
        localStorage.setItem('audioEnabled', !isMuted);
    });
}

// ==============================================
// OPENING SCENE
// ==============================================

function setupOpeningScene() {
    const startBtn = document.getElementById('startBtn');
    startBtn.addEventListener('click', skipOpening);
}

function skipOpening() {
    const openingScene = document.getElementById('openingScene');
    const chapterOne = document.getElementById('chapterOne');
    
    openingScene.classList.remove('active');
    setTimeout(() => {
        chapterOne.classList.add('active');
    }, 300);
}

// ==============================================
// SCENE NAVIGATION
// ==============================================

function navigateTo(sceneName) {
    // Hide all scenes
    const scenes = document.querySelectorAll('.scene');
    scenes.forEach(scene => {
        scene.classList.remove('active');
    });
    
    // Show target scene
    const targetScene = document.getElementById(sceneName);
    if (targetScene) {
        targetScene.classList.add('active');
        
        // Scroll to top
        window.scrollTo(0, 0);
        
        // Initialize scene-specific content
        initializeScene(sceneName);
    }
}

function goToMenu() {
    navigateTo('mainMenu');
}

function initializeScene(sceneName) {
    switch(sceneName) {
        case 'memories':
            initializeMemories();
            break;
        case 'quiz':
            initializeQuiz();
            break;
        case 'timer':
            initializeTimer();
            break;
        case 'diary':
            loadDiaryEntries();
            break;
        case 'gallery':
            loadGalleryPhotos();
            break;
        case 'letter':
            setupLetterAnimation();
            break;
    }
}

// ==============================================
// CHAPTER READING
// ==============================================

function readChapter(chapterNum) {
    // This function can be extended to show full chapter content
    console.log('Reading chapter', chapterNum);
    
    // Save progress
    let progress = JSON.parse(localStorage.getItem('progress')) || {};
    progress.lastChapter = chapterNum;
    localStorage.setItem('progress', JSON.stringify(progress));
}

// ==============================================
// PROGRESS MANAGEMENT
// ==============================================

function loadProgress() {
    const progress = JSON.parse(localStorage.getItem('progress')) || {};
    return progress;
}

function saveProgress(key, value) {
    let progress = JSON.parse(localStorage.getItem('progress')) || {};
    progress[key] = value;
    localStorage.setItem('progress', JSON.stringify(progress));
}

function getProgress(key) {
    const progress = JSON.parse(localStorage.getItem('progress')) || {};
    return progress[key];
}

// ==============================================
// UTILITY FUNCTIONS
// ==============================================

function getRandomColor() {
    const colors = ['#ff6b9d', '#c44569', '#fbbf24', '#10b981', '#7c3aed'];
    return colors[Math.floor(Math.random() * colors.length)];
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function calculateDaysBetween(date1, date2) {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const diffTime = Math.abs(d2 - d1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

// ==============================================
// LOCAL STORAGE HELPERS
// ==============================================

function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function loadData(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}

function clearData(key) {
    localStorage.removeItem(key);
}

// ==============================================
// ANIMATION HELPERS
// ==============================================

function addAnimation(element, animationName) {
    element.style.animation = `${animationName} 0.5s ease-out`;
    element.addEventListener('animationend', function() {
        element.style.animation = '';
    });
}

// ==============================================
// RESPONSIVE HELPERS
// ==============================================

function isMobile() {
    return window.innerWidth <= 768;
}

function isTablet() {
    return window.innerWidth > 768 && window.innerWidth <= 1024;
}

function isDesktop() {
    return window.innerWidth > 1024;
}

// ==============================================
// MODAL FUNCTIONS
// ==============================================

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        padding: 15px 25px;
        background: rgba(255, 107, 157, 0.9);
        color: white;
        border-radius: 8px;
        animation: slideUp 0.3s ease-out;
        z-index: 9999;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideDown 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ==============================================
// VAULT FUNCTIONALITY
// ==============================================

function checkVaultPassword() {
    const passwordInput = document.getElementById('vaultPassword');
    const vaultContent = document.getElementById('vaultContent');
    
    // [CONFIGURE THIS] Change to your desired password
    const correctPassword = 'love'; // Example password - change to your own
    
    const enteredPassword = passwordInput.value.toLowerCase().trim();
    
    if (enteredPassword === correctPassword) {
        vaultContent.classList.remove('hidden');
        passwordInput.disabled = true;
        document.querySelector('.vault-input-group button').disabled = true;
        showNotification('Cofre desbloqueado! ❤️', 'success');
        saveProgress('vaultUnlocked', true);
    } else {
        passwordInput.value = '';
        showNotification('Senha incorreta. Tente novamente.', 'error');
    }
}

// ==============================================
// EXPORT FUNCTIONS FOR OTHER MODULES
// ==============================================

// These functions are used by other JavaScript files
window.navigateTo = navigateTo;
window.goToMenu = goToMenu;
window.showNotification = showNotification;
window.saveProgress = saveProgress;
window.getProgress = getProgress;
window.loadProgress = loadProgress;
window.saveData = saveData;
window.loadData = loadData;
window.formatDate = formatDate;
window.calculateDaysBetween = calculateDaysBetween;
