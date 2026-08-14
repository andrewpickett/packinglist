-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: packinglist
-- ------------------------------------------------------
-- Server version	9.4.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `pl_list`
--

DROP TABLE IF EXISTS `pl_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pl_list` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(36) NOT NULL,
  `name` varchar(50) NOT NULL,
  `disp_order` int NOT NULL,
  `create_dt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_dt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `user_list_idx` (`user_id`),
  CONSTRAINT `user_list` FOREIGN KEY (`user_id`) REFERENCES `pl_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pl_list`
--

LOCK TABLES `pl_list` WRITE;
/*!40000 ALTER TABLE `pl_list` DISABLE KEYS */;
INSERT INTO `pl_list` VALUES (1,'84e13df0-4a22-4fdd-8d33-d21ce833c417','Andrew\'s Packing List',1,'2025-08-04 14:51:09','2025-08-21 13:13:16'),(16,'84e13df0-4a22-4fdd-8d33-d21ce833c417','Jen\'s Packing List',2,'2025-08-29 14:22:45','2025-08-29 14:22:45'),(24,'84e13df0-4a22-4fdd-8d33-d21ce833c417','Jordan\'s Packing List',6,'2026-03-22 14:21:17','2026-03-22 14:21:17'),(25,'84e13df0-4a22-4fdd-8d33-d21ce833c417','Ava\'s Packing List',7,'2026-03-22 14:22:00','2026-03-22 14:22:00'),(26,'84e13df0-4a22-4fdd-8d33-d21ce833c417','Test create',8,'2026-03-24 10:35:17','2026-03-24 10:35:17');
/*!40000 ALTER TABLE `pl_list` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-08-14 10:50:20
