# Guide de Dépannage

Ce guide vous aidera à résoudre les problèmes courants rencontrés avec Agora 2.0.

## Problèmes courants

### 1. Problèmes d'installation

#### Erreur "Permission denied"
```bash
# Solution
sudo chown -R www-data:www-data /var/www/agora
sudo chmod -R 755 /var/www/agora
```

#### Erreur de connexion à la base de données
```bash
# Vérifier les logs MySQL
tail -f /var/log/mysql/error.log

# Solution
mysql -u root -p
CREATE USER 'agora_user'@'localhost' IDENTIFIED BY 'votre_mot_de_passe';
GRANT ALL PRIVILEGES ON agora_db.* TO 'agora_user'@'localhost';
FLUSH PRIVILEGES;
```

### 2. Problèmes de performance

#### Temps de chargement lent
```apache
# Configuration Apache
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

#### Utilisation élevée de la mémoire
```ini
; Configuration PHP
memory_limit = 256M
max_execution_time = 60
```

### 3. Problèmes d'intégration

#### Discord ne se connecte pas
1. Vérifiez les identifiants dans `config/discord.php`
2. Assurez-vous que l'URL de redirection est correcte
3. Vérifiez que le bot a les permissions nécessaires

#### Problèmes avec le Skin Changer
```bash
# Vérifier les logs
tail -f /var/log/apache2/error.log

# Vérifier les permissions
chmod -R 755 uploads/skins/
```

## Solutions

### 1. Réinitialisation du cache

```bash
# Vider le cache PHP
sudo rm -rf /var/cache/php/*

# Vider le cache du navigateur
rm -rf /var/www/agora/cache/*
```

### 2. Réparation de la base de données

```bash
# Vérifier les tables
mysqlcheck -u root -p --auto-repair agora_db

# Optimiser les tables
mysqlcheck -u root -p --optimize agora_db
```

### 3. Mise à jour des dépendances

```bash
# Mise à jour de PHP
sudo apt update && sudo apt upgrade php

# Mise à jour des extensions
sudo apt install php-{extension-name}
```

## FAQ

### Q: Le site ne se charge pas
**R:** Vérifiez :
1. Le service Apache est-il en cours d'exécution ?
2. Les permissions des fichiers sont-elles correctes ?
3. Y a-t-il des erreurs dans les logs ?

### Q: Les images ne s'affichent pas
**R:** Vérifiez :
1. Les chemins des images sont-ils corrects ?
2. Les permissions du dossier `uploads/` sont-elles correctes ?
3. Le format des images est-il supporté ?

### Q: Le Skin Changer ne fonctionne pas
**R:** Vérifiez :
1. Le plugin est-il correctement installé sur le serveur CS2 ?
2. Les permissions sont-elles correctes ?
3. L'API est-elle accessible ?

### Q: Les intégrations Discord/Twitch ne fonctionnent pas
**R:** Vérifiez :
1. Les identifiants sont-ils corrects ?
2. Les URLs de redirection sont-elles configurées ?
3. Les applications sont-elles autorisées ?

## Logs et diagnostics

### 1. Logs Apache
```bash
# Voir les erreurs récentes
tail -f /var/log/apache2/error.log

# Voir les accès
tail -f /var/log/apache2/access.log
```

### 2. Logs PHP
```bash
# Voir les erreurs PHP
tail -f /var/log/php_errors.log
```

### 3. Logs MySQL
```bash
# Voir les erreurs MySQL
tail -f /var/log/mysql/error.log
```

## Support supplémentaire

Si vous ne trouvez pas de solution dans ce guide :
1. Consultez les [issues GitHub](https://github.com/NeuTroNBZh/Agora2.0/issues)
2. Rejoignez notre [Discord](https://discord.gg/uqDBpmRE3m)
3. Contactez le support à support@agora-retake.fr

## Prochaines étapes

1. [Optimisation](optimisation.md)
2. [Maintenance](maintenance.md)
3. [Mise à jour](mise-a-jour.md)

---

<div align="center">
  <sub>Dernière mise à jour : 24/04/2025</sub>
</div> 