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

// Fonction pour copier la commande de connexion
function copyConnectCommand() {
    const command = document.getElementById('connectCommand').textContent;
    navigator.clipboard.writeText(command).then(() => {
        // Créer et afficher une notification
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = 'Commande copiée dans le presse-papiers !';
        document.body.appendChild(notification);
        
        // Supprimer la notification après 3 secondes
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }).catch(err => {
        console.error('Erreur lors de la copie : ', err);
    });
}

// Fonction pour se connecter au serveur
function connectToServer() {
    const command = document.getElementById('connectCommand').textContent;
    // Copier la commande dans le presse-papiers
    navigator.clipboard.writeText(command).then(() => {
        // Lancer CS2 avec la commande
        window.location.href = 'steam://connect/79.127.196.41:25251;password agora';
        
        // Créer et afficher une notification
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <p>La commande a été copiée dans votre presse-papiers.</p>
            <p>1. Lancez CS2</p>
            <p>2. Appuyez sur ~ pour ouvrir la console</p>
            <p>3. Collez la commande (Ctrl+V)</p>
        `;
        document.body.appendChild(notification);
        
        // Supprimer la notification après 5 secondes
        setTimeout(() => {
            notification.remove();
        }, 10000);
    }).catch(err => {
        console.error('Erreur lors de la connexion : ', err);
    });
}

// Ajouter les styles pour les notifications
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px;
        background-color: #2ecc71;
        color: white;
        border-radius: 5px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    }

    .notification p {
        margin: 5px 0;
    }

    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

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