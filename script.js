// DOM Elements
const frontPage = document.getElementById('front-page');
const mainContent = document.getElementById('main-content');
const envelope = document.querySelector('.envelope');
const envelopeFront = document.querySelector('.envelope-front');
const letter = document.querySelector('.letter');
const openBtn = document.querySelector('.open-btn');
const backBtn = document.querySelector('.back-btn');

// Create confetti effect
function createConfetti() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeead'];
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * window.innerWidth + 'px';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.width = (Math.random() * 10 + 5) + 'px';
    confetti.style.height = confetti.style.width;
    confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
    document.body.appendChild(confetti);
    
    // Remove confetti after animation
    setTimeout(() => {
        confetti.remove();
    }, 5000);
}

// Open envelope and show message
function openEnvelope() {
    // Disable further clicks while animating
    envelope.style.pointerEvents = 'none';
    
    // Animate envelope opening
    envelopeFront.style.transform = 'rotateX(180deg)';
    letter.style.opacity = '1';
    letter.style.transform = 'translate(-50%, -50%) scale(1.1)';
    
    // After animation, show main content
    setTimeout(() => {
        frontPage.style.display = 'none';
        mainContent.style.display = 'block';
        
        // Create initial confetti
        for (let i = 0; i < 50; i++) {
            setTimeout(createConfetti, i * 100);
        }
        
        // Re-enable clicks
        envelope.style.pointerEvents = 'auto';
    }, 1500);
}

// Go back to front page
function goBack() {
    mainContent.style.display = 'none';
    frontPage.style.display = 'flex';
    
    // Reset envelope animation
    setTimeout(() => {
        envelopeFront.style.transform = 'rotateX(0deg)';
        letter.style.transform = 'translateY(0) scale(0.9)';
        letter.style.opacity = '0';
    }, 300);
}

// Check if device is mobile
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Show letter after a short delay for better UX
    setTimeout(() => {
        letter.style.opacity = '1';
    }, 500);
    
    // Add touch/click event for envelope
    if (isMobile) {
        // For mobile - use touch events
        envelope.addEventListener('touchstart', handleTouchStart, { passive: true });
        envelope.addEventListener('touchend', handleTouchEnd, { passive: true });
    } else {
        // For desktop - use click event
        envelope.addEventListener('click', openEnvelope);
    }
    
    // Handle open button
    if (openBtn) {
        openBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            openEnvelope();
        });
        
        // Add touch events for mobile
        if (isMobile) {
            openBtn.addEventListener('touchend', (e) => {
                e.stopPropagation();
                openEnvelope();
            }, { passive: true });
        }
    }
    
    // Back button
    if (backBtn) {
        backBtn.addEventListener('click', goBack);
        
        // Add touch events for mobile
        if (isMobile) {
            backBtn.addEventListener('touchend', goBack, { passive: true });
        }
    }
});

// Touch handling for mobile
event = null;
function handleTouchStart(e) {
    event = e;
}

function handleTouchEnd(e) {
    // Only proceed if touch ended in the same element it started
    if (event && event.target === e.target) {
        e.preventDefault();
        openEnvelope();
    }
}

// Prevent scrolling when touching the envelope
envelope.addEventListener('touchmove', (e) => {
    e.preventDefault();
}, { passive: false });

// Add more confetti on tap/click on main content
const handleMainContentTap = () => {
    for (let i = 0; i < 10; i++) {
        setTimeout(createConfetti, i * 50);
    }
};

// Add both click and touch events for main content
mainContent.addEventListener('click', handleMainContentTap);
mainContent.addEventListener('touchend', handleMainContentTap, { passive: true });
