<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

include '../db/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['valid' => false, 'message' => 'Method not allowed']);
    exit;
}

// Get token from Authorization header
$headers = getallheaders();
$authHeader = $headers['Authorization'] ?? '';

if (empty($authHeader) || !preg_match('/Bearer\s+(.*)$/i', $authHeader, $matches)) {
    echo json_encode(['valid' => false]);
    exit;
}

$token = $matches[1];

try {
    // Check if token exists and is not expired
    $stmt = $db->prepare("
        SELECT u.* FROM users u 
        INNER JOIN sessions s ON u.id = s.user_id 
        WHERE s.token = ? AND s.expires_at > NOW()
    ");
    $stmt->execute([$token]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        echo json_encode(['valid' => false]);
        exit;
    }

    echo json_encode([
        'valid' => true,
        'user' => [
            'id' => (string)$user['id'],
            'email' => $user['email'],
            'accountType' => $user['account_type'],
            'name' => $user['name'] ?? $user['company_name'],
            'companyName' => $user['company_name']
        ]
    ]);

} catch (PDOException $e) {
    echo json_encode(['valid' => false]);
}
