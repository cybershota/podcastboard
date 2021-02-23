<?php
// 本頁為保留檔案
// 功能：一次獲得所有評論

/**
 * require_once() 筆記：
 * PHP 會檢查該文件是否已經被包含過，如果是則不會再次包含。
 * @param string 設定連線的檔案路徑。
 * @return object MySQL 伺服器回傳的物件。
 */
require_once('../utils/conn.php');

$sql = 
'select C.id as id, ' . 
'C.content as content, ' . 
'C.created_time as created_time, ' . 
'C.audio_time as audio_time, ' . 
'C.uuid as uuid, ' . 
'U.nickname as nickname, ' . 
'U.avatar as avatar ' . 
'from comments as C ' . 
'left join users as U ' . 
'on C.username = U.username ' . 
'order by C.id ASC';
$stmt = $conn->prepare($sql);
$result = $stmt->execute();

if(!$result){
  die('ERROR:' . $conn->error);
}

$result = $stmt->get_result();
$comments = array();

/**
 * $result 是 MySQL 回傳物件後存進的變數名稱。
 * fetch_assoc() 是 mysqli 底下的方法，會回傳關連陣列。
 */
while($row = $result->fetch_assoc()){
  array_push($comments,array(
    "id"=>$row['id'],
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