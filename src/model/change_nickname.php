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
$nickname = $data['nickname'];
$avatar = $data['avatar'];

$sql = 'UPDATE users SET nickname=?, avatar=? WHERE username=?';
$stmt = $conn->prepare($sql);
$stmt->bind_param('sss',$nickname,$avatar,$username);
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
    "message"=>"Successfully update user's nickname and avatar"
  );

  $response = json_encode($json);
  echo $response;
}

?>