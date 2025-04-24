// Gestion des animations au scroll
document.addEventListener('DOMContentLoaded', () => {
    // Configuration de l'Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observer toutes les sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Animation du menu mobile
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuButton && navLinks) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenuButton.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Animation des liens de navigation
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Animation de défilement fluide
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Animation des boutons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.classList.add('hover');
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.classList.remove('hover');
        });
    });
});

// Gestion du cache
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('ServiceWorker enregistré avec succès:', registration);
            })
            .catch(error => {
                console.log('Erreur lors de l\'enregistrement du ServiceWorker:', error);
            });
    });
} 