-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- 主機： localhost
-- 產生時間： 2021 年 02 月 23 日 12:54
-- 伺服器版本： 10.4.13-MariaDB
-- PHP 版本： 7.4.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `podcast_board`
--

-- --------------------------------------------------------

--
-- 資料表結構 `comments`
--

CREATE TABLE `comments` (
  `id` int(11) UNSIGNED NOT NULL,
  `uuid` varchar(128) CHARACTER SET ascii NOT NULL,
  `username` varchar(50) NOT NULL DEFAULT '',
  `content` text NOT NULL,
  `audio_time` float NOT NULL,
  `created_time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `comments`
--

INSERT INTO `comments` (`id`, `uuid`, `username`, `content`, `audio_time`, `created_time`) VALUES
(251, '7dc7ac4b-21d8-4905-80bc-190f3fe347ef', 'admin', '歡迎留言 🎉 請遵守版規喔！\n版規在哪？心中有版規，你就有版規。\n公道自在人心 🥰🥰🥰', 4.78156, '2020-10-23 13:04:59'),
(252, '94302f53-a442-42b6-9ce6-0dfff572cdae', 'user', '蛇油，顧名思義就是蛇的脂肪，純天然的蛇油成分中含有許多人體所需的不飽和脂肪酸、亞麻酸、亞油酸等，對肌膚有絕佳的滲透性，所以一抹上臉或手腳之後，往往能感覺蛇油膏被瞬間吸收、不黏膩。蛇油膏甚至從幾百年前開始，就常被當作皮膚用藥與美容保養品。', 34.0908, '2020-10-23 13:14:54'),
(253, '1038a474-87b1-445b-aa17-b14c6e4e0528', 'block', '版規在哪？？？？？我看不到版規啊！！！！\n隨便講也算喔？', 74.8424, '2020-10-23 13:18:13'),
(276, '2a8a4565-94a5-4b13-b618-f6c5a0385fae', 'admin', '@布萊克討人厭(tag功能沒有做) \n依據版規警告一次', 70.8467, '2020-10-30 07:04:10'),
(277, '59484176-a919-4975-aa38-a07bf78bcea6', 'block', '這樣也要警告？小心我駭進後台把你們都搞死！！！！！！\n<script>alert(\"DESTROYYYYYYOUUUUUUUU\")</script>', 90.571, '2020-10-30 07:10:56'),
(278, '2fd276f4-2967-4d57-b2a4-8148240d32bb', 'admin', '@布萊克討人厭\n威脅版主，即日起列入黑名單，封鎖新留言，直到修正冒犯言論。', 101.297, '2020-10-30 07:12:39');

-- --------------------------------------------------------

--
-- 資料表結構 `tokens`
--

CREATE TABLE `tokens` (
  `id` int(11) UNSIGNED NOT NULL,
  `token` varchar(64) CHARACTER SET ascii NOT NULL DEFAULT '',
  `username` varchar(50) CHARACTER SET ascii NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 資料表結構 `users`
--

CREATE TABLE `users` (
  `id` int(11) UNSIGNED NOT NULL,
  `role` varchar(20) CHARACTER SET ascii NOT NULL DEFAULT 'user',
  `username` varchar(50) CHARACTER SET ascii NOT NULL DEFAULT '',
  `nickname` varchar(50) NOT NULL DEFAULT '',
  `password` char(128) CHARACTER SET ascii NOT NULL DEFAULT '',
  `avatar` varchar(512) NOT NULL DEFAULT '',
  `created_time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `users`
--

INSERT INTO `users` (`id`, `role`, `username`, `nickname`, `password`, `avatar`, `created_time`) VALUES
(49, 'admin', 'admin', '管理', '$2y$10$Jevr97QTCaEBS/YQ4ld1juuO72XFiot/YGlqwllRkPVH53E.lQwIW', 'https://avatars.dicebear.com/api/initials/管理.svg', '2020-10-23 13:03:20'),
(50, 'user', 'user', '油蛇', '$2y$10$kaf0KJgqF.lFVDDKwxW.8OAXQXuCMAzQvXqvn7CNKY8Zw0/l/N/ny', 'https://avatars.dicebear.com/api/initials/油蛇.svg', '2020-10-23 13:13:40'),
(51, 'block', 'block', '布萊克討人厭', '$2y$10$tCG/Uv5ZfLOSgcIevAEEh.NgxDvlRUOAuEpSpNiqbPxhGhyYKcTsu', 'https://avatars.dicebear.com/api/initials/布萊克討人厭.svg', '2020-10-23 13:16:13');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `tokens`
--
ALTER TABLE `tokens`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=279;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `tokens`
--
ALTER TABLE `tokens`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
