CREATE DATABASE  IF NOT EXISTS `security` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `security`;
-- MySQL dump 10.13  Distrib 8.0.27, for Linux (x86_64)
--
-- Host: localhost    Database: security
-- ------------------------------------------------------
-- Server version	8.0.22

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
-- Table structure for table `space`
--

DROP TABLE IF EXISTS `space`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `space` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uuid` varchar(38) NOT NULL,
  `created_at` datetime NOT NULL,
  `created_by` varchar(38) NOT NULL,
  `updated_at` datetime NOT NULL,
  `updated_by` varchar(38) NOT NULL,
  `status` int NOT NULL,
  `objectable_type` int NOT NULL,
  `objectable_uuid` varchar(38) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_bd0a5a66ff837ceb5ad2e791be` (`uuid`),
  KEY `IDX_USER_UUID` (`uuid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `space`
--

LOCK TABLES `space` WRITE;
/*!40000 ALTER TABLE `space` DISABLE KEYS */;
INSERT INTO `space` VALUES (1,'4d625b30-0d93-4970-bcf0-262d8954e7e9','2021-12-11 17:57:59','f2239ae3-d262-452d-9cd9-5741890fba9b','2021-12-11 17:57:59','f2239ae3-d262-452d-9cd9-5741890fba9b',1,1,'969f1457-b561-4616-a37f-5c715ec42625'),(2,'fb2f1bba-3d0e-4f8d-a6a8-fdad2219ce1e','2021-12-11 17:58:53','f2239ae3-d262-452d-9cd9-5741890fba9b','2021-12-11 17:58:53','f2239ae3-d262-452d-9cd9-5741890fba9b',1,0,NULL),(3,'83ae7ade-42db-4cd8-8f0f-2a1c15ab9a1d','2021-12-11 17:59:07','f2239ae3-d262-452d-9cd9-5741890fba9b','2021-12-11 17:59:07','f2239ae3-d262-452d-9cd9-5741890fba9b',1,2,'799e3ce3-645a-4097-a58d-a6638dd83840');
/*!40000 ALTER TABLE `space` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(200) NOT NULL,
  `password` varchar(255) NOT NULL,
  `salt` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `created_by` varchar(38) NOT NULL,
  `updated_at` datetime NOT NULL,
  `updated_by` varchar(38) NOT NULL,
  `uuid` varchar(38) NOT NULL,
  `status` int NOT NULL,
  `roles` text NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`),
  UNIQUE KEY `IDX_a95e949168be7b7ece1a2382fe` (`uuid`),
  KEY `IDX_USER_EMAIL` (`email`),
  KEY `IDX_USER_UUID` (`uuid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'dev@test.com','$2b$10$I.XOuuZGfx/MMQ1idGUsKe9PPeMTc8ixcjmE6.KZV9uSuLvrw4bZi','$2b$10$I.XOuuZGfx/MMQ1idGUsKe','2021-12-11 17:46:23','e7b61069-29da-4d2d-ab37-a01d822ca1b7','2021-12-11 17:46:23','e7b61069-29da-4d2d-ab37-a01d822ca1b7','e7b61069-29da-4d2d-ab37-a01d822ca1b7',1,'USER'),(2,'dev@dev.com','$2b$10$eQFf5lP7FHCblmpZAfLR9eMS4ujRH0DN39ayp5d.jCbsdOubLpnzi','$2b$10$eQFf5lP7FHCblmpZAfLR9e','2021-12-11 17:47:07','f2239ae3-d262-452d-9cd9-5741890fba9b','2021-12-11 17:47:07','f2239ae3-d262-452d-9cd9-5741890fba9b','f2239ae3-d262-452d-9cd9-5741890fba9b',1,'SUPER_ADMIN');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user-to-space`
--

DROP TABLE IF EXISTS `user-to-space`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user-to-space` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime NOT NULL,
  `created_by` varchar(38) NOT NULL,
  `permissions` text NOT NULL,
  `userId` int DEFAULT NULL,
  `spaceId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_a90c63b1853bc6b7f1f7041936c` (`userId`),
  KEY `FK_7e68972ca5ab6f2f3d4dcf58d64` (`spaceId`),
  CONSTRAINT `FK_7e68972ca5ab6f2f3d4dcf58d64` FOREIGN KEY (`spaceId`) REFERENCES `space` (`id`),
  CONSTRAINT `FK_a90c63b1853bc6b7f1f7041936c` FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user-to-space`
--

LOCK TABLES `user-to-space` WRITE;
/*!40000 ALTER TABLE `user-to-space` DISABLE KEYS */;
INSERT INTO `user-to-space` VALUES (1,'2021-12-11 20:52:52','f2239ae3-d262-452d-9cd9-5741890fba9b','ADMIN',2,3);
/*!40000 ALTER TABLE `user-to-space` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-12-12 10:54:03
