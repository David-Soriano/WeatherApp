<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Si es una petición OPTIONS, salir
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if (!isset($_GET['lat']) || !isset($_GET['lon'])) {
    http_response_code(400);
    echo json_encode(["error" => "Faltan parámetros"]);
    exit;
}

$lat = $_GET['lat'];
$lon = $_GET['lon'];

$url = "https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=$lat&lon=$lon&accept-language=es";

$opts = [
    "http" => [
        "header" => "User-Agent: WeatherApp/1.0 (davidscicua314@gmail.com)\r\n"
    ]
];

$context = stream_context_create($opts);
$response = file_get_contents($url, false, $context);

header("Content-Type: application/json; charset=utf-8");
echo $response;