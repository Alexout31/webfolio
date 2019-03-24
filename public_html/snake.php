<?php

require_once __DIR__ . '/../config/config.php';

echo render(TEMPLATES_DIR . 'index.tpl', [
    'styles' => '<link rel="stylesheet" href="css/style.css">
                 <link rel="stylesheet" href="css/snake.css">',
    'title' => 'Certificates',
    'header' => render(TEMPLATES_DIR . 'header.tpl'),
    'content' => '<div class="content">
<div id="game-score">Счет игры: <span id="score-count">0</span></div>
        <div id="game-wrap">
            <table id="game"></table>
        </div>
        <div id="menu">
            <div id="playButton" class="menuButton">Старт</div>
            <div id="newGameButton" class="menuButton">Новая игра</div>
        </div>
</div>',
    'footer' => render(TEMPLATES_DIR . 'footer.tpl'),
]);
?>
<script type="text/javascript" src="js/jquery.min.js"></script>
<script type="text/javascript" src="js/snake.js"></script>