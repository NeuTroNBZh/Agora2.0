# Guide d'Installation

Ce guide vous aidera à installer et configurer Agora 2.0 sur votre serveur.

## Installation locale

### 1. Prérequis
- Serveur web (Apache recommandé)
- PHP 7.4 ou supérieur
- MySQL 5.7 ou supérieur
- Compte GitHub
- Accès SSH à votre serveur (pour le déploiement)

### 2. Installation des dépendances

#### Sur Ubuntu/Debian
```bash
# Mise à jour du système
sudo apt update && sudo apt upgrade -y

# Installation d'Apache
sudo apt install apache2 -y

# Installation de PHP et extensions
sudo apt install php php-mysql php-curl php-gd php-mbstring php-xml php-zip -y

# Installation de MySQL
sudo apt install mysql-server -y
```

#### Sur Windows
- Téléchargez et installez [XAMPP](https://www.apachefriends.org/fr/index.html)
- Assurez-vous que les services Apache et MySQL sont actifs

### 3. Configuration du serveur web

#### Configuration Apache
```apache
<VirtualHost *:80>
    ServerName votre-domaine.com
    DocumentRoot /chemin/vers/Agora2.0
    
    <Directory /chemin/vers/Agora2.0>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
```

### 4. Installation du projet

```bash
# Cloner le dépôt
git clone https://github.com/NeuTroNBZh/Agora2.0.git

# Se déplacer dans le dossier
cd Agora2.0

# Configurer les permissions
chmod -R 755 .
chmod -R 777 uploads/
```

### 5. Configuration de la base de données

```bash
# Se connecter à MySQL
mysql -u root -p

# Créer la base de données
CREATE DATABASE agora_db;
USE agora_db;

# Importer la structure
source /chemin/vers/Agora2.0/database/structure.sql
```

## Configuration du serveur

### 1. Configuration PHP

Modifiez `php.ini` :
```ini
upload_max_filesize = 10M
post_max_size = 10M
memory_limit = 256M
max_execution_time = 300
```

### 2. Configuration Apache

Activez les modules nécessaires :
```bash
sudo a2enmod rewrite
sudo a2enmod ssl
sudo service apache2 restart
```

### 3. Configuration SSL (recommandé)

```bash
# Installation de Certbot
sudo apt install certbot python3-certbot-apache -y

# Obtention du certificat
sudo certbot --apache -d votre-domaine.com
```

## Déploiement

### 1. Préparation du déploiement

```bash
# Mise à jour des dépendances
composer install --no-dev

# Optimisation des assets
npm run build
```

### 2. Déploiement sur GitHub Pages

```bash
# Configuration de GitHub Pages
git checkout -b gh-pages
git push origin gh-pages
```

### 3. Déploiement sur VPS

```bash
# Configuration du déploiement automatique
git remote add production ssh://user@votre-serveur.com/chemin/vers/site
git push production main
```

## Vérification de l'installation

1. Accédez à votre site via le navigateur
2. Vérifiez que toutes les pages se chargent correctement
3. Testez les fonctionnalités principales :
   - Connexion/Inscription
   - Skin Changer
   - Intégration Discord
   - Widgets de stream

## Dépannage

Si vous rencontrez des problèmes :
1. Vérifiez les logs Apache (`/var/log/apache2/error.log`)
2. Vérifiez les permissions des fichiers
3. Assurez-vous que tous les services sont en cours d'exécution
4. Consultez la [section dépannage](depannage.md) du wiki

## Prochaines étapes

1. [Configuration initiale](configuration.md)
2. [Personnalisation](personnalisation.md)
3. [Sécurisation](securite.md)

---

<div align="center">
  <sub>Dernière mise à jour : 24/04/2025</sub>
</div> 