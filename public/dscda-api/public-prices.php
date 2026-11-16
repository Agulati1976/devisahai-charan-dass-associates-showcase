<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

$published = dirname(__DIR__, 2) . '/dscda-private/pricing/current.json';
$seed = dirname(__DIR__) . '/prices.json';
if (readfile(is_file($published) ? $published : $seed) === false) {
    http_response_code(503);
}
