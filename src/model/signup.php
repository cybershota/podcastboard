<?php
session_start();
require_once('../utils/conn.php');

$signupData = json_decode(file_get_contents('php://input'),true);

header('Content-type:application/json;charset=utf8mb4');

if(
  empty($signupData['nickname']) ||
  empty($signupData['username']) ||
  empty($signupData['password']) ||
  empty($signupData['avatar'])
  ){
  $json = array(
    "ok" => false,
    "message" => "No input content"
  );
  $response = json_encode($json);
  echo $response;
  die();
}

$nickname = $signupData['nickname'];
$username = $signupData['username'];
// 雜湊密碼
$password = password_hash($signupData['password'],PASSWORD_DEFAULT);
$avatar = $signupData['avatar'];

$sql = "insert into users(nickname, username, password, avatar) values(?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssss",$nickname,$username,$password,$avatar);
$result = $stmt->execute();

if(!$result){
  $json = array(
    "ok" => false,
    "message" => $conn->error
  );

  $response = json_encode($json);
  echo $response;
  die();
}

$json = array(
  "ok" => true,
  "message" => "Success!",
);

$expire = time() + 3600 * 24 * 30;
$_SESSION['username'] = $username;

$response = json_encode($json);
echo $response;

?>