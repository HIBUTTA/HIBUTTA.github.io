// Init Animation Library
AOS.init({ duration: 800, once: true });

// --- TYPEWRITER EFFECT (FIXED) ---
const phrases = ["Mechatronics Engineer", "IoT Specialist", "Drama Artist"];
let i = 0, j = 0, isDeleting = false;
const target = document.getElementById('typewriter');

function loopTyping() {
    const current = phrases[i];
    
    if (isDeleting) {
        // Deleting: Reduce j
        target.innerText = current.substring(0, j--);
    } else {
        // Typing: Increase j
        target.innerText = current.substring(0, j++);
    }

    let speed = isDeleting ? 50 : 100;

    // FIX: Wait until j is GREATER than length so the full word is visible during the pause
    if (!isDeleting && j > current.length) {
        speed = 2000; // Pause for 2 seconds on the FULL word
        isDeleting = true;
        j = current.length; // Reset j to length so deletion starts correctly
    } else if (isDeleting && j === 0) {
        isDeleting = false;
        i = (i + 1) % phrases.length;
        speed = 500; // Brief pause before typing next word
    }
    
    setTimeout(loopTyping, speed);
}
document.addEventListener('DOMContentLoaded', loopTyping);

// --- MOBILE MENU TOGGLE ---
const toggleBtn = document.querySelector('.mobile-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const links = document.querySelectorAll('.mobile-link');

if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        toggleBtn.innerHTML = mobileMenu.classList.contains('active') ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            toggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
}

// --- ANIMATED BLINKING EYE FAVICON ---
const faviconCanvas = document.createElement('canvas');
const faviconCtx = faviconCanvas.getContext('2d');
const faviconLink = document.getElementById('dynamic-favicon'); // Ensure your HTML link has this ID

// Set canvas size (standard favicon size)
faviconCanvas.width = 32;
faviconCanvas.height = 32;

let eyeState = 'OPEN'; // States: OPEN, CLOSING, OPENING, CLOSED
let eyeHeight = 14;    // Height of the eye opening (max 14)
let blinkSpeed = 2;    // How fast it blinks
let pupilOffset = 0;   // Pupil X position
let pupilDirection = 0.5;

function drawFavicon() {
    // Clear canvas
    faviconCtx.clearRect(0, 0, 32, 32);
    
    // Fill background (matches site bg)
    faviconCtx.fillStyle = '#0a0b10';
    faviconCtx.fillRect(0, 0, 32, 32);

    // --- BLINK LOGIC ---
    if (eyeState === 'CLOSING') {
        eyeHeight -= blinkSpeed;
        if (eyeHeight <= 2) {
            eyeHeight = 2;
            eyeState = 'OPENING';
        }
    } else if (eyeState === 'OPENING') {
        eyeHeight += blinkSpeed;
        if (eyeHeight >= 14) {
            eyeHeight = 14;
            eyeState = 'OPEN';
            // Schedule next random blink (2 to 6 seconds)
            setTimeout(() => { eyeState = 'CLOSING'; }, Math.random() * 4000 + 2000);
        }
    }

    // --- PUPIL MOVEMENT ---
    if (eyeState === 'OPEN') {
        pupilOffset += pupilDirection;
        // Bounce pupil left and right
        if (pupilOffset > 5 || pupilOffset < -5) pupilDirection *= -1;
    }

    const cx = 16;
    const cy = 16;

    // Draw Eye Outline (Cyan)
    faviconCtx.strokeStyle = '#00f3ff';
    faviconCtx.lineWidth = 2;
    faviconCtx.beginPath();
    // The height changes to simulate blinking
    faviconCtx.ellipse(cx, cy, 14, eyeHeight, 0, 0, Math.PI * 2);
    faviconCtx.stroke();

    // Draw Pupil (Only visible if eye is open)
    if (eyeHeight > 4) {
        faviconCtx.fillStyle = '#00f3ff';
        faviconCtx.beginPath();
        faviconCtx.arc(cx + pupilOffset, cy, 3, 0, Math.PI * 2);
        faviconCtx.fill();
    }

    // Update Browser Tab Icon
    if (faviconLink) {
        faviconLink.href = faviconCanvas.toDataURL('image/png');
    }

    // Loop animation
    requestAnimationFrame(drawFavicon);
}

// Start Animation
drawFavicon();

// Trigger first blink quickly so you see it working
setTimeout(() => { eyeState = 'CLOSING'; }, 2000);