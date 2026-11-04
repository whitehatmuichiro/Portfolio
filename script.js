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
