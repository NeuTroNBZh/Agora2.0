# Guide de l'API

Ce guide documente l'API REST d'Agora 2.0 et son utilisation.

## Authentification

### 1. JWT Token

```http
POST /api/auth/login
Content-Type: application/json

{
    "username": "utilisateur",
    "password": "motdepasse"
}
```

Réponse :
```json
{
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
    "expires_in": 3600
}
```

### 2. Utilisation du token

```http
GET /api/user/profile
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...
```

## Endpoints

### 1. Utilisateurs

#### Obtenir le profil
```http
GET /api/user/profile
```

Réponse :
```json
{
    "id": 1,
    "username": "utilisateur",
    "email": "utilisateur@example.com",
    "rank": "expert",
    "points": 1000
}
```

#### Mettre à jour le profil
```http
PUT /api/user/profile
Content-Type: application/json

{
    "email": "nouveau@example.com",
    "password": "nouveaumotdepasse"
}
```

### 2. Skin Changer

#### Obtenir la liste des skins
```http
GET /api/skins
```

Réponse :
```json
{
    "skins": [
        {
            "id": 1,
            "name": "AK-47 | Redline",
            "price": 10.99,
            "image": "skins/ak47_redline.jpg"
        }
    ]
}
```

#### Appliquer un skin
```http
POST /api/skins/apply
Content-Type: application/json

{
    "skin_id": 1,
    "weapon": "ak47"
}
```

### 3. Discord

#### Obtenir les informations du serveur
```http
GET /api/discord/server
```

Réponse :
```json
{
    "name": "Agora CS2",
    "members": 100,
    "online": 50,
    "channels": [
        {
            "id": "123456789",
            "name": "général",
            "type": "text"
        }
    ]
}
```

### 4. Streamers

#### Obtenir la liste des streamers
```http
GET /api/streamers
```

Réponse :
```json
{
    "streamers": [
        {
            "id": 1,
            "name": "Streamer1",
            "platform": "twitch",
            "status": "online",
            "viewers": 100
        }
    ]
}
```

## Webhooks

### 1. Discord

```http
POST /api/webhooks/discord
Content-Type: application/json

{
    "event": "user_joined",
    "data": {
        "user_id": 1,
        "username": "utilisateur"
    }
}
```

### 2. Twitch

```http
POST /api/webhooks/twitch
Content-Type: application/json

{
    "event": "stream_started",
    "data": {
        "streamer_id": 1,
        "title": "Stream en direct"
    }
}
```

## Gestion des erreurs

### Codes d'erreur

- `400` : Requête invalide
- `401` : Non authentifié
- `403` : Accès refusé
- `404` : Ressource non trouvée
- `500` : Erreur serveur

### Format d'erreur

```json
{
    "error": {
        "code": 400,
        "message": "Description de l'erreur",
        "details": {
            "field": "Description du problème"
        }
    }
}
```

## Rate Limiting

- 100 requêtes par minute par IP
- 1000 requêtes par heure par utilisateur

Headers de réponse :
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 1625097600
```

## Exemples d'utilisation

### 1. JavaScript

```javascript
const API_URL = 'https://api.agora2.0.com';

async function getProfile(token) {
    const response = await fetch(`${API_URL}/user/profile`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.json();
}
```

### 2. PHP

```php
$client = new GuzzleHttp\Client([
    'base_uri' => 'https://agora-retake.fr',
    'headers' => [
        'Authorization' => 'Bearer ' . $token
    ]
]);

$response = $client->get('/user/profile');
$profile = json_decode($response->getBody(), true);
```

## Prochaines étapes

1. [Intégrations](integrations.md)
2. [Webhooks](webhooks.md)
3. [Sécurité](securite.md)

---

<div align="center">
  <sub>Dernière mise à jour : 24/04/2025</sub>
</div> 