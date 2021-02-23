<?php
require_once('../utils/conn.php');

// $data = json_decode(file_get_contents('php://input'), true);

header('Content-type:application/json;charset=utf8mb4');

$sql = 'SELECT COUNT(id) AS count FROM comments';
$stmt = $conn->prepare($sql);
$result = $stmt->execute();
$result = $stmt->get_result();
$count = $result->fetch_assoc();

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
    "message"=>"Successfully count comments!",
    "count"=> $count['count']
  );

  $response = json_encode($json);
  echo $response;
}

?>