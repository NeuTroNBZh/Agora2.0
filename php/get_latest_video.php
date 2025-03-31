<?php
header('Content-Type: application/json');

// Remplacez par votre clé API YouTube
$api_key = 'AIzaSyAcBxWMsTsCnJ6rmCI7KWDv8U7I6vJx-W8';
$channel_id = 'UCsHvSmaxUOGttP39HAIVy9w'; // ID de la chaîne d'AHNO

$url = "https://www.googleapis.com/youtube/v3/search?key={$api_key}&channelId={$channel_id}&part=snippet,id&order=date&maxResults=1";

// Utiliser cURL au lieu de file_get_contents pour une meilleure gestion des erreurs
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);

$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error = curl_error($ch);
curl_close($ch);

// Log des erreurs pour le débogage
error_log("YouTube API Response: " . $response);
error_log("HTTP Code: " . $http_code);

if ($error) {
    echo json_encode([
        'error' => 'Erreur de connexion à l\'API YouTube',
        'details' => $error,
        'code' => 'CURL_ERROR'
    ]);
    exit;
}

if ($http_code !== 200) {
    $error_data = json_decode($response, true);
    $error_message = isset($error_data['error']['message']) ? $error_data['error']['message'] : 'Erreur inconnue';
    echo json_encode([
        'error' => 'Erreur API YouTube',
        'code' => $http_code,
        'message' => $error_message,
        'details' => $error_data
    ]);
    exit;
}

$data = json_decode($response, true);

if (!$data) {
    echo json_encode([
        'error' => 'Erreur de décodage JSON',
        'message' => 'Impossible de décoder la réponse de l\'API YouTube',
        'details' => json_last_error_msg()
    ]);
    exit;
}

if ($data && isset($data['items'][0])) {
    $video = $data['items'][0];
    echo json_encode([
        'title' => $video['snippet']['title'],
        'thumbnail' => $video['snippet']['thumbnails']['high']['url'],
        'videoId' => $video['id']['videoId'],
        'publishedAt' => $video['snippet']['publishedAt']
    ]);
} else {
    echo json_encode([
        'error' => 'Aucune vidéo trouvée',
        'message' => 'Impossible de récupérer la dernière vidéo',
        'details' => 'La réponse de l\'API ne contient pas de vidéos'
    ]);
}
?> 