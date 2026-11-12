<?php
/**
 * Contact endpoint for hectormadrigal.es
 *
 * Receives the Angular contact form (JSON POST), validates it and relays the
 * message to the destination inbox using the mail server of the hosting.
 *
 * Deployed next to index.html, so the form posts to the same origin and no
 * CORS is involved.
 */

declare(strict_types=1);

const RECIPIENT   = 'hectormadrisanch@gmail.com';
const SENDER      = 'web@hectormadrigal.es';
const SENDER_NAME = 'Portfolio hectormadrigal.es';

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

/**
 * Character count with a fallback for hosts without mbstring.
 */
function textLength(string $value): int
{
    return function_exists('mb_strlen')
        ? mb_strlen($value, 'UTF-8')
        : strlen($value);
}

/**
 * Sends a JSON response and stops execution.
 */
function respond(bool $ok, string $message, int $status = 200): void
{
    http_response_code($status);
    echo json_encode(
        ['success' => $ok, 'message' => $message],
        JSON_UNESCAPED_UNICODE
    );
    exit;
}

// Allow the local Angular dev server to test against the deployed script.
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowedOrigins = [
    'http://localhost:4200',
    'http://127.0.0.1:4200',
];

if (in_array($origin, $allowedOrigins, true)) {
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Vary: Origin');
}

if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    respond(false, 'Method not allowed.', 405);
}

// Accept JSON (the Angular client) or a classic form post.
$raw = file_get_contents('php://input') ?: '';
$contentType = $_SERVER['CONTENT_TYPE'] ?? '';

if (stripos($contentType, 'application/json') !== false) {
    $data = json_decode($raw, true);

    if (!is_array($data)) {
        respond(false, 'Invalid payload.', 400);
    }
} else {
    $data = $_POST;
}

// Honeypot: bots fill hidden fields, people do not.
if (!empty($data['_honey'])) {
    respond(true, 'Message sent.');
}

$name    = trim((string) ($data['name'] ?? ''));
$email   = trim((string) ($data['email'] ?? ''));
$message = trim((string) ($data['message'] ?? ''));

if (textLength($name) < 2 || textLength($name) > 80) {
    respond(false, 'Please enter a valid name.', 422);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(false, 'Please enter a valid email address.', 422);
}

if (textLength($message) < 20 || textLength($message) > 1200) {
    respond(false, 'Please write a slightly longer message.', 422);
}

// Header-injection guard.
if (preg_match('/[\r\n]/', $name) || preg_match('/[\r\n]/', $email)) {
    respond(false, 'Invalid characters.', 422);
}

$subject = 'Portfolio — mensaje de ' . $name;
$encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';

$body = "Nuevo mensaje desde el formulario de hectormadrigal.es\n\n"
    . "Nombre: {$name}\n"
    . "Email: {$email}\n\n"
    . "Mensaje:\n{$message}\n\n"
    . "---\n"
    . 'Enviado: ' . date('Y-m-d H:i:s') . "\n"
    . 'IP: ' . ($_SERVER['REMOTE_ADDR'] ?? 'desconocida') . "\n";

$headers = [
    'From: ' . SENDER_NAME . ' <' . SENDER . '>',
    'Reply-To: ' . $email,
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'MIME-Version: 1.0',
    'X-Mailer: PHP/' . phpversion(),
];

// `-f` sets the envelope sender so the domain SPF record validates the mail.
$sent = @mail(
    RECIPIENT,
    $encodedSubject,
    $body,
    implode("\r\n", $headers),
    '-f' . SENDER
);

if (!$sent) {
    respond(false, 'The mail server rejected the message.', 500);
}

respond(true, 'Message sent.');
