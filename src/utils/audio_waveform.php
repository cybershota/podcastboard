<?php

$ch = curl_init();
echo curl_setopt($ch , CURLOPT_HEADER, true);
curl_setopt($ch, CURLOPT_URL, 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/Oddio_Overplay/PLANET_WARDO/Anamorphosis/PLANET_WARDO_-_01_-_Hello.mp3');
$result = curl_exec($ch);
curl_close($ch);

?>