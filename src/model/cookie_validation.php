<?php
session_start();
require_once('../utils/conn.php');
require_once('../utils/session_validation.php');

header('Content-type:application/json;charset=utf8mb4');

if(empty($_SESSION['username'])){
  $json = array(
    "ok" => false,
    "message" => "Not Authorized User"
  );
  $response = json_encode($json);
  echo $response;
  exit();
}

$user = getUserFromUsername($_SESSION['username']); 

$userdata = [
  "nickname"=>$user['nickname'],
  "avatar"=>$user['avatar'],
  "role"=>$user['role']
];

$response = json_encode($userdata);
echo $response;

?>