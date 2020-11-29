<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta name="msvalidate.01" content="293596335640D63283F0DEB86F04B900" />
    <?php if (isset($_GET["v"])) { ?>
        <meta property="og:title" content="Shitpost Status">
        <meta property="og:site_name" content="Shitpost Status">
        <meta property="og:description" content="Watch all of the shitpost status videos and contribute your own with the Massively Multiplayer Online Shitpost Status Compilation!">
        <meta property="og:url" content="https://youtube.com/watch?v=<?php echo $_GET['v']; ?>">
        <meta property="og:image" content="https://i.ytimg.com/vi/<?php echo $_GET['v']; ?>/maxresdefault.jpg">
        <meta property="og:video:type" content="text/html">
        <meta property="og:video:url" content="https://www.youtube.com/embed/<?php echo $_GET['v']; ?>">
        <meta property="og:video:height" content="720">
        <meta property="og:video:width" content="1280">
        <meta property="og:type" content="video.other">
    <?php } else {
        ?>
        <meta property="og:title" content="Shitpost Status">
        <meta property="og:site_name" content="Shitpost Status">
        <meta property="og:url" content="https://shitpoststatus.com">
        <meta property="og:description" content="Watch all of the shitpost status videos and contribute your own with the Massively Multiplayer Online Shitpost Status Compilation!">
        <meta property="og:type" content="video.other">
        <meta property="og:image" content="https://shitpoststatus.com/logo512.png">
      <?php
    } ?>
    <meta
      name="description"
      content="Watch all of the Shitpost Status Videos! The Massively Multiplayer Online Compilation"
    />
    <meta name="x-favourite-video" content="https://shitpoststatus.com/?v=bIOeAlWm1qw">
    <meta name="author" content="https://github.com/Snaddyvitch-Dispenser" />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <title>Shitpost Status | ShitpostStatus.com</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
