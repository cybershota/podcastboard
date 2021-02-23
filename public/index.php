<!DOCTYPE html>
<html lang="zh-Hant">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="是在哈囉世界 Podcast 互動平台">
  <title>是在哈囉世界</title>
  <link rel="stylesheet" type="text/css" href="../assets/css/main.css">
</head>

<body>

  <div class="container">

  <header>
    <strong>注意！本站為 Lidemy Week11 練習用網站，註冊時請勿使用任何真實的帳號或密碼。</strong>
  </header>
  <main>
    <div class="podcast-block">
      <div class="podcast-card">
        <div class="podcast-cover">
        <div class="audio-control-btn">
            <img src="../assets/img/play-button.svg" alt="" data-state="play">
          </div>
          <picture>
            <source srcset="../assets/img/HelloWorld_webp.webp" type="image/webp">
            <source srcset="../assets/img/HelloWorld.png" type="image/png">
            <img src="../assets/img/HelloWorld.png" alt="似在嗨囉世界封面">
          </picture>
        </div>
        <div class="podcast-info">
        <h1 class="podcast-title">EP1000. 好像是ㄍ留言平台</h1>
        <p>🎊 未來不遠，EP1000. 節目慶 🎊
          1. Lidemy 第 100 期辣個男人分享
          2. 量子電腦的 DOM 弦控制
          3. 關於人腦植入微服務增進學習效率
          4. SCRUM 不死！
          5. 後續主題徵 AI：想徵一個有深刻學習煩惱的 AI 來聊天
          6. 音樂提供：<a href="https://freemusicarchive.org/music/Jamie_Ward/Anamorphosis/Hello_1114" target="_blank" rel="noopener noreferrer">Hello by PLANET WARDO</a>
        </p>
        </div>

      </div>
      <div class="podcast-audio-block">
          <div class="waveform-comment-block">
          <div class="waveform-loading">
            <img src="../assets/img/Pulse-1s-224px.svg" alt="">
          </div>
          </div>
          <div id="waveform">
          <div class="waveform-progress waveform-label">
            <label class="minutes">0</label>
            <label class="colon">:</label>
            <label class="seconds">00</label>
          </div>
            <div class="waveform-length waveform-label">
            <label class="minutes">0</label>
            <label class="colon">:</label>
            <label class="seconds">00</label>
            </div>
          </div>
      </div>
    </div>
  </main>

  <section class="interaction-area">

    <div class="signup-login">
      <h2>歡迎登入分享你的留言！</h2>
      <div class="button-group">
      <button type="button" class="sign-up">註冊</button>
      <button type="button" class="log-in">登入</button>
      <button type="button" class="log-out hide">登出</button>
      </div>
    </div>

    <div class="member-area hide" id="signup-area">
      
      <form id="signup-form">
        <h3>註冊</h3>
        <div class="input-layout">
          <div class="input-group">
            <label for="nickname">暱稱</label>
            <input id="signup-nickname" type="text" name="nickname" placeholder="顯示暱稱" maxlength="35"/>

            <label for="username">帳號</label>
            <input id="signup-username" type="text" name="username" placeholder="帳號名稱" maxlength="35"/>
          </div>
          <div class="input-group" id="signup-password">
            <label for="password1">密碼</label>
            <input type="password" name="password1" placeholder="密碼"/>
            <label for="password2">密碼確認</label>
            <input type="password" name="password2" placeholder="密碼確認"/>
          </div>
        </div>
        <div class="handle-block">
        <div class="warning">錯誤提示訊息</div>
        <button type="submit" id="signup-btn">送出
        </button>
        </div>
      </form>
    </div>

    <div class="member-area hide" id="login-area">
      <form id="login-form">
        <h3>登入</h3>
        <div class="input-layout">
          <div class="input-group">
            <label for="username">帳號</label>
            <input type="text" name="username" placeholder="帳號名稱">
          </div>
          <div class="input-group">
            <label for="password1">密碼</label>
            <input type="password" name="password" placeholder="密碼">
          </div>
        </div>
        <div class="handle-block">
        <div class="warning">錯誤提示訊息</div>
        <button type="submit" id="login-btn">送出
        </button>
        </div>
      </form>
    </div>

    <div class="comment-area hide">
      <form id="comment-form">
        <div class="avatar">
          <img src="" alt="">
        </div>
        <div class="comment-block">
          <div class="comment-info">
          <input class="change-nickname-input" type="text" name="change-nickname" value="" placeholder="新暱稱">
          <h3 id="user-nickname">使用者</h3>
          <div class="cancel-nickname-btn"></div>
          <div class="confirm-nickname-btn"></div>
          <div class="change-nickname-btn">修改</div>
          <div id="audio-time-label">0:00</div>
          </div>
          <input id="comment-nickname" name="user" type="text" data-commentUser="" value="使用者" hidden>
          <input id="audio-time" name="audioTime" type="text" data-audioTime="0:00" hidden>
          <input id="comment-role" name="role" type="text" value="user" hidden>
          <textarea name="comment" id="podcast-comment" rows="5" placeholder="留下評論分享..." required></textarea>
          <button type="submit" id="submit-comment">留言</button>
        </div>
        
      </form>
    </div>

  </section>

  <section class="review-area">

  </section>

  <section class="page-area">
      <ul class="pagination">
      </ul>
  </section>
  </div>

  <script type="text/javascript" src="https://unpkg.com/wavesurfer.js@4.1.1/dist/wavesurfer.js"></script>

  <script src="https://unpkg.com/dayjs@1.8.21/dayjs.min.js"></script>

  <script type="module" src="../assets/js/audio_waveform.js"></script>

  <script type="module" src="../assets/js/main.js"></script>
  
</body>
</html>