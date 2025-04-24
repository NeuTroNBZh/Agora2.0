# Guide de Configuration

Ce guide vous aidera à configurer les différentes fonctionnalités d'Agora 2.0 après l'installation.

## Configuration Discord

### 1. Création de l'application Discord

1. Rendez-vous sur le [Portail des développeurs Discord](https://discord.com/developers/applications)
2. Cliquez sur "New Application"
3. Donnez un nom à votre application
4. Notez le `Client ID` et le `Client Secret`

### 2. Configuration du bot

1. Dans les paramètres de votre application, allez dans "Bot"
2. Cliquez sur "Add Bot"
3. Activez les intents nécessaires :
   - PRESENCE INTENT
   - SERVER MEMBERS INTENT
   - MESSAGE CONTENT INTENT

### 3. Configuration du serveur

1. Dans les paramètres de votre application, allez dans "OAuth2"
2. Ajoutez les URLs de redirection :
   ```
   https://votre-domaine.com/discord/callback
   https://votre-domaine.com/api/discord/callback
   ```
3. Générez l'URL d'invitation avec les permissions nécessaires

### 4. Configuration dans Agora 2.0

Modifiez le fichier `config/discord.php` :
```php
return [
    'client_id' => 'VOTRE_CLIENT_ID',
    'client_secret' => 'VOTRE_CLIENT_SECRET',
    'bot_token' => 'VOTRE_BOT_TOKEN',
    'guild_id' => 'ID_DU_SERVEUR',
    'redirect_uri' => 'https://votre-domaine.com/discord/callback'
];
```

## Configuration des streamers

### 1. Configuration Twitch

1. Créez une application sur le [Portail des développeurs Twitch](https://dev.twitch.tv/console)
2. Notez le `Client ID` et générez un `Client Secret`
3. Configurez l'URL de redirection

### 2. Configuration YouTube

1. Créez un projet dans la [Google Cloud Console](https://console.cloud.google.com)
2. Activez l'API YouTube Data v3
3. Créez des identifiants OAuth 2.0

### 3. Configuration dans Agora 2.0

Modifiez le fichier `config/streamers.php` :
```php
return [
    'twitch' => [
        'client_id' => 'VOTRE_CLIENT_ID_TWITCH',
        'client_secret' => 'VOTRE_CLIENT_SECRET_TWITCH'
    ],
    'youtube' => [
        'client_id' => 'VOTRE_CLIENT_ID_YOUTUBE',
        'client_secret' => 'VOTRE_CLIENT_SECRET_YOUTUBE',
        'api_key' => 'VOTRE_API_KEY'
    ]
];
```

## Configuration du Skin Changer

### 1. Installation du plugin

1. Téléchargez le plugin depuis [cs2-WeaponPaints](https://github.com/Nereziel/cs2-WeaponPaints)
2. Installez-le sur votre serveur CS2
3. Configurez les permissions nécessaires

### 2. Configuration de l'API

Modifiez le fichier `config/skinchanger.php` :
```php
return [
    'api_key' => 'VOTRE_API_KEY',
    'server_ip' => 'IP_DU_SERVEUR_CS2',
    'server_port' => 'PORT_DU_SERVEUR',
    'allowed_skins' => [
        // Liste des skins autorisés
    ]
];
```

### 3. Configuration des skins

1. Créez un dossier `uploads/skins`
2. Configurez les permissions :
```bash
chmod -R 777 uploads/skins
```

## Configuration de la base de données

### 1. Configuration MySQL

Modifiez le fichier `config/database.php` :
```php
return [
    'host' => 'localhost',
    'database' => 'agora_db',
    'username' => 'votre_utilisateur',
    'password' => 'votre_mot_de_passe',
    'charset' => 'utf8mb4',
    'collation' => 'utf8mb4_unicode_ci'
];
```

### 2. Configuration des tables

Exécutez les migrations :
```bash
php migrations/run.php
```

## Configuration du cache

### 1. Configuration Redis (recommandé)

```bash
# Installation
sudo apt install redis-server

# Configuration
sudo systemctl enable redis-server
sudo systemctl start redis-server
```

### 2. Configuration dans Agora 2.0

Modifiez le fichier `config/cache.php` :
```php
return [
    'driver' => 'redis',
    'host' => '127.0.0.1',
    'port' => 6379,
    'password' => null,
    'database' => 0
];
```

## Configuration du mail

### 1. Configuration SMTP

Modifiez le fichier `config/mail.php` :
```php
return [
    'driver' => 'smtp',
    'host' => 'smtp.votre-domaine.com',
    'port' => 587,
    'username' => 'votre@email.com',
    'password' => 'votre_mot_de_passe',
    'encryption' => 'tls',
    'from' => [
        'address' => 'noreply@votre-domaine.com',
        'name' => 'Agora 2.0'
    ]
];
```

## Vérification de la configuration

1. Testez la connexion Discord
2. Vérifiez l'intégration des streamers
3. Testez le Skin Changer
4. Vérifiez l'envoi d'emails
5. Testez le cache

## Prochaines étapes

1. [Personnalisation](personnalisation.md)
2. [Sécurisation](securite.md)
3. [Optimisation](optimisation.md)

---

<div align="center">
  <sub>Dernière mise à jour : 24/04/2025</sub>
</div> 