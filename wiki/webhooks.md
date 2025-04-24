# Guide des Webhooks

Ce guide documente les webhooks disponibles dans Agora 2.0 pour les intégrations en temps réel.

## Configuration

### 1. Création d'un webhook

```http
POST /api/webhooks
Content-Type: application/json

{
    "name": "Mon Webhook",
    "url": "https://mon-site.com/webhook",
    "events": ["user_joined", "stream_started"],
    "secret": "mon_secret"
}
```

### 2. Vérification de la signature

```php
$signature = $_SERVER['HTTP_X_WEBHOOK_SIGNATURE'];
$payload = file_get_contents('php://input');
$secret = 'mon_secret';

$computedSignature = hash_hmac('sha256', $payload, $secret);

if (hash_equals($signature, $computedSignature)) {
    // Webhook valide
}
```

## Événements

### 1. Utilisateurs

#### Nouvel utilisateur
```json
{
    "event": "user_joined",
    "data": {
        "user_id": 1,
        "username": "nouvel_utilisateur",
        "email": "utilisateur@example.com",
        "joined_at": "2024-04-24T12:00:00Z"
    }
}
```

#### Mise à jour du profil
```json
{
    "event": "user_updated",
    "data": {
        "user_id": 1,
        "changes": {
            "email": "nouveau@example.com",
            "rank": "expert"
        }
    }
}
```

### 2. Streams

#### Début de stream
```json
{
    "event": "stream_started",
    "data": {
        "streamer_id": 1,
        "streamer_name": "Streamer1",
        "title": "Stream en direct",
        "game": "CS2",
        "viewers": 100,
        "started_at": "2024-04-24T12:00:00Z"
    }
}
```

#### Fin de stream
```json
{
    "event": "stream_ended",
    "data": {
        "streamer_id": 1,
        "streamer_name": "Streamer1",
        "duration": 3600,
        "viewers": 150,
        "ended_at": "2024-04-24T13:00:00Z"
    }
}
```

### 3. Discord

#### Nouveau message
```json
{
    "event": "discord_message",
    "data": {
        "channel_id": "123456789",
        "channel_name": "général",
        "user_id": "987654321",
        "username": "Utilisateur",
        "content": "Bonjour !",
        "timestamp": "2024-04-24T12:00:00Z"
    }
}
```

#### Nouveau membre
```json
{
    "event": "discord_member_joined",
    "data": {
        "user_id": "987654321",
        "username": "NouveauMembre",
        "joined_at": "2024-04-24T12:00:00Z"
    }
}
```

## Exemples d'implémentation

### 1. PHP

```php
<?php

$secret = 'mon_secret';
$payload = file_get_contents('php://input');
$signature = $_SERVER['HTTP_X_WEBHOOK_SIGNATURE'];

if (!hash_equals(hash_hmac('sha256', $payload, $secret), $signature)) {
    http_response_code(401);
    exit('Signature invalide');
}

$event = json_decode($payload, true);

switch ($event['event']) {
    case 'user_joined':
        handleNewUser($event['data']);
        break;
    case 'stream_started':
        handleStreamStart($event['data']);
        break;
    // ...
}

function handleNewUser($data) {
    // Traitement du nouvel utilisateur
}

function handleStreamStart($data) {
    // Traitement du début de stream
}
```

### 2. Node.js

```javascript
const express = require('express');
const crypto = require('crypto');

const app = express();
const secret = 'mon_secret';

app.post('/webhook', express.json(), (req, res) => {
    const signature = req.headers['x-webhook-signature'];
    const payload = JSON.stringify(req.body);
    
    const computedSignature = crypto
        .createHmac('sha256', secret)
        .update(payload)
        .digest('hex');

    if (signature !== computedSignature) {
        return res.status(401).send('Signature invalide');
    }

    const { event, data } = req.body;

    switch (event) {
        case 'user_joined':
            handleNewUser(data);
            break;
        case 'stream_started':
            handleStreamStart(data);
            break;
        // ...
    }

    res.status(200).send('OK');
});

function handleNewUser(data) {
    // Traitement du nouvel utilisateur
}

function handleStreamStart(data) {
    // Traitement du début de stream
}
```

## Bonnes pratiques

1. **Validation de la signature**
   - Toujours vérifier la signature du webhook
   - Utiliser une comparaison sécurisée des hashs

2. **Gestion des erreurs**
   - Implémenter une gestion robuste des erreurs
   - Loguer les erreurs pour le débogage

3. **Sécurité**
   - Utiliser HTTPS pour les endpoints
   - Limiter les tentatives de webhook
   - Mettre à jour régulièrement les secrets

4. **Performance**
   - Traiter les webhooks de manière asynchrone
   - Utiliser des files d'attente pour les tâches lourdes

## Prochaines étapes

1. [API](api.md)
2. [Intégrations](integrations.md)
3. [Sécurité](securite.md)

---

<div align="center">
  <sub>Dernière mise à jour : 24/04/2025</sub>
</div> 