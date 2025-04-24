# Guide de Personnalisation

Ce guide vous aidera à personnaliser Agora 2.0 selon vos besoins et préférences.

## Thèmes et styles

### 1. Modification des couleurs

Le fichier principal des styles se trouve dans `css/style.css`. Vous pouvez modifier les variables CSS pour changer les couleurs principales :

```css
:root {
    --primary-color: #007bff;
    --secondary-color: #6c757d;
    --accent-color: #ffc107;
    --background-color: #f8f9fa;
    --text-color: #212529;
}
```

### 2. Personnalisation du logo

1. Remplacez le fichier `images/logo.png` par votre logo
2. Ajustez la taille dans le CSS :
```css
.logo {
    width: 200px;
    height: auto;
}
```

### 3. Police de caractères

1. Ajoutez votre police dans `css/fonts/`
2. Modifiez le CSS :
```css
@font-face {
    font-family: 'VotrePolice';
    src: url('fonts/votre-police.woff2') format('woff2');
}

body {
    font-family: 'VotrePolice', sans-serif;
}
```

## Contenu personnalisé

### 1. Modification des textes

Les textes principaux sont dans `index.html`. Vous pouvez modifier :
- Titres et sous-titres
- Descriptions
- Messages d'accueil
- Textes des boutons

### 2. Images et médias

1. Ajoutez vos images dans `images/`
2. Modifiez les chemins dans le HTML :
```html
<img src="images/votre-image.jpg" alt="Description">
```

### 3. Sections personnalisées

Vous pouvez ajouter ou modifier des sections dans `index.html` :
```html
<section class="votre-section">
    <h2>Votre titre</h2>
    <p>Votre contenu</p>
</section>
```

## Intégrations

### 1. Discord

#### Personnalisation du widget
```javascript
const discordConfig = {
    serverId: 'VOTRE_ID_SERVEUR',
    theme: 'dark',
    width: '350',
    height: '500'
};
```

#### Messages personnalisés
```php
// config/discord.php
return [
    'welcome_message' => 'Bienvenue sur notre serveur !',
    'rules_channel' => 'ID_DU_CANAL_RÈGLES'
];
```

### 2. Streamers

#### Configuration des widgets
```javascript
const twitchConfig = {
    channel: 'VOTRE_CHAINE',
    width: '100%',
    height: '400',
    theme: 'dark'
};

const youtubeConfig = {
    channelId: 'VOTRE_ID_CHAINE',
    layout: 'default',
    theme: 'dark'
};
```

### 3. Skin Changer

#### Personnalisation de l'interface
```javascript
const skinChangerConfig = {
    theme: 'dark',
    defaultWeapon: 'ak47',
    showPrices: true,
    currency: '€'
};
```

#### Ajout de skins personnalisés
1. Ajoutez vos skins dans `uploads/skins/`
2. Modifiez la configuration :
```php
// config/skinchanger.php
return [
    'custom_skins' => [
        'nom_du_skin' => [
            'name' => 'Nom du Skin',
            'price' => 10.99,
            'image' => 'uploads/skins/nom_du_skin.jpg'
        ]
    ]
];
```

## Fonctionnalités avancées

### 1. Système de rangs

#### Configuration des rangs
```php
// config/ranks.php
return [
    'ranks' => [
        'débutant' => [
            'min_points' => 0,
            'color' => '#808080',
            'permissions' => ['basic']
        ],
        'expert' => [
            'min_points' => 1000,
            'color' => '#FFD700',
            'permissions' => ['advanced']
        ]
    ]
];
```

### 2. Statistiques

#### Personnalisation des graphiques
```javascript
const statsConfig = {
    theme: 'dark',
    show_leaderboard: true,
    update_interval: 300000 // 5 minutes
};
```

## Optimisation mobile

### 1. Responsive Design

Modifiez les media queries dans `css/style.css` :
```css
@media (max-width: 768px) {
    .container {
        padding: 10px;
    }
    .menu {
        display: none;
    }
}
```

### 2. PWA Configuration

Modifiez `manifest.json` :
```json
{
    "name": "Agora 2.0",
    "short_name": "Agora",
    "theme_color": "#007bff",
    "background_color": "#ffffff"
}
```

## Vérification des modifications

1. Testez toutes les modifications sur différents appareils
2. Vérifiez la compatibilité des navigateurs
3. Assurez-vous que les performances ne sont pas affectées

## Prochaines étapes

1. [Sécurisation](securite.md)
2. [Optimisation](optimisation.md)
3. [Déploiement](deploiement.md)

---

<div align="center">
  <sub>Dernière mise à jour : 24/04/2025</sub>
</div> 