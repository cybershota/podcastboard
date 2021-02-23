<?php
session_start();
session_destroy();

$json = array(
  "ok" => true,
  "message" => "SessionID Destroy",
);

$response = json_encode($json);
echo $response;

?>