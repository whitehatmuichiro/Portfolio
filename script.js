// Smooth scrolling
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' });
    });
});

// Glowing red lights on scroll
const body = document.body;
const windowHeight = window.innerHeight;

function updateGlowEffects() {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - windowHeight;
    
    // Top red glow — appears when you scroll UP / near top
    if (scrollY < 150) {
        body.classList.add('glow-top-visible');
    } else {
        body.classList.remove('glow-top-visible');
    }
    
    // Bottom red glow — appears when you scroll DOWN / near bottom
    if (scrollY + windowHeight > docHeight - 150) {
        body.classList.add('glow-bottom-visible');
    } else {
        body.classList.remove('glow-bottom-visible');
    }
}

// Run on load + every scroll
window.addEventListener('scroll', updateGlowEffects);
window.addEventListener('load', updateGlowEffects);

// Fade-in animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.section, .skill-card, .achievement-card, .leadership-card, .learning-category').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// === Lanyard ID Card Tilt ===
const idCard = document.getElementById('idCard');
const profileImg = document.getElementById('profileImg');

if (idCard) {
  idCard.addEventListener('mousemove', (e) => {
    const rect = idCard.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / -25;
    const rotateY = (x - centerX) / 25;

    idCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  idCard.addEventListener('mouseleave', () => {
    idCard.style.transform = '';
  });
}

// === Global Red Glow - Mouse & Touch ===
const globalGlow = document.querySelector('.global-glow');

if (globalGlow) {
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;
  let isMoving = false;
  let moveTimer;

  function updateGlow(x, y) {
    mouseX = x;
    mouseY = y;
    isMoving = true;
    globalGlow.style.opacity = '1';

    clearTimeout(moveTimer);
    moveTimer = setTimeout(() => {
      isMoving = false;
    }, 120);
  }

  function animateGlow() {
    const ease = 0.12;

    currentX += (mouseX - currentX) * ease;
    currentY += (mouseY - currentY) * ease;

    globalGlow.style.transform = `translate(-50%, -50%) translate(${currentX}px, ${currentY}px)`;

    if (!isMoving) {
      globalGlow.style.opacity = '0';
    }

    requestAnimationFrame(animateGlow);
  }

  // Mouse
  window.addEventListener('mousemove', (e) => {
    updateGlow(e.clientX, e.clientY);
  });

  // Touch
  window.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    updateGlow(touch.clientX, touch.clientY);
  });

  // Touch start
  window.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    updateGlow(touch.clientX, touch.clientY);
  });

  // Mouse leave window
  window.addEventListener('mouseleave', () => {
    globalGlow.style.opacity = '0';
  });

  // Touch end
  window.addEventListener('touchend', () => {
    globalGlow.style.opacity = '0';
  });

  animateGlow();
}



