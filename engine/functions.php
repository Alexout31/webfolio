<?php

function render($file, $variables = [])
{
    if (!is_file($file)) {
        echo 'Template file "' . $file . '" not found!';
        exit();
    }
    if (filesize($file) === 0) {
        echo 'Template file "' . $file . '" is empty!';
        exit();
    }

    $templateContent = file_get_contents($file);

    if (empty($variables)) {
        return $templateContent;
    }

    foreach ($variables as $key => $value) {
        if (empty($value) || !is_string($value)) {
            continue;
        }
        $key = '{{' . strtoupper($key) . '}}';
        $templateContent = str_replace($key, $value, $templateContent);
    }
    return $templateContent;
}

function createGallery($dir)
{
    $result = '';
    $images = scandir(WWW_DIR . IMG_DIR . $dir);

    foreach ($images as $image) {
        if (is_file(WWW_DIR . IMG_DIR . $dir . $image)) {
            $result .= render(TEMPLATES_DIR . 'imageItem.tpl', [
                'src' => IMG_DIR . $dir . $image
            ]);
        }
    }
    return $result;
}