<?php
session_start();

require_once('../../utils/conn.php');
require_once('../../utils/session_validation.php');

if(empty($_POST['id']) || empty($_POST['role'])){
  header('Location:' . $_SERVER["HTTP_REFERER"]);
  die();
}

$user = getUserFromUsername($_SESSION['username']);

if($user['role'] !== 'admin'){
  header('Location:' . $_SERVER["HTTP_REFERER"]);
  die();
}

$id = $_POST['id'];
$role = $_POST['role'];

$sql = 'UPDATE users SET role=? WHERE id=?';
$stmt = $conn->prepare($sql);
$stmt->bind_param('ss',$role,$id);
$result = $stmt->execute();

if(!$result){
  header('Location: 2d3cb818.php?error=2');
  die($conn->error);
}

header('Location:' . $_SERVER["HTTP_REFERER"]);

?>