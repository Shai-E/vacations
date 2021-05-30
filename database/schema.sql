
CREATE DATABASE vacations_db_se;

USE vacations_db_se;

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `is_admin` bool NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
);

INSERT INTO `users` VALUES 
  (1,'admin','Mr.','Admin','$2b$10$Dw/3MplTbFS3ornPH4UTgeMEBdm5X2N35nzloNYWlQeF6hY0PPoru',1),
  (2,'user1','John','Doe','$2b$10$Dw/3MplTbFS3ornPH4UTgeMEBdm5X2N35nzloNYWlQeF6hY0PPoru',0),
  (3,'user2','Jane','Doe','$2b$10$Dw/3MplTbFS3ornPH4UTgeMEBdm5X2N35nzloNYWlQeF6hY0PPoru',0);

CREATE TABLE `vacations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(255) NOT NULL,
  `destination` varchar(255) NOT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `price` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO `vacations` VALUES 
  (1,'A boot-shaped peninsula in the heart of the Mediterranean Sea. Italy boasts one of the longest coastlines in the world and around 248 beaches of Italy have been awarded the Blue Flag status for their clear emerald waters and unspoiled sands.','Italy','4ecb145a-999f-49dc-afe4-f36b370d1144.jpg','2021-10-09','2021-10-21',2500.00),
  (2,'Israel is a country of immense natural beauty, world-class culture, unbeatable history, and amazing people.','Israel','997680fa-b2ee-4517-a1c1-394344431fce.jpg','2021-06-06','2021-06-19',5000.00),
  (3,'Offers a fabulous historic heritage and diversified natural environment. Its tourist attractions illustrate the history of the human race, including medieval castles and cathedrals and the nineteenth century Eiffel Tower.','France','dae3b53c-a5c9-4ae7-92a2-c9b05e78301b.jpg','2021-07-25','2021-08-01',3500.00),
  (4,"The world's largest country offers it all, from historic cities and idyllic countryside to artistic riches, epic train rides and vodka-fuelled nightlife.",'Russia','796650c7-2df5-44db-b44e-10326040b993.webp','2021-10-09','2021-10-21',2509.90),
  (5,'A successful fusion of the modern and the ancient, Japan has managed to maintain age-old traditions while becoming one of the most advanced countries in the world. Experience an utterly different culture and surrender yourself to the unfamiliar.','Japan','3eca9afd-825f-4a6f-9bcf-188d2832b70e.jpg','2021-06-01','2021-06-04',5350.00),
  (6,'One of the largest and most diverse countries in the world, with destinations ranging from the skyscrapers of New York and Chicago, the natural wonders of Yellowstone and Alaska to the sunny beaches of California, Florida and Hawaii.','USA','2cadabe4-6ec1-42ad-8b77-320cf434546d.jpg','2021-09-05','2021-09-23',10000.50);

CREATE TABLE `followers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `vacation_id` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_vacation_id_for_followers_idx` (`vacation_id`),
  KEY `fk_user_id_for_followers_idx` (`user_id`),
  CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_vacation_id` FOREIGN KEY (`vacation_id`) REFERENCES `vacations` (`id`) ON DELETE CASCADE
);

INSERT INTO `followers` VALUES (1, 1, 2),(2, 1, 3),(3, 4, 2),(4, 3, 2);

CREATE TABLE `tokens` (
  `id` int NOT NULL AUTO_INCREMENT,
  `token` varchar(255) NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_id_for_tokens_idx` (`user_id`),
  CONSTRAINT `fk_user_id_for_tokens` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
);
