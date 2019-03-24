<?php

require_once __DIR__ . '/../config/config.php';

echo render(TEMPLATES_DIR . 'index.tpl', [
    'styles' => '<link rel="stylesheet" href="css/style.css">
                 <link rel="stylesheet" href="css/tikTakToe.css">',
    'title' => 'Крестики-нолики',
    'header' => render(TEMPLATES_DIR . 'header.tpl'),
    'content' => '<div></div>',
    'footer' => render(TEMPLATES_DIR . 'footer.tpl'),
]);
?>
<script type="text/javascript" src="js/jquery.min.js"></script>
<script type="text/javascript" src="js/tikTakToe.js"></script>
<script>
    $(document).ready(() => {
        let game = new tikTakToe('.content');
        game.init();
    })
</script>
