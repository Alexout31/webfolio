<?php

require_once __DIR__ . '/../config/config.php';

echo render(TEMPLATES_DIR . 'index.tpl', [
    'styles' => '<link rel="shortcut icon" href="img/favicon.png" type="image/png">
                 <link rel="stylesheet" href="css/style.css">
                 <link rel="stylesheet" href="css/certificates.css">',
    'title' => 'Certificates',
    'header' => render(TEMPLATES_DIR . 'header.tpl'),
    'content' => createGallery('certificates/'),
    'footer' => render(TEMPLATES_DIR . 'footer.tpl'),
]);