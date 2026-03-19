// =============================================
//   DIMUTHU PRABODHA — Portfolio Script v2.0
// =============================================

// --- AOS Init ---
AOS.init({ duration: 800, once: true });

// =============================================
// 1. SCROLL PROGRESS BAR
// =============================================
const scrollBar = document.getElementById('scroll-bar');
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const pct = (scrolled / maxScroll) * 100;
    if (scrollBar) scrollBar.style.width = pct + '%';
});

// =============================================
// 2. ACTIVE NAV LINK (IntersectionObserver)
// =============================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

sections.forEach(s => navObserver.observe(s));

// =============================================
// 3. VIBE TOGGLE (Engineer ↔ Artist)
// =============================================
const themeBtn = document.getElementById('theme-toggle');
if (themeBtn) {
    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('artist-mode');
        const isArtist = document.body.classList.contains('artist-mode');
        themeBtn.innerHTML = isArtist
            ? '<i class="fas fa-microchip"></i>'
            : '<i class="fas fa-mask"></i>';
    });
}

// =============================================
// 4. IOT TELEMETRY SIMULATOR
// =============================================
function updateIOT() {
    const temp = (27 + Math.random() * 3).toFixed(1);
    const uptime = new Date().toTimeString().split(' ')[0];
    const tempEl = document.getElementById('live-temp');
    const uptimeEl = document.getElementById('uptime');
    if (tempEl) tempEl.innerText = temp;
    if (uptimeEl) uptimeEl.innerText = uptime;
}
setInterval(updateIOT, 1000);

// =============================================
// 5. TYPEWRITER EFFECT
// =============================================
const phrases = [
    "Mechatronics Engineer",
    "IoT Specialist",
    "ROS Developer",
    "Drama Artist",
    "Embedded Systems Dev",
    "Dramatist & Scriptwriter"
];
let i = 0, j = 0, isDeleting = false;
const typeTarget = document.getElementById('typewriter');

function loopTyping() {
    if (!typeTarget) return;
    const current = phrases[i];
    if (isDeleting) {
        typeTarget.innerText = current.substring(0, j--);
    } else {
        typeTarget.innerText = current.substring(0, j++);
    }
    let speed = isDeleting ? 45 : 90;
    if (!isDeleting && j > current.length) {
        speed = 2000;
        isDeleting = true;
        j = current.length;
    } else if (isDeleting && j === 0) {
        isDeleting = false;
        i = (i + 1) % phrases.length;
        speed = 400;
    }
    setTimeout(loopTyping, speed);
}
document.addEventListener('DOMContentLoaded', loopTyping);

// =============================================
// 6. MOBILE MENU TOGGLE
// =============================================
const toggleBtn = document.querySelector('.mobile-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

if (toggleBtn && mobileMenu) {
    toggleBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        toggleBtn.innerHTML = mobileMenu.classList.contains('active')
            ? '<i class="fas fa-times"></i>'
            : '<i class="fas fa-bars"></i>';
    });
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            toggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
}

// =============================================
// 7. SKILL BAR ANIMATION (IntersectionObserver)
// =============================================
const skillSection = document.getElementById('skills');
let skillsAnimated = false;

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !skillsAnimated) {
            skillsAnimated = true;
            document.querySelectorAll('.skill-bar-fill').forEach(bar => {
                const target = bar.getAttribute('data-width') + '%';
                // Slight delay so CSS transition fires after style change
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        bar.style.width = target;
                    });
                });
            });
        }
    });
}, { threshold: 0.25 });

if (skillSection) skillObserver.observe(skillSection);

// =============================================
// 8. GALLERY LIGHTBOX
// =============================================
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxNext = document.getElementById('lightbox-next');

const galleryImages = Array.from(galleryItems).map(item => ({
    src: item.querySelector('img').src,
    alt: item.querySelector('img').alt,
}));

let currentLightboxIndex = 0;

function openLightbox(index) {
    currentLightboxIndex = index;
    lightboxImg.src = galleryImages[index].src;
    lightboxImg.alt = galleryImages[index].alt;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function showLightboxImage(index) {
    currentLightboxIndex = (index + galleryImages.length) % galleryImages.length;
    lightboxImg.src = galleryImages[currentLightboxIndex].src;
    lightboxImg.alt = galleryImages[currentLightboxIndex].alt;
}

galleryItems.forEach((item, idx) => {
    item.addEventListener('click', () => openLightbox(idx));
});

if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
if (lightboxPrev) lightboxPrev.addEventListener('click', () => showLightboxImage(currentLightboxIndex - 1));
if (lightboxNext) lightboxNext.addEventListener('click', () => showLightboxImage(currentLightboxIndex + 1));

// Close on backdrop click
if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!lightbox || !lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showLightboxImage(currentLightboxIndex - 1);
    if (e.key === 'ArrowRight') showLightboxImage(currentLightboxIndex + 1);
});

// =============================================
// 9. CONTACT FORM HANDLER
// =============================================
function handleFormSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('form-name').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const msg = document.getElementById('form-msg').value.trim();
    const status = document.getElementById('form-status');

    if (!name || !email || !msg) return;

    // Simulate sending (opens mailto as fallback)
    status.innerHTML = '<span style="color: var(--primary)">⟳ Transmitting...</span>';
    setTimeout(() => {
        window.location.href =
            `mailto:dimuthupraboda14@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(msg)}%0A%0AFrom: ${encodeURIComponent(email)}`;
        status.innerHTML = '✔ Message launched. I\'ll get back to you soon!';
        document.getElementById('contact-form').reset();
    }, 900);
}

// =============================================
// 10. PARTICLES.JS CONFIG
// =============================================
if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
        particles: {
            number: { value: 55, density: { enable: true, value_area: 900 } },
            color: { value: '#00f3ff' },
            shape: { type: 'circle' },
            opacity: { value: 0.35, random: true },
            size: { value: 2, random: true },
            line_linked: {
                enable: true,
                distance: 140,
                color: '#00f3ff',
                opacity: 0.08,
                width: 1
            },
            move: {
                enable: true, speed: 0.8, direction: 'none',
                random: true, straight: false, out_mode: 'out'
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: { enable: true, mode: 'grab' },
                onclick: { enable: false }
            },
            modes: {
                grab: { distance: 120, line_linked: { opacity: 0.15 } }
            }
        },
        retina_detect: true
    });
}

// =============================================
// 11. ANIMATED BLINKING EYE FAVICON
// =============================================
const faviconCanvas = document.createElement('canvas');
const faviconCtx = faviconCanvas.getContext('2d');
const faviconLink = document.getElementById('dynamic-favicon');

faviconCanvas.width = 32;
faviconCanvas.height = 32;

let eyeState = 'OPEN';
let eyeHeight = 14;
let blinkSpeed = 2;
let pupilOffset = 0;
let pupilDirection = 0.5;

function drawFavicon() {
    faviconCtx.clearRect(0, 0, 32, 32);
    faviconCtx.fillStyle = '#0a0b10';
    faviconCtx.fillRect(0, 0, 32, 32);

    if (eyeState === 'CLOSING') {
        eyeHeight -= blinkSpeed;
        if (eyeHeight <= 2) { eyeHeight = 2; eyeState = 'OPENING'; }
    } else if (eyeState === 'OPENING') {
        eyeHeight += blinkSpeed;
        if (eyeHeight >= 14) {
            eyeHeight = 14; eyeState = 'OPEN';
            setTimeout(() => { eyeState = 'CLOSING'; }, Math.random() * 4000 + 2000);
        }
    }
    if (eyeState === 'OPEN') {
        pupilOffset += pupilDirection;
        if (pupilOffset > 5 || pupilOffset < -5) pupilDirection *= -1;
    }

    const cx = 16, cy = 16;
    faviconCtx.strokeStyle = '#00f3ff';
    faviconCtx.lineWidth = 2;
    faviconCtx.beginPath();
    faviconCtx.ellipse(cx, cy, 14, eyeHeight, 0, 0, Math.PI * 2);
    faviconCtx.stroke();

    if (eyeHeight > 4) {
        faviconCtx.fillStyle = '#00f3ff';
        faviconCtx.beginPath();
        faviconCtx.arc(cx + pupilOffset, cy, 3, 0, Math.PI * 2);
        faviconCtx.fill();
    }

    if (faviconLink) faviconLink.href = faviconCanvas.toDataURL('image/png');
    requestAnimationFrame(drawFavicon);
}

drawFavicon();
setTimeout(() => { eyeState = 'CLOSING'; }, 2000);