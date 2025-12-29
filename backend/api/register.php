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
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);

$email = $input['email'] ?? '';
$password = $input['password'] ?? '';
$accountType = $input['accountType'] ?? 'customer';
$termsAccepted = $input['termsAccepted'] ?? false;
$collectionAccepted = $input['collectionAccepted'] ?? false;
$promotionAccepted = $input['promotionAccepted'] ?? false;

// Validate required fields
if (empty($email) || empty($password)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Email and password are required']);
    exit;
}

if (!$termsAccepted) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'You must accept the terms and conditions']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid email format']);
    exit;
}

try {
    // Check if email already exists
    $stmt = $db->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->execute([$email]);
    if ($stmt->fetch()) {
        http_response_code(409);
        echo json_encode(['success' => false, 'message' => 'Email already registered']);
        exit;
    }

    // Hash password
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    if ($accountType === 'customer') {
        // Customer registration
        $name = $input['name'] ?? '';
        $phone = $input['phone'] ?? '';

        if (empty($name)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Name is required for customer registration']);
            exit;
        }

        $stmt = $db->prepare("
            INSERT INTO users (email, password, account_type, name, phone, terms_accepted, collection_accepted, promotion_accepted) 
            VALUES (?, ?, 'customer', ?, ?, ?, ?, ?)
        ");
        $stmt->execute([$email, $hashedPassword, $name, $phone, $termsAccepted, $collectionAccepted, $promotionAccepted]);

    } else if ($accountType === 'media_company') {
        // Media company registration
        $companyName = $input['companyName'] ?? '';
        $firstName = $input['firstName'] ?? '';
        $lastName = $input['lastName'] ?? '';
        $phone = $input['phone'] ?? '';

        if (empty($companyName) || empty($firstName) || empty($lastName)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Company name, first name, and last name are required for media company registration']);
            exit;
        }

        $stmt = $db->prepare("
            INSERT INTO users (email, password, account_type, company_name, first_name, last_name, phone, terms_accepted, collection_accepted, promotion_accepted) 
            VALUES (?, ?, 'media_company', ?, ?, ?, ?, ?, ?, ?)
        ");
        $stmt->execute([$email, $hashedPassword, $companyName, $firstName, $lastName, $phone, $termsAccepted, $collectionAccepted, $promotionAccepted]);

    } else {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Invalid account type']);
        exit;
    }

    $userId = $db->lastInsertId();

    echo json_encode([
        'success' => true,
        'message' => 'Registration successful',
        'userId' => (string)$userId
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}
