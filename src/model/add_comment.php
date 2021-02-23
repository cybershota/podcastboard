<?php
session_start();
require_once('../utils/conn.php');
require_once('../utils/session_validation.php');

$data = json_decode(file_get_contents('php://input'), true);

header('Content-type:application/json;charset=utf8mb4');

if(empty($data['content'])){
  $json = array(
    "ok" => false,
    "message" => "No input content"
  );
  $response = json_encode($json);
  echo $response;
  exit();
}

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
$content = $data['content'];
$audio_time = $data['audioTime'];
$uuid = $data['uuid'];
$active_Role = $data['activeRole'];

if($active_Role === 'admin' || $active_Role === 'user'){
  $sql = "INSERT INTO comments(username, content, audio_time,uuid) VALUES(?, ?, ?,?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ssss',$username,$content,$audio_time,$uuid);
  $result = $stmt->execute();
  
  if(!$result){
    $json = array(
      "ok" => false,
      "message" => $conn->error
    );
  
    $response = json_encode($json);
    echo $response;
    exit();
  }
  
  $json = array(
    "ok" => true,
    "message" => "Success!",
  );
  
  $response = json_encode($json);
  echo $response;
  exit();
}

$json = array(
  "ok" => false,
  "message" => "No permission to add comment",
);

$response = json_encode($json);
echo $response;

?>