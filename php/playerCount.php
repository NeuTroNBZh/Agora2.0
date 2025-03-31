<?php
header('Content-Type: application/json');

// Configuration du serveur
$server_ip = '79.127.196.41';
$server_port = 25251;

// Fonction pour obtenir le nombre de joueurs
function getPlayerCount($ip, $port) {
    $socket = @fsockopen('udp://' . $ip, $port, $errno, $errstr, 1);
    
    if (!$socket) {
        return ['error' => 'Impossible de se connecter au serveur'];
    }

    // Envoyer la requête A2S_INFO
    $packet = "\xFF\xFF\xFF\xFF\x54Source Engine Query\x00";
    fwrite($socket, $packet);

    // Lire la réponse
    $response = fread($socket, 4096);
    fclose($socket);

    if (empty($response)) {
        return ['error' => 'Aucune réponse du serveur'];
    }

    // Extraire le nombre de joueurs de la réponse
    if (preg_match('/\x00(\d+)\x00/', $response, $matches)) {
        return [
            'players' => (int)$matches[1],
            'max_players' => 9,
            'status' => 'online'
        ];
    }

    return ['error' => 'Format de réponse invalide'];
}

// Obtenir le nombre de joueurs
$result = getPlayerCount($server_ip, $server_port);

// Renvoyer le résultat en JSON
echo json_encode($result);
?>

