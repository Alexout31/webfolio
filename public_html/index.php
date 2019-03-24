<?php

require_once __DIR__ . '/../config/config.php';

echo render(TEMPLATES_DIR . 'index.tpl', [
    'styles' => '<link rel="shortcut icon" href="img/favicon.png" type="image/png">
                 <link rel="stylesheet" href="css/style.css">
                 <link rel="stylesheet" href="css/index.css">',
    'title' => 'Webfolio',
    'header' => render(TEMPLATES_DIR . 'header.tpl'),
    'content' => '<a href="tikTakToe.php">
                    <img class="img-link" src="img/tikTakToe.png" alt="Крестики-нолики">
                  </a>
                  <a href="gallery.php">
                    <img class="img-link" src="img/certificates.png" alt="Сертификаты">
                  </a>
                  <a href="shop/index.html" target="_blank">
                    <img class="img-link" src="img/shop.png" alt="Интернет магазин">
                  </a>
                  <a href="snake.php">
                    <img class="img-link" src="img/snake.png" alt="Змейка">
                  </a>',
    'footer' => render(TEMPLATES_DIR . 'footer.tpl'),
]);