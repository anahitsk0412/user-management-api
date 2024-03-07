-- Adminer 4.8.1 MySQL 5.5.5-10.5.8-MariaDB-1:10.5.8+maria~focal dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `phoneNumber` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `username` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_78a916df40e02a9deb1c4b75ed` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO `user` (`id`, `password`, `phoneNumber`, `username`) VALUES
(1,	'12345',	'123-45-678',	'Anahit'),
(2,	'ea9d3a2c14a6fe7e.be1edcd51869f9d123a1952ee103ac2fd1e0f2d48ddc547438791221f8487ee4',	'123-56-760',	'someCoolUser'),
(4,	'ad5d33554d5423a3.711043ee9f992648b92a78f80f63eace85e7e240d73473973e09577bd2f56a84',	'123-56-760',	'someCo'),
(5,	'dcb1df4a33b5d540.97899a0e075ce2e8ce6e3e39ef0bb0b9ccb89fabfde25814852a7bae6377e9f0',	'123-56-760',	'someCom'),
(6,	'a751641922461375.eb38835423a41740222f0e1a9fdb719fb815b0117d2793c875bb616e69e04fc6',	'123-56-760',	'Abdrei'),
(7,	'39ba979adeb4dc21.9bfd46579637a578a5092dd628a744a068c9ae66a5406738b4958d99dd9dc8cb',	'123-56-760',	'Alex'),
(9,	'1ccb0065c64ed9c4.8f98f4707b2b5d21f53b635e0f1a559967b61780d65a58c7fc5d937446f38d6f',	'123-56-760',	'Alexey'),
(10,	'b79a97ffa85c49d4.715aff2a3a122fc90476ac991a75bfceb6ea8c54332aa3c27e1e63f73d5263ad',	'123-56-760',	'Maxim'),
(11,	'0dc53192b00c4c96.69879b0ac01e6b8a8bdafc34ad83dc3e636a9d5320f24ed5aa4a18ed85797e7d',	'123-56-760',	'Ivan'),
(12,	'977361c7f2ab978e.1f4903bd890b48fe6cf2640516b5e37a9d4b48dcf0f68a7193e2cc1c0d9d5c7e',	'123-56-760',	'Alyona'),
(13,	'99221d6b0716ef43.0260c537dfc5c9461fe279018a84f22df81b689b6e58289b320eccc5794e09a7',	'123-56-760',	'Marina');

-- 2024-03-07 02:55:09
