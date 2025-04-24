# Agora 2.0 - Plateforme CS2 Retake

Agora 2.0 est une plateforme communautaire complète pour les serveurs CS2 Retake, offrant des fonctionnalités avancées pour les joueurs, les streamers et les administrateurs.

## 🚀 Fonctionnalités principales

- **🎮 Mode Retake**
  - Interface dédiée
  - Statistiques en temps réel
  - Système de classement
  - Matchmaking intelligent

- **🎨 Skin Changer**
  - Interface intuitive
  - Prévisualisation en temps réel
  - Bibliothèque de skins étendue
  - Synchronisation avec le jeu

- **📺 Intégration Streamers**
  - Widgets Twitch et YouTube
  - Notifications en direct
  - Statistiques de stream
  - Interface dédiée

- **💬 Communauté**
  - Intégration Discord complète
  - Système de rangs et récompenses
  - Forums et discussions
  - Événements communautaires

## 📚 Documentation

Consultez notre [Wiki](wiki/README.md) pour une documentation complète :

1. [Introduction](wiki/introduction.md)
2. [Installation](wiki/installation.md)
3. [Configuration](wiki/configuration.md)
4. [Personnalisation](wiki/personnalisation.md)
5. [Sécurité](wiki/securite.md)
6. [API et Intégrations](wiki/api.md)
7. [Dépannage](wiki/depannage.md)
8. [Contribution](wiki/contribution.md)

## 🛠️ Installation

### Prérequis
- Serveur web (Apache recommandé)
- PHP 7.4 ou supérieur
- MySQL 5.7 ou supérieur
- Compte GitHub
- Accès SSH (pour le déploiement)

### Installation locale
```bash
# Cloner le dépôt
git clone https://github.com/NeuTroNBZh/Agora2.0.git
cd Agora2.0

# Installer les dépendances
composer install
npm install

# Configurer l'environnement
cp .env.example .env
php artisan key:generate
```

### Déploiement
```bash
# Production
composer install --no-dev
npm run build

# GitHub Pages
git checkout -b gh-pages
git push origin gh-pages
```

## 🔧 Configuration

### Discord
1. Créez une application sur le [Portail des développeurs Discord](https://discord.com/developers/applications)
2. Configurez le bot avec les intents nécessaires
3. Ajoutez les URLs de redirection

### Streamers
1. Configurez les applications Twitch et YouTube
2. Ajoutez les identifiants dans la configuration
3. Configurez les widgets

### Skin Changer
1. Installez le plugin sur votre serveur CS2
2. Configurez l'API
3. Ajoutez vos skins personnalisés

## 🤝 Contribution

Les contributions sont les bienvenues ! Consultez notre [guide de contribution](wiki/contribution.md) pour plus d'informations.

1. Fork le projet
2. Créez une branche (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'feat: Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📞 Support

Si vous avez besoin d'aide :
- Consultez la [FAQ](wiki/depannage.md#faq)
- Rejoignez notre [Discord](https://discord.gg/uqDBpmRE3m)
- Ouvrez une [issue](https://github.com/NeuTroNBZh/Agora2.0/issues)

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 🙏 Remerciements

Ce projet utilise des ressources de la communauté :
- [CS2-WeaponPaints-Website](https://github.com/LielXD/CS2-WeaponPaints-Website)
- [cs2-WeaponPaints](https://github.com/Nereziel/cs2-WeaponPaints)

---

<div align="center">
  <sub>Dernière mise à jour : 24/04/2025</sub>
</div> 