// Gestion des cookies
const CookieManager = {
    // Types de cookies
    COOKIE_TYPES: {
        NECESSARY: 'necessary',
        ANALYTICS: 'analytics',
        PREFERENCES: 'preferences',
        MARKETING: 'marketing'
    },

    // Initialisation
    init() {
        this.createCookieBanner();
        this.loadCookiePreferences();
    },

    // Création de la bannière de cookies
    createCookieBanner() {
        if (this.getCookie('cookie_consent')) return;

        const banner = document.createElement('div');
        banner.id = 'cookie-banner';
        banner.innerHTML = `
            <div class="cookie-content">
                <h3>Gestion des cookies</h3>
                <p>Nous utilisons des cookies pour améliorer votre expérience sur notre site. Certains cookies sont nécessaires au fonctionnement du site, d'autres nous aident à comprendre comment vous interagissez avec celui-ci.</p>
                <div class="cookie-options">
                    <label>
                        <input type="checkbox" checked disabled>
                        Cookies nécessaires
                    </label>
                    <label>
                        <input type="checkbox" id="analytics-cookies">
                        Cookies d'analyse
                    </label>
                    <label>
                        <input type="checkbox" id="preferences-cookies">
                        Cookies de préférences
                    </label>
                    <label>
                        <input type="checkbox" id="marketing-cookies">
                        Cookies marketing
                    </label>
                </div>
                <div class="cookie-buttons">
                    <button id="accept-all-cookies" class="btn primary">Tout accepter</button>
                    <button id="save-cookie-preferences" class="btn secondary">Enregistrer mes choix</button>
                </div>
            </div>
        `;

        document.body.appendChild(banner);
        this.attachEventListeners();
    },

    // Attachement des événements
    attachEventListeners() {
        document.getElementById('accept-all-cookies')?.addEventListener('click', () => {
            this.acceptAllCookies();
            this.hideBanner();
        });

        document.getElementById('save-cookie-preferences')?.addEventListener('click', () => {
            this.saveCookiePreferences();
            this.hideBanner();
        });
    },

    // Sauvegarde des préférences
    saveCookiePreferences() {
        const preferences = {
            [this.COOKIE_TYPES.NECESSARY]: true,
            [this.COOKIE_TYPES.ANALYTICS]: document.getElementById('analytics-cookies')?.checked || false,
            [this.COOKIE_TYPES.PREFERENCES]: document.getElementById('preferences-cookies')?.checked || false,
            [this.COOKIE_TYPES.MARKETING]: document.getElementById('marketing-cookies')?.checked || false
        };

        this.setCookie('cookie_preferences', JSON.stringify(preferences), 1);
        this.setCookie('cookie_consent', 'true', 1);
        this.applyCookiePreferences(preferences);
    },

    // Acceptation de tous les cookies
    acceptAllCookies() {
        const preferences = {
            [this.COOKIE_TYPES.NECESSARY]: true,
            [this.COOKIE_TYPES.ANALYTICS]: true,
            [this.COOKIE_TYPES.PREFERENCES]: true,
            [this.COOKIE_TYPES.MARKETING]: true
        };

        this.setCookie('cookie_preferences', JSON.stringify(preferences), 1);
        this.setCookie('cookie_consent', 'true', 1);
        this.applyCookiePreferences(preferences);
    },

    // Chargement des préférences
    loadCookiePreferences() {
        const preferences = this.getCookie('cookie_preferences');
        if (preferences) {
            this.applyCookiePreferences(JSON.parse(preferences));
        }
    },

    // Application des préférences
    applyCookiePreferences(preferences) {
        // Désactivation des scripts selon les préférences
        if (!preferences[this.COOKIE_TYPES.ANALYTICS]) {
            this.disableAnalytics();
        }
        if (!preferences[this.COOKIE_TYPES.MARKETING]) {
            this.disableMarketing();
        }
    },

    // Méthodes utilitaires
    setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/;SameSite=Lax";
    },

    getCookie(name) {
        const cookieName = name + "=";
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            if (cookie.indexOf(cookieName) === 0) {
                return cookie.substring(cookieName.length, cookie.length);
            }
        }
        return null;
    },

    hideBanner() {
        const banner = document.getElementById('cookie-banner');
        if (banner) {
            banner.style.display = 'none';
        }
    },

    // Méthodes de désactivation des fonctionnalités
    disableAnalytics() {
        // Désactiver Google Analytics
        window['ga-disable-UA-XXXXX-Y'] = true;
    },

    disableMarketing() {
        // Désactiver les scripts marketing
        const marketingScripts = document.querySelectorAll('script[data-category="marketing"]');
        marketingScripts.forEach(script => script.remove());
    }
};

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    CookieManager.init();
}); 