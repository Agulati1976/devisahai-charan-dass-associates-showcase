<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

final class PricingError extends RuntimeException {}

function pricingSupabase(string $url, array $headers): array
{
    $request = curl_init($url);
    curl_setopt_array($request, [CURLOPT_HTTPHEADER => $headers, CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CONNECTTIMEOUT => 4, CURLOPT_TIMEOUT => 8]);
    $response = curl_exec($request);
    $status = curl_getinfo($request, CURLINFO_RESPONSE_CODE);
    if (in_array($status, [401, 403], true)) throw new PricingError('Sign in again to manage pricing.', 401);
    if ($response === false || $status !== 200) throw new PricingError('Admin access could not be verified.', 503);
    return json_decode($response, true, 32, JSON_THROW_ON_ERROR);
}

function pricingAdmin(string $folder): string
{
    $authorization = $_SERVER['HTTP_AUTHORIZATION'] ?? $_SERVER['REDIRECT_HTTP_AUTHORIZATION'] ?? '';
    if (!preg_match('/\ABearer [A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\z/', $authorization) || strlen($authorization) > 8192) {
        throw new PricingError('Sign in as an admin to manage pricing.', 401);
    }
    $config = json_decode(file_get_contents($folder . '/auth.json'), true, 32, JSON_THROW_ON_ERROR);
    $headers = ['Authorization: ' . $authorization, 'apikey: ' . $config['publishable_key']];
    $user = pricingSupabase($config['url'] . '/auth/v1/user', $headers);
    $id = $user['id'] ?? '';
    if (!is_string($id) || !preg_match('/\A[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}\z/', $id)) {
        throw new PricingError('Sign in again to manage pricing.', 401);
    }
    $role = pricingSupabase($config['url'] . '/rest/v1/user_roles?select=role&role=eq.admin&user_id=eq.' . $id . '&limit=1', $headers);
    if (($role[0]['role'] ?? '') !== 'admin') throw new PricingError('Only admins can manage pricing.', 403);
    return $id;
}

function pricingWrite(string $target, string $contents): void
{
    $stage = tempnam(dirname($target), '.pricing-');
    if ($stage === false) throw new RuntimeException('Could not stage pricing file');
    try {
        if (file_put_contents($stage, $contents) !== strlen($contents) || !rename($stage, $target)) {
            throw new RuntimeException('Could not save pricing file');
        }
    } finally {
        if (is_file($stage)) unlink($stage);
    }
}

function pricingPreview(string $folder, string $draftPath, string $current): array
{
    $product = $_POST['product'] ?? '';
    if (!in_array($product, ['PE', 'PP', 'PVC'], true)) throw new PricingError('Choose PE, PP or PVC.', 400);
    $pdf = $_FILES['circular'] ?? [];
    if (($pdf['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK || $pdf['size'] < 1 || $pdf['size'] > 5 * 1024 * 1024) {
        throw new PricingError('Choose a PDF circular under 5 MB.', 400);
    }
    if ((new finfo(FILEINFO_MIME_TYPE))->file($pdf['tmp_name']) !== 'application/pdf') {
        throw new PricingError('The uploaded file must be a PDF.', 400);
    }

    $tools = $folder . '/tools';
    $extractor = $folder . '/bin/pdftotext';
    if (!function_exists('proc_open') || !is_executable($extractor) || !is_file($tools . '/preview_circular.py')) {
        throw new PricingError('The PDF extractor is unavailable.', 503);
    }
    $work = $folder . '/upload-' . bin2hex(random_bytes(16));
    if (!mkdir($work, 0700)) throw new RuntimeException('Could not create pricing workspace');
    try {
        $input = $work . '/circular.pdf';
        if (!move_uploaded_file($pdf['tmp_name'], $input)) throw new RuntimeException('Could not save circular');
        $process = proc_open(['/usr/bin/timeout', '-k', '2', '25', '/usr/bin/python3',
            $tools . '/preview_circular.py', $product, $input, $extractor],
            [0 => ['file', '/dev/null', 'r'], 1 => ['pipe', 'w'], 2 => ['file', $work . '/extract.log', 'w']], $pipes, $work);
        if (!is_resource($process)) throw new RuntimeException('Could not start the PDF extractor');
        $summary = stream_get_contents($pipes[1]);
        fclose($pipes[1]);
        if (proc_close($process) !== 0) {
            throw new PricingError('Could not read this circular. Check the product and upload a Reliance price circular with Domestic and Ex-Depot tables.', 422);
        }
        $summary = json_decode($summary, true, 32, JSON_THROW_ON_ERROR);
        $new = json_decode(file_get_contents($work . '/product.json'), true, 32, JSON_THROW_ON_ERROR);
    } finally {
        foreach (['circular.pdf', 'product.csv', 'product_rejects.csv', 'product.json', 'extract.log'] as $name) {
            if (is_file($work . '/' . $name)) unlink($work . '/' . $name);
        }
        rmdir($work);
    }

    $data = json_decode($current, true, 32, JSON_THROW_ON_ERROR);
    $source = $new['meta']['sources'][$product];
    $previous = $data['meta']['sources'][$product];
    $date = DateTimeImmutable::createFromFormat('!F d, Y', $source['effective_from']);
    $previousDate = DateTimeImmutable::createFromFormat('!F d, Y', $previous['effective_from']);
    if (!$date || $date->format('F d, Y') !== $source['effective_from'] || ($previousDate && $date < $previousDate)) {
        throw new PricingError('The circular date is invalid or older than the currently published circular.', 422);
    }
    $summary['prices'] = ['Domestic' => 0, 'Ex-Depot' => 0];
    $summary['samples'] = [];
    foreach ($new['grades'] as $grade) {
        $mode = $grade['sale_type'];
        $summary['prices'][$mode] += count($grade['locations']);
        if (!isset($summary['samples'][$mode])) {
            [$location, $state, $price] = $grade['locations'][0];
            $summary['samples'][$mode] = ['grade' => $grade['grade'], 'plant' => $grade['plant'],
                'location' => $location, 'state' => $state, 'price' => $price];
        }
    }
    $data['meta']['sources'][$product] = $source;
    $groups = array_fill_keys(['PE', 'PP', 'PVC'], []);
    foreach ($data['grades'] as $grade) {
        if ($grade['product'] !== $product) $groups[$grade['product']][] = $grade;
    }
    $groups[$product] = $new['grades'];
    $data['grades'] = array_merge(...array_values($groups));

    $token = bin2hex(random_bytes(32));
    pricingWrite($draftPath, json_encode(['token' => $token, 'expires' => time() + 1800,
        'base' => hash('sha256', $current), 'data' => $data], JSON_THROW_ON_ERROR));
    return $summary + ['token' => $token, 'product' => $product, 'source' => $source, 'previous' => $previous];
}

function pricingPublish(string $folder, string $draftPath): array
{
    $token = $_POST['token'] ?? '';
    if (!is_string($token) || !preg_match('/\A[a-f0-9]{64}\z/', $token)) {
        throw new PricingError('Preview a circular before publishing.', 400);
    }
    $lock = fopen($folder . '/publish.lock', 'c');
    if ($lock === false || !flock($lock, LOCK_EX)) throw new RuntimeException('Could not lock pricing updates');
    try {
        $draft = is_file($draftPath) ? json_decode(file_get_contents($draftPath), true, 32, JSON_THROW_ON_ERROR) : null;
        if (!$draft || $draft['expires'] < time() || !hash_equals($draft['token'], $token)) {
            throw new PricingError('This preview expired. Upload the circular again.', 409);
        }
        $current = pricingCurrent($folder);
        if (!hash_equals($draft['base'], hash('sha256', $current))) {
            throw new PricingError('Prices changed after this preview. Upload the circular again.', 409);
        }
        $flags = JSON_THROW_ON_ERROR | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE;
        $next = json_encode($draft['data'], $flags);
        if ($next !== $current) {
            pricingWrite($folder . '/previous.json', $current);
            pricingWrite($folder . '/current.json', $next);
        }
        unlink($draftPath);
        return ['published' => true];
    } finally {
        fclose($lock);
    }
}

function pricingCurrent(string $folder): string
{
    $published = $folder . '/current.json';
    return file_get_contents(is_file($published) ? $published : dirname(__DIR__) . '/prices.json');
}

try {
    if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') throw new PricingError('POST required.', 405);
    $private = dirname(__DIR__, 2) . '/dscda-private';
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    if ($origin !== 'https://' . ($_SERVER['HTTP_HOST'] ?? '') ||
        !in_array($origin, ['https://devisahaicharandass.com', 'https://www.devisahaicharandass.com'], true)) {
        throw new PricingError('Invalid request origin.', 403);
    }
    if ((int) ($_SERVER['CONTENT_LENGTH'] ?? 0) > 6 * 1024 * 1024) throw new PricingError('Request too large.', 413);
    $folder = $private . '/pricing';
    $user = pricingAdmin($folder);
    $draft = $folder . '/draft-' . hash('sha256', $user) . '.json';
    $data = match ($_GET['action'] ?? '') {
        'preview' => pricingPreview($folder, $draft, pricingCurrent($folder)),
        'publish' => pricingPublish($folder, $draft),
        default => throw new PricingError('Unsupported pricing action.', 404),
    };
    echo json_encode($data, JSON_THROW_ON_ERROR);
} catch (PricingError $error) {
    http_response_code($error->getCode());
    echo json_encode(['error' => $error->getMessage()]);
} catch (Throwable $error) {
    error_log('DSCDA pricing failure: ' . get_class($error) . ' (' . $error->getCode() . ')');
    http_response_code(500);
    echo json_encode(['error' => 'Pricing service unavailable.']);
}
