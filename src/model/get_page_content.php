<?php
require_once('../utils/conn.php');

$data = json_decode(file_get_contents('php://input'), true);

$page = $data['page'];
$item_per_page = 15;
$offset = ($page - 1) * $item_per_page;

$sql = 
'select C.id as id, ' . 
'C.content as content, ' . 
'C.created_time as created_time, ' . 
'C.audio_time as audio_time, ' . 
'C.uuid as uuid, ' . 
'U.nickname as nickname, ' . 
'U.avatar as avatar, ' . 
'U.role as role ' . 
'from comments as C ' . 
'left join users as U ' . 
'on C.username = U.username ' . 
'order by C.id DESC ' . 
'limit ? offset ?';

$stmt = $conn->prepare($sql);
$stmt->bind_param('ii',$item_per_page,$offset);
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

$result = $stmt->get_result();
$comments = array();

while($row = $result->fetch_assoc()){
  array_push($comments,array(
    "id"=>$row['id'],
    "activeRole"=>$row['role'],
    "role"=>$row['role'],
    "nickname"=>$row['nickname'],
    "avatar"=>$row['avatar'],
    "content"=>$row['content'],
    "audio_time"=>$row['audio_time'],
    "created_time"=>$row['created_time'],
    "uuid"=>$row['uuid']
  ));
}

$json = array("comments" => $comments);

$response = json_encode($json);
header('Content-type:application/json;charset=utf8mb4');
echo $response;

?>