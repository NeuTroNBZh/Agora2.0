# Guide de Sécurité

Ce guide vous aidera à sécuriser votre installation d'Agora 2.0 et à protéger les données de vos utilisateurs.

## Bonnes pratiques

### 1. Configuration du serveur

#### Sécurisation d'Apache
```apache
# Désactiver l'affichage des informations du serveur
ServerTokens Prod
ServerSignature Off

# Protection contre les attaques XSS
Header set X-XSS-Protection "1; mode=block"

# Protection contre le clickjacking
Header set X-Frame-Options "SAMEORIGIN"

# Protection contre le MIME-sniffing
Header set X-Content-Type-Options "nosniff"

# Politique de sécurité du contenu
Header set Content-Security-Policy "default-src 'self'"
```

#### Configuration PHP
```ini
; Désactiver l'affichage des erreurs en production
display_errors = Off
log_errors = On

; Protection contre les injections
magic_quotes_gpc = Off
register_globals = Off

; Limites de sécurité
max_execution_time = 30
max_input_time = 60
memory_limit = 128M
post_max_size = 8M
upload_max_filesize = 2M
```

### 2. Sécurisation des fichiers

#### Permissions des fichiers
```bash
# Fichiers
find . -type f -exec chmod 644 {} \;

# Dossiers
find . -type d -exec chmod 755 {} \;

# Dossier uploads
chmod -R 755 uploads/
chown -R www-data:www-data uploads/
```

#### Protection des fichiers sensibles
```apache
# Bloquer l'accès aux fichiers de configuration
<FilesMatch "^(config\.php|\.htaccess)$">
    Order Allow,Deny
    Deny from all
</FilesMatch>

# Bloquer l'accès aux dossiers sensibles
<DirectoryMatch "^/.*/\.git/">
    Order Allow,Deny
    Deny from all
</DirectoryMatch>
```

## Protection contre les attaques

### 1. Protection DDoS

#### Configuration Apache
```apache
# Limiter le nombre de connexions
<IfModule mod_evasive20.c>
    DOSHashTableSize 3097
    DOSPageCount 2
    DOSSiteCount 50
    DOSPageInterval 1
    DOSSiteInterval 1
    DOSBlockingPeriod 10
</IfModule>
```

#### Utilisation de Cloudflare
1. Activez le mode "Under Attack"
2. Configurez les règles de pare-feu
3. Activez la protection DDoS

### 2. Protection contre les injections

#### Validation des entrées
```php
// Exemple de validation
function validateInput($input) {
    $input = trim($input);
    $input = stripslashes($input);
    $input = htmlspecialchars($input);
    return $input;
}
```

#### Préparation des requêtes SQL
```php
$stmt = $pdo->prepare("SELECT * FROM users WHERE username = ?");
$stmt->execute([$username]);
```

### 3. Protection des sessions

#### Configuration des sessions
```php
ini_set('session.cookie_httponly', 1);
ini_set('session.use_only_cookies', 1);
ini_set('session.cookie_secure', 1);
session_start();
```

## Backup et maintenance

### 1. Système de backup

#### Script de backup automatique
```bash
#!/bin/bash
DATE=$(date +%Y%m%d)
BACKUP_DIR="/backups/agora"
DB_NAME="agora_db"

# Backup de la base de données
mysqldump -u root -p $DB_NAME > $BACKUP_DIR/db_$DATE.sql

# Backup des fichiers
tar -czf $BACKUP_DIR/files_$DATE.tar.gz /var/www/agora

# Suppression des vieux backups
find $BACKUP_DIR -type f -mtime +7 -delete
```

#### Planification des backups
```bash
# Ajouter à crontab
0 2 * * * /path/to/backup-script.sh
```

### 2. Maintenance régulière

#### Vérification de sécurité
```bash
# Vérifier les permissions
find /var/www/agora -type f -perm -o+w -ls

# Vérifier les fichiers modifiés récemment
find /var/www/agora -mtime -1 -type f -ls
```

#### Mise à jour des dépendances
```bash
# Mise à jour de PHP
sudo apt update && sudo apt upgrade php

# Mise à jour des extensions
sudo apt install php-{extension-name}
```

## Monitoring

### 1. Surveillance du serveur

#### Configuration de fail2ban
```ini
[apache]
enabled = true
port = http,https
filter = apache-auth
logpath = /var/log/apache2/error.log
maxretry = 3
```

#### Surveillance des logs
```bash
# Surveiller les tentatives de connexion
tail -f /var/log/auth.log | grep "Failed password"

# Surveiller les erreurs PHP
tail -f /var/log/php_errors.log
```

### 2. Alertes de sécurité

#### Configuration des alertes
```php
// Exemple d'alerte par email
function sendSecurityAlert($message) {
    mail('admin@votre-domaine.com', 'Alerte de sécurité', $message);
}
```

## Prochaines étapes

1. [Optimisation](optimisation.md)
2. [Monitoring](monitoring.md)
3. [Maintenance](maintenance.md)

---

<div align="center">
  <sub>Dernière mise à jour : 24/04/2025</sub>
</div> 