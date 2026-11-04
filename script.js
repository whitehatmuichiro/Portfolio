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

// Mouse-follow tilt effect
const card = document.getElementById('nametagCard');
const profileImg = document.getElementById('profileImg');

if (card) {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;
    
    card.style.transform = `
      perspective(1000px) 
      rotateX(${rotateX}deg) 
      rotateY(${rotateY}deg)
      translateY(0)
    `;
    
    // Subtle independent photo movement
    if (profileImg) {
      const moveX = (x - centerX) / 25;
      const moveY = (y - centerY) / 25;
      profileImg.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
    }
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    if (profileImg) {
      profileImg.style.transform = 'translate(0, 0) scale(1)';
    }
  });
}
