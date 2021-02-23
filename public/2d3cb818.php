<?php
  session_start();
  require_once('../src/utils/conn.php');
  require_once('../src/utils/session_validation.php');

  if(empty($_SESSION['username'])){
    $authority = 'nope';
  }else{
    $user = getUserFromUsername($_SESSION['username']);
    $authority = $user['role'];
  }
?>

<?php if($authority === 'nope' || $authority !== 'admin'){?>
  <?php
    header("HTTP/1.1 200 OK");
    http_response_code(404);
    ?>
    <!DOCTYPE html>
    <html lang="zh-Hant">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>404 NOT FOUND</title>
      <link rel="stylesheet" type="text/css" href="../assets/css/main.css">
    </head>
    <body>
      <div class="container">
        <main>
        <div class="podcast-block">
          <div class="podcast-card">
            <h1 style="margin: 30px 0 3px 30px;"></h1>
          </div>

          <section class="review-area" style="display: flex; justify-content:center; align-items:center;">
            <h1 style="text-align: center;">404 NOT FOUND</h1>
            <p>該頁面不存在</p>
            <button type="button" class="back-board" style="margin-top: 10px;" onclick="location.href='index.php';">返回</button>
          </section>
        </div>
        </main>
      </div>
    </body>
    </html>
    <?php
      exit();
    ?>
<?php }?>

<?php if($authority === 'admin'){?>
  <!DOCTYPE html>
  <html lang="zh-Hant">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>平台管理</title>
      <link rel="stylesheet" type="text/css" href="../assets/css/main.css">
    </head>
  <body>
    <div class="container">
      <main>
        <div class="podcast-block">
          <div class="podcast-card">
            <h1 style="margin: 30px 0 3px 30px;">Podcast 留言平台管理</h1>
          </div>

          <section class="interaction-area">
          <div class="signup-login">
            <h2 style="margin-left: 20px;">🔐 會員權限</h2>
            <div class="button-group">
            <button type="button" class="back-board" onclick="location.href='index.php';">返回</button>
            <button type="button" class="log-out" onclick="adminLogout()">登出</button>
            </div>
          </div>
          </section>

          <section class="review-area">
            <?php
              $sql = 
              'SELECT * FROM users';
              $stmt = $conn->prepare($sql);
              $result = $stmt->execute();
              
              if(!$result){
                echo '<h3 style="margin-left:30px">伺服器錯誤，請稍後再試。</h3>';
              }

              $result = $stmt->get_result();
              $members = array();
              $count = 1;
            ?>
            <div class="member-block">
                  <div class="member-item">項目</div>
                  <div class="avatar">
                    頭像
                  </div>
                  <div class="member-username">
                  帳號
                  </div>
                  <div class="member-nickname">
                  暱稱
                  </div>
                  <div class="member-role">
                  權限
                  </div>
                  <div class="save-change-area">
                    操作
                  </div>
               </div>
            <?php
              while($row = $result->fetch_assoc()){
            ?>
              <form method="POST" action="../src/admin/model/put_member_role.php" >
                <div class="member-block">
                
                  <div class="member-item"><?php echo $count++; ?></div>
                  <input name="id" type="text" value="<?php echo $row['id'];?>" hidden>
                  <div class="avatar">
                    <img src="<?php echo htmlspecialchars($row['avatar']);?>" alt="avatar">
                  </div>
                  <div class="member-username">
                  <?php echo htmlspecialchars($row['username']);?>
                  </div>
                  <div class="member-nickname">
                  <?php echo htmlspecialchars($row['nickname']);?>
                  </div>
                  <div class="member-role">
                  <div class="role-select">
                    <select name="role">
                      <?php foreach(array("admin","user","block") as &$user_type){?>
                        <?php if($row['role'] === $user_type){?>
                          <option value="<?php echo $row['role'];?>" selected><?php echo $row['role'];?></option>
                        <?php }else{?>
                          <option value="<?php echo $user_type;?>"><?php echo $user_type;?></option>
                        <?php }?>
                      <?php }?>
                    </select>
                  </div>
                  </div>
                  <div class="save-change-area">
                    <button type="submit">儲存</button>
                  </div>
                  
               </div>
               </form>
              <?php }?>
              

          </section>
        </div>
        </main>
      </div>
    <script>
      function adminLogout(){
        const cookieName = ['PHPSESSID'];
        cookieName.forEach((c) => {
        document.cookie = `${c}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      });
      window.location.href = "index.php";
      }
    </script>
  </body>
</html>
<?php }?>
