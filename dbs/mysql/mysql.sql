-- MySQL dump 10.13  Distrib 8.0.18, for Win64 (x86_64)
--
-- Host: localhost    Database: shop_p
-- ------------------------------------------------------
-- Server version	8.0.18

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admins` (
  `id_admin` int(11) NOT NULL,
  `name_admin` varchar(45) NOT NULL,
  `pessword_admin` varchar(45) NOT NULL,
  PRIMARY KEY (`id_admin`),
  UNIQUE KEY `name_UNIQUE` (`name_admin`),
  UNIQUE KEY `id_UNIQUE` (`id_admin`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
INSERT INTO `admins` VALUES (1259347892,'admin','admin123');
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders_table`
--

DROP TABLE IF EXISTS `orders_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders_table` (
  `order_id` int(11) NOT NULL AUTO_INCREMENT,
  `order_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` varchar(45) NOT NULL,
  `user_name` varchar(45) NOT NULL,
  `__order__` varchar(5000) DEFAULT NULL,
  `order_address` varchar(450) DEFAULT NULL,
  `card_N` varchar(9) DEFAULT NULL,
  `exp_date` varchar(7) DEFAULT NULL,
  `finale_price` varchar(45) DEFAULT '0',
  `user_comment` varchar(4500) DEFAULT NULL,
  `shipping_date` datetime DEFAULT NULL,
  `done` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`order_id`,`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders_table`
--

LOCK TABLES `orders_table` WRITE;
/*!40000 ALTER TABLE `orders_table` DISABLE KEYS */;
INSERT INTO `orders_table` VALUES (31,'2020-04-20 17:47:07','5e9d91e3156e5a11308b6abd','Dddd Eeee','{\"wl\":[{\"amount\":1,\"_id\":\"5e9db5bed2e6d01f08fe15b4\",\"item_id\":\"5e6784b73faf8c4ac4e0c85e\",\"image\":\"https://horizon.com/wp-content/uploads/horizon-organic-whole-milk.jpg\",\"name\":\"Milk\",\"for_quantity\":1.5,\"for_measure\":\"liters\",\"category\":\"Milk & Eggs\",\"price\":12.3},{\"amount\":1,\"_id\":\"5e9db5bed2e6d01f08fe15b5\",\"item_id\":\"5e6785dc3faf8c4ac4e0c85f\",\"image\":\"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSddOoIuKSL-MYH-IPHQurhtrOkjnel-9CPvbumR6zrV389K7rV\",\"name\":\"Coconut Milk\",\"for_quantity\":1.5,\"for_measure\":\"liter\",\"category\":\"Milk & Eggs\",\"price\":16.7}]}','{\"city\":\"Petah Toqwa\",\"street\":\"Tfdsa st.\",\"house\":\"12\",\"apartments\":\"21\",\"phone_num\":1245631234}','9876543','1/2020','29.00','hbe., lmrel erje; j','2020-04-09 00:00:00',1),(32,'2020-04-21 15:55:35','5e9ead9fe084414bc8bdb026','Julia F','{\"wl\":[{\"amount\":3,\"_id\":\"5e9ebed1c38b8830f0cd5871\",\"item_id\":\"5e6785dc3faf8c4ac4e0c85f\",\"image\":\"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSddOoIuKSL-MYH-IPHQurhtrOkjnel-9CPvbumR6zrV389K7rV\",\"name\":\"Coconut Milk\",\"for_quantity\":1.5,\"for_measure\":\"liter\",\"category\":\"Milk & Eggs\",\"price\":16.7},{\"amount\":1,\"_id\":\"5e9ebed7c38b8830f0cd5872\",\"item_id\":\"5e6784b73faf8c4ac4e0c85e\",\"image\":\"https://horizon.com/wp-content/uploads/horizon-organic-whole-milk.jpg\",\"name\":\"Milk\",\"for_quantity\":1.5,\"for_measure\":\"liters\",\"category\":\"Milk & Eggs\",\"price\":12.3}]}','{\"country\":\"Israel\",\"_id\":\"5e9edb2b52bbc62a2cc82946\",\"city\":\"Petah Toqwa\",\"street\":\"Mshe Sneh st.\",\"house\":\"3\",\"apartments\":\"4\",\"phone_num\":123456789}','123456789','02/2020','45.2','no comments','2020-04-26 00:00:00',0);
/*!40000 ALTER TABLE `orders_table` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-04-21 17:26:36
