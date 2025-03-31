// Cache des éléments DOM fréquemment utilisés
const header = document.querySelector('header');
const playerCountElement = document.getElementById('playerCount');
const connectCommandElement = document.getElementById('connectCommand');
const latestVideoContainer = document.getElementById('latestVideoContainer');
const navLinks = document.querySelector('.nav-links');
const mobileMenuButton = document.querySelector('.mobile-menu-button');

// Debounce function pour limiter les appels de fonction
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Animation du header au scroll avec debounce
window.addEventListener('scroll', debounce(() => {
    if (window.scrollY > 50) {
        header.style.backgroundColor = 'rgba(31, 41, 55, 0.95)';
    } else {
        header.style.backgroundColor = '#1f2937';
    }
}, 10));

// Gestion du menu mobile
if (mobileMenuButton) {
    mobileMenuButton.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuButton.innerHTML = navLinks.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
}

// Fermer le menu mobile lors du clic sur un lien
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Animation des cartes au scroll avec Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '50px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observer uniquement les éléments visibles
document.querySelectorAll('.stat-card, .streamer-card, .featured-streamer').forEach(card => {
    observer.observe(card);
});

// Gestion du menu mobile avec debounce
window.addEventListener('resize', debounce(() => {
    if (window.innerWidth > 768) {
        navLinks.classList.remove('active');
        mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
    }
}, 250));

// Smooth scroll optimisé avec passive event listener
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
}, { passive: false });

// Fonction pour mettre à jour le nombre de joueurs avec gestion d'erreur
async function updatePlayerCount() {
    try {
        const response = await fetch('php/playerCount.php');
        if (!response.ok) throw new Error('Erreur réseau');
        
        const data = await response.json();
        if (data.error) {
            playerCountElement.textContent = 'Erreur de connexion';
            return;
        }

        playerCountElement.textContent = `${data.players}/${data.max_players} joueurs en ligne`;
    } catch (error) {
        console.error('Erreur lors de la mise à jour du nombre de joueurs:', error);
        playerCountElement.textContent = 'Erreur de connexion';
    }
}

// Fonction pour copier la commande avec feedback visuel
function copyConnectCommand() {
    const command = connectCommandElement.textContent;
    navigator.clipboard.writeText(command).then(() => {
        const button = document.querySelector('.server-connect .btn.secondary');
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i> Copié !';
        setTimeout(() => {
            button.innerHTML = originalText;
        }, 2000);
    }).catch(err => {
        console.error('Erreur lors de la copie:', err);
    });
}

// Fonction pour charger la dernière vidéo YouTube avec gestion d'erreur
async function loadLatestVideo() {
    const placeholder = latestVideoContainer.querySelector('.youtube-placeholder');
    const thumbnail = placeholder.querySelector('.youtube-thumbnail');
    const playButton = placeholder.querySelector('.play-button');
    const loading = placeholder.querySelector('.loading');

    try {
        const response = await fetch('php/get_latest_video.php');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        if (data.videoId) {
            // Mettre à jour la miniature avec l'ID de la vidéo
            thumbnail.querySelector('img').src = `https://img.youtube.com/vi/${data.videoId}/maxresdefault.jpg`;
            
            // Gérer le clic sur le bouton play
            playButton.addEventListener('click', () => {
                // Créer l'iframe YouTube
                const iframe = document.createElement('iframe');
                iframe.src = `https://www.youtube.com/embed/${data.videoId}`;
                iframe.title = "Dernière vidéo YouTube d'AHNO";
                iframe.frameBorder = '0';
                iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
                iframe.allowFullscreen = true;
                
                // Remplacer le placeholder par l'iframe
                placeholder.style.display = 'none';
                latestVideoContainer.appendChild(iframe);
                
                // Charger le script YouTube de manière différée
                const script = document.createElement('script');
                script.src = 'https://www.youtube.com/iframe_api';
                script.async = true;
                document.body.appendChild(script);
            });
            
            // Cacher le message de chargement
            loading.style.display = 'none';
            thumbnail.style.display = 'block';
        }
    } catch (error) {
        console.error('Erreur lors du chargement de la vidéo:', error);
        latestVideoContainer.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-circle"></i>
                <p>Impossible de charger la vidéo</p>
                <div class="error-details">${error.message}</div>
                <a href="https://www.youtube.com/@AHNO-fr" class="btn primary" target="_blank" rel="noopener noreferrer">
                    <i class="fab fa-youtube"></i> Visiter la chaîne YouTube
                </a>
            </div>
        `;
    }
}

// Initialisation avec gestion des erreurs
document.addEventListener('DOMContentLoaded', () => {
    try {
        updatePlayerCount();
        loadLatestVideo();
    } catch (error) {
        console.error('Erreur lors de l\'initialisation:', error);
    }
});

// Mise à jour périodique du nombre de joueurs avec un intervalle plus long
setInterval(updatePlayerCount, 60000); // Mise à jour toutes les minutes au lieu de 30 secondes 