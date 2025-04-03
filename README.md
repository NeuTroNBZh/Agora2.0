
# CS2 Retake - Site Vitrine

Ce site web est une vitrine pour un serveur Retake Counter-Strike 2, incluant des fonctionnalités pour le Skin Changer, la communauté Discord et les streamers associés.

## 🚀 Démo

[Voir la démo en ligne](https://agora-retake.fr)

## 📋 Table des matières

- [Structure du Projet](#structure-du-projet)
- [Images Requises](#images-requises)
- [Personnalisation](#personnalisation)
- [Installation](#installation)
- [Fonctionnalités](#fonctionnalités)
- [Technologies Utilisées](#technologies-utilisées)
- [Crédits & Ressources Utilisées](#crédits--ressources-utilisées)
- [Support](#support)
- [Licence](#licence)
- [Contribution](#contribution)

## Structure du Projet

```
.
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
└── images/
    ├── logo.png           # Logo du serveur CS2 Retake
    ├── hero-bg.jpg        # Image de fond pour la section héro
    ├── twitch-logo.png    # Logo Twitch pour la section streamers
    ├── youtube-logo.png   # Logo YouTube pour la section streamers
    └── skin-preview.png   # Aperçu du Skin Changer
```

## Images Requises

### Logo du Serveur (logo.png)
- Format : PNG avec fond transparent
- Taille recommandée : 200x50 pixels
- Style : Logo du serveur CS2 Retake

### Image de Fond (hero-bg.jpg)
- Format : JPG
- Taille recommandée : 1920x1080 pixels
- Style : Image de fond représentant CS2 ou le mode Retake

### Logos des Plateformes
- twitch-logo.png : Logo officiel Twitch
- youtube-logo.png : Logo officiel YouTube
- Format : PNG avec fond transparent
- Taille recommandée : 100x100 pixels

### Aperçu du Skin Changer (skin-preview.png)
- Format : PNG
- Taille recommandée : 800x600 pixels
- Style : Capture d'écran ou mockup du Skin Changer

## Personnalisation

### 1. Images
- Placez toutes les images dans le dossier `images/`
- Assurez-vous que les noms des fichiers correspondent exactement à ceux listés ci-dessus
- Optimisez les images pour le web (taille et qualité)

### 2. Discord
- Remplacez `VOTRE_ID_DISCORD` dans `index.html` par l'ID de votre serveur Discord
- Pour obtenir l'ID de votre serveur Discord :
  1. Activez le mode développeur dans Discord (Paramètres > Apparence > Mode développeur)
  2. Clic droit sur votre serveur > Copier l'ID

### 3. Streamers
- Modifiez les sections des streamers dans `index.html` avec les informations de vos streamers
- Ajoutez les liens vers leurs chaînes Twitch et YouTube

### 4. Skin Changer
- Ajoutez le lien de téléchargement de votre Skin Changer dans la section correspondante

## Installation

1. Clonez ce dépôt
```bash
git clone https://github.com/NeuTroNBZh/Agora2.0.git
cd Agora2.0
```

2. Ajoutez toutes les images requises dans le dossier `images/`
3. Ouvrez `index.html` dans votre navigateur
4. Pour un déploiement en production, utilisez GitHub Pages ou un serveur web (Apache, Nginx, etc.)

## Déploiement sur GitHub Pages

1. Créez un nouveau dépôt sur GitHub
2. Poussez votre code vers le dépôt
3. Allez dans les paramètres du dépôt > Pages
4. Sélectionnez la branche `main` comme source
5. Votre site sera accessible à l'adresse : `https://votre-username.github.io/cs2-retake-site`

## Fonctionnalités

- Design responsive
- Animations au scroll
- Menu mobile
- Intégration Discord
- Sections pour les streamers
- Section Skin Changer
- Navigation fluide

## Technologies Utilisées

- HTML5
- CSS3 (avec variables CSS)
- JavaScript (vanilla)
- Font Awesome pour les icônes

## 📦 Crédits & Ressources Utilisées

Ce projet utilise et intègre des ressources issues de deux autres dépôts GitHub, que nous remercions chaleureusement :

- [**CS2-WeaponPaints-Website**](https://github.com/LielXD/CS2-WeaponPaints-Website) par [LielXD](https://github.com/LielXD) :
  Ce site fournit l’interface web permettant aux joueurs de personnaliser les skins de leurs armes CS2. Il sert de base à la section Skin Changer de ce projet.

- [**cs2-WeaponPaints**](https://github.com/Nereziel/cs2-WeaponPaints) par [Nereziel](https://github.com/Nereziel) :
  Ce plugin permet l'application des skins personnalisés directement dans CS2. Le projet web de LielXD utilise ce plugin, et nous avons repris cette intégration dans notre propre site vitrine.

## Support

Pour toute question ou problème, veuillez ouvrir une issue dans ce dépôt.

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
1. Fork le projet
2. Créer une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request
