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
-- Table structure for table `pl_category`
--

DROP TABLE IF EXISTS `pl_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pl_category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `list_id` int NOT NULL,
  `name` varchar(50) NOT NULL,
  `disp_order` int NOT NULL,
  `create_dt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_dt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `list_category_idx` (`list_id`),
  CONSTRAINT `list_category` FOREIGN KEY (`list_id`) REFERENCES `pl_list` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pl_category`
--

LOCK TABLES `pl_category` WRITE;
/*!40000 ALTER TABLE `pl_category` DISABLE KEYS */;
INSERT INTO `pl_category` VALUES (1,1,'Clothing',1,'2025-08-04 15:33:59','2025-08-21 13:13:55'),(2,1,'Beauty/Grooming',2,'2025-08-04 15:48:50','2025-08-21 13:14:13'),(3,1,'Medical',3,'2025-08-21 13:15:13','2025-08-21 13:15:13'),(4,1,'Miscellaneous',4,'2025-08-21 13:15:14','2025-08-21 13:15:14'),(12,16,'Clothing',1,'2025-08-29 14:22:45','2025-08-29 14:22:45'),(13,16,'Beauty/Grooming',2,'2025-08-29 14:22:45','2025-08-29 14:22:45'),(14,16,'Medical',3,'2025-08-29 14:22:45','2025-08-29 14:22:45'),(16,16,'Miscellaneous',5,'2025-08-29 14:22:45','2025-08-29 14:22:45'),(40,24,'Clothes',1,'2026-03-22 14:21:17','2026-03-22 14:21:17'),(41,24,'Medical/Grooming',2,'2026-03-22 14:21:17','2026-03-22 14:21:17'),(42,24,'Travel',3,'2026-03-22 14:21:17','2026-03-22 14:21:17'),(43,24,'Sleep',4,'2026-03-22 14:21:17','2026-03-22 14:21:17'),(44,24,'Miscellaneous',5,'2026-03-22 14:21:17','2026-03-22 14:21:17'),(45,25,'Clothes',1,'2026-03-22 14:22:00','2026-03-22 14:22:00'),(46,25,'Medical/Grooming',2,'2026-03-22 14:22:00','2026-03-22 14:22:00'),(47,25,'Travel',3,'2026-03-22 14:22:00','2026-03-22 14:22:00'),(48,25,'Sleep',4,'2026-03-22 14:22:00','2026-03-22 14:22:00'),(49,25,'Miscellaneous',5,'2026-03-22 14:22:00','2026-03-22 14:22:00'),(50,26,'asdf',1,'2026-03-24 10:35:17','2026-03-24 10:35:17');
/*!40000 ALTER TABLE `pl_category` ENABLE KEYS */;
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
