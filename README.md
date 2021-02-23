# Podcast 音波留言板
模仿 SoundCloud 的音波留言版，含會員註冊登入系統，管理員權限控制系統。增加網站安全性，防止 XSS, SQL Injection, 會員密碼經過 hash 處理，部署於 Heroku。

- [Live Demo](http://podcastboard.zangwang.tw/public/index.php)
- [Previous repo (Not secure virsion)](https://github.com/Lidemy/mentor-program-4th-cybershota/pull/12)

## 留言系統
- 註冊/登入留言系統
- 暫停/播放音訊
- 會員修改暱稱
- 顯示會員狀態（管理者 / 一般 / 停權）
- 顯示留言時音訊播放時間點
- 顯示留言時間
- 顯示留言於音波圖上
- 留言編輯/刪除
- 遭停權使用者留言屏蔽
- 分頁

![](https://github.com/cybershota/imagebed/blob/main/podcastcomment_small.gif)



## 管理系統

- 管理員（可以新增留言，也可以編輯與刪除任意留言）
- 一般使用者（可以新增留言，且編輯與刪除自己的留言）
- 遭停權使用者（不能新增留言，但是可以編輯與刪除自己的留言）
- 管理員更改會員權限

![](https://github.com/cybershota/imagebed/blob/main/podcast_admin_small.gif)

## 使用技術
- Vanilla JavaScript 前端， PHP 後端，MySql 為資料庫
- [wavesurfer.js](https://wavesurfer-js.org/) 繪製音波圖
- [Day.js](https://day.js.org/) 處理時間顯示
- Session 紀錄登入狀態
- Session Storage 紀錄編輯中留言
- History API 紀錄瀏覽歷史狀態
- 防止 XSS 攻擊
- 防止 SQL Injection 攻擊
- 會員密碼 Hash 處理
- JSDOC 撰寫註解
- 部署於 Heroku 使用 ClearDB

## 製作心得
關於留言水平顯示在音波圖上，我將原始音訊時長換算為 100 整，DOM 子元素寬度 100%，依據音訊進度偏移 position:absolute; 的 left 趴數，竟然這樣合得起來！位置大概正確，好開心！音訊檔是直接 fetch FreeMusicArchive 的下載路徑，因為畫圖一定要讀滿全檔，所以載入有點慢，請見諒～
也因此有稍微看一下串流相關的資訊，大概可以理解 chunk 每一個小資料，片段讀取的概念。更好的方式應該是：音訊上傳到我的 Server，Server 先畫好圖儲存，網站載入時讀取顯示該圖互動，而不是像現在載入時即時畫圖
有的時候覺得寫網站跟做影片、變魔術一樣，重要的是讓使用者「感覺快」或「感覺順」，像 CSS 很多效果是一種詐術一樣。我將這種詐術的想法也做在新增留言上，先新增 DOM 元素再上傳資料，感覺好即時 XD

