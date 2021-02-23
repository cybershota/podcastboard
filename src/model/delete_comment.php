<?php
session_start();
require_once('../utils/conn.php');
require_once('../utils/session_validation.php');

$data = json_decode(file_get_contents('php://input'), true);

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

$username = $user['username'];
$uuid = $data['uuid'];
$active_role = $data['activeRole'];

if($active_role === 'admin'){
  $sql = 'DELETE FROM comments WHERE uuid=? AND username=? ';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ss',$uuid, $username);
  $result = $stmt->execute();

  if(!$result){
    $json = array(
      "ok"=>false,
      "message"=>"Error!"
    );

    $response = json_encode($json);
    echo $response;
    die();
  }

  if($result){
    $json = array(
      "ok"=>true,
      "message"=>"Successfully delete comment post by Admin!"
    );

    $response = json_encode($json);
    echo $response;
  }
}

if($active_role === 'user' || $active_role === 'block'){
  $sql = 'DELETE FROM comments WHERE uuid=? AND username=?';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ss',$uuid,$username);
  $result = $stmt->execute();

  if(!$result){
    $json = array(
      "ok"=>false,
      "message"=>"Error!"
    );

    $response = json_encode($json);
    echo $response;
    die();
  }

  if($result){
    $json = array(
      "ok"=>true,
      "message"=>"Successfully delete comment post!"
    );

    $response = json_encode($json);
    echo $response;
  }
}

?>