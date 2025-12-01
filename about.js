// About Page JavaScript
// Subtle animations and interactions

document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initTimelineGlow();
    initValuesCarousel();
});

// Scroll-triggered fade-in animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Animate sections on scroll
    const animatedElements = document.querySelectorAll(`
        .vision-split,
        .timeline-item,
        .value-card,
        .layer-panel,
        .team-member,
        .tech-block,
        .pillar,
        .cta-panel
    `);

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Timeline glow effect on scroll
function initTimelineGlow() {
    const timelineItems = document.querySelectorAll('.timeline-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const year = entry.target.querySelector('.timeline-year');
                if (year) {
                    year.style.textShadow = '0 0 30px rgba(35, 243, 155, 0.6)';
                    setTimeout(() => {
                        year.style.textShadow = 'none';
                    }, 1000);
                }
            }
        });
    }, { threshold: 0.5 });

    timelineItems.forEach(item => observer.observe(item));
}

// Values carousel smooth scrolling
function initValuesCarousel() {
    const carousel = document.querySelector('.values-carousel');
    if (!carousel) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    carousel.addEventListener('mousedown', (e) => {
        isDown = true;
        carousel.style.cursor = 'grabbing';
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
    });

    carousel.addEventListener('mouseleave', () => {
        isDown = false;
        carousel.style.cursor = 'grab';
    });

    carousel.addEventListener('mouseup', () => {
        isDown = false;
        carousel.style.cursor = 'grab';
    });

    carousel.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * 2;
        carousel.scrollLeft = scrollLeft - walk;
    });

    // Set initial cursor
    carousel.style.cursor = 'grab';
}

// Parallax effect for hero glow
window.addEventListener('scroll', () => {
    const heroGlow = document.querySelector('.hero-glow');
    if (heroGlow) {
        const scrolled = window.pageYOffset;
        heroGlow.style.transform = `translate(-50%, calc(-50% + ${scrolled * 0.3}px))`;
    }

    const pillarsGlow = document.querySelector('.pillars-glow');
    if (pillarsGlow) {
        const scrolled = window.pageYOffset;
        const pillarsSection = document.querySelector('.pillars-section');
        if (pillarsSection) {
            const rect = pillarsSection.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                pillarsGlow.style.transform = `translate(-50%, calc(-50% + ${scrolled * 0.2}px))`;
            }
        }
    }
});
