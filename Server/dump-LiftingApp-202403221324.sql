-- MySQL dump 10.13  Distrib 8.3.0, for macos14.2 (arm64)
--
-- Host: localhost    Database: LiftingApp
-- ------------------------------------------------------
-- Server version	8.3.0

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
-- Table structure for table `Exercise`
--

DROP TABLE IF EXISTS `Exercise`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Exercise` (
  `exercise_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `lift_id` int NOT NULL,
  `set_num` int NOT NULL,
  `rep_num` int NOT NULL,
  `weight` float NOT NULL,
  `sleep_quality` int DEFAULT NULL,
  `stress_level` int DEFAULT NULL,
  `date` date NOT NULL,
  `desire_to_train` int DEFAULT NULL,
  `rpe` float NOT NULL,
  PRIMARY KEY (`exercise_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Exercise`
--

LOCK TABLES `Exercise` WRITE;
/*!40000 ALTER TABLE `Exercise` DISABLE KEYS */;
INSERT INTO `Exercise` VALUES (1,0,0,1,5,100,NULL,NULL,'2024-02-27',NULL,0),(6,0,0,1,10,50,NULL,NULL,'2024-02-28',NULL,0),(7,0,0,1,8,6,NULL,NULL,'2024-03-04',NULL,0),(8,0,0,1,8,6,NULL,NULL,'2024-03-04',NULL,0),(9,0,0,2,10,5,NULL,NULL,'2024-03-04',NULL,0),(10,0,0,1,8,6,NULL,NULL,'2024-03-04',NULL,0),(11,0,0,2,10,5,NULL,NULL,'2024-03-04',NULL,0),(12,0,0,1,2,1,NULL,NULL,'2024-03-04',NULL,0);
/*!40000 ALTER TABLE `Exercise` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Lift`
--

DROP TABLE IF EXISTS `Lift`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Lift` (
  `lift_id` int NOT NULL AUTO_INCREMENT,
  `lift_name` varchar(100) NOT NULL,
  PRIMARY KEY (`lift_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Lift`
--

LOCK TABLES `Lift` WRITE;
/*!40000 ALTER TABLE `Lift` DISABLE KEYS */;
INSERT INTO `Lift` VALUES (1,'Bench Press'),(2,'Squat'),(3,'Deadlift'),(4,'Lat Pulldowns'),(5,'Bicep Curls'),(6,'Leg Extensions');
/*!40000 ALTER TABLE `Lift` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `RPE`
--

DROP TABLE IF EXISTS `RPE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `RPE` (
  `10` double DEFAULT NULL,
  `9.5` double DEFAULT NULL,
  `9` double DEFAULT NULL,
  `8.5` double DEFAULT NULL,
  `8` double DEFAULT NULL,
  `7.5` double DEFAULT NULL,
  `7` double DEFAULT NULL,
  `6.5` double DEFAULT NULL,
  `6` double DEFAULT NULL,
  `reps` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RPE`
--

LOCK TABLES `RPE` WRITE;
/*!40000 ALTER TABLE `RPE` DISABLE KEYS */;
INSERT INTO `RPE` VALUES (1,0.978,955,939,0.922,0.907,0.892,0.878,0.863,1),(0.955,0.939,0.922,0.907,0.892,0.878,0.863,0.85,0.837,2),(0.922,0.907,0.892,0.878,0.863,0.85,0.837,0.824,0.811,3),(0.892,0.878,0.863,0.85,0.837,0.824,0.811,0.799,0.786,4),(0.863,0.85,0.837,0.824,0.811,0.799,0.786,0.774,0.762,5),(0.837,0.824,0.811,0.799,0.786,0.774,0.762,0.751,0.739,6),(0.811,0.799,0.786,0.774,0.762,0.751,0.739,0.723,0.707,7),(0.786,0.774,0.762,0.751,0.739,0.723,0.707,0.694,0.68,8),(0.762,0.751,0.739,0.723,0.707,0.694,0.68,0.667,0.653,9),(0.739,0.723,0.707,0.694,0.68,0.667,0.653,0.64,0.626,10),(0.707,0.694,0.68,0.667,0.653,0.64,0.626,0.613,0.599,11),(0.68,0.667,0.653,0.64,0.626,0.613,0.599,0.586,0.574,12);
/*!40000 ALTER TABLE `RPE` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `goal` varchar(100) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `gender` tinyint(1) DEFAULT NULL,
  `intensity` int DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `verified` tinyint(1) DEFAULT NULL,
  `verificationcode` bigint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2,'gtlien1','$2b$10$NM9x2OnRf/QQ9MnZY0yriuFPLyKuBha1XA6/VQJQQ9b/8nBAUCDVm',NULL,NULL,NULL,NULL,'gtlien1@gmail.com',1,NULL),(9,'gtlienbit','$2b$10$vB/oC80.WRCnGlAv10lkK.Gudf/HxOneS2KXG9TzCZnghuYJfnVMW',NULL,NULL,NULL,NULL,'gtlienbit@gmail.com',1,NULL),(10,'user10','$2b$10$LkYc86GiTZTRwW6sRcAO3uE0eqi4skKRAoXrJibsBOrQZxIYftxi6',NULL,NULL,NULL,NULL,'gtlien1@gmail.com',0,NULL),(15,'gtlien7','$2b$10$LFys4/kxsSFG/kKBGkqTHelXVWZGNX39VMI6W0V2s3Zz9LY/1uDDq',NULL,NULL,NULL,NULL,'gtlien1@gmail.com',0,25534),(16,'gtlien2','$2b$10$JwHF58fCAwNp9bMJv3hnE.hvBp1TMNjHw5znIyExihjQyiCJ4eCDG',NULL,NULL,NULL,NULL,'gtlien1@gmail.com',1,93968),(17,'testuser','$2b$10$7RZXNHw7LJJw0tss8kCkuOIUpT8hRniCG6nXR3R6pV6udKUjtPvGS',NULL,NULL,NULL,NULL,'',0,96909),(18,'testuser1','$2b$10$0WWNkpf/whkcT3sVDS49lu5jZjXQqbJVKL3Dfe1GN.ip3Ucy2wEYm',NULL,NULL,NULL,NULL,'gtlien1@gmail.com',0,92356),(19,'testuser2','$2b$10$GIC4N/dTfdCk0ZUNW13uLOhRKMSymN3ZkKOlrZ.E26.vqUK49XiWK',NULL,NULL,NULL,NULL,'gtlien1@gmail.com',0,65102),(20,'user5','$2b$10$6BDSlrTLM2lX/H1ZmGK7QeRK51VOefcMCHH44yfMtJh784x7olN9W',NULL,NULL,NULL,NULL,'g.lien@wustl.edu',0,93358),(21,'user6','$2b$10$BY/bIuJmePJWgnkkiZL2XewBrDKDoiwKQQGvtuwoGoNiLLs8UbeGq',NULL,NULL,NULL,NULL,'',0,36009),(22,'user7','$2b$10$/5QnQMsFLyiDThk7srMquugNNJMb6nzwOTBGRHxAdo7ZeMHrq7mf6',NULL,NULL,NULL,NULL,'gtlien1@gmail.com',0,81911),(23,'sam','$2b$10$CkgE.z3ly1hy19xDiJP0X.n/pKkaQ5Mu12fgfYdFKrBxkHSL7G6hu',NULL,NULL,NULL,NULL,'sfeng@wustl.edu',0,53261),(24,'user4','$2b$10$z3tJ8GwBhWwn.egfHdabceNrjqlIr/jzJKcfK/gsoa4hiQCwun1Xi',NULL,NULL,NULL,NULL,'gtlien1@gmail.com',0,36673),(25,'samfeng','$2b$10$1nm/bXhXeIoxpgZpnEmXsuO1i/s7QsaVVkxI8jAqYyRbIo/MaqC2O',NULL,NULL,NULL,NULL,'samuelfeng03@gmail.com',1,44525),(26,'geoffrey','$2b$10$AM7SmkhBfIoX.7LfdSD1AuuiWdFkT3zUL2als2IWJONAeuKvW1IGe',NULL,NULL,NULL,NULL,'gtlien1@gmail.com',1,43099);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'LiftingApp'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-22 13:24:05
