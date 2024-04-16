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
) ENGINE=InnoDB AUTO_INCREMENT=128 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Exercise`
--

LOCK TABLES `Exercise` WRITE;
/*!40000 ALTER TABLE `Exercise` DISABLE KEYS */;
INSERT INTO `Exercise` VALUES (104,2,1,1,9,100,1,1,'2024-04-02',1,9),(105,2,1,2,10,90,1,1,'2024-04-02',1,7),(106,2,1,3,10,90,1,1,'2024-04-02',1,8),(107,2,5,1,9,40,1,1,'2024-04-02',1,8),(108,2,1,1,9,100,1,1,'2024-04-02',1,7),(109,2,1,2,10,100,1,1,'2024-04-02',1,8),(110,2,1,2,10,100,1,1,'2024-04-02',1,8),(111,2,1,1,8,200,4,4,'2024-04-03',1,7),(112,2,1,2,10,190,4,4,'2024-04-03',1,10),(113,2,1,3,10,170,4,4,'2024-04-03',1,7),(114,2,5,1,9,25,4,4,'2024-04-03',1,9),(115,2,4,1,9,100,1,1,'2024-04-09',1,7.5),(116,2,4,2,10,95,1,1,'2024-04-09',1,8),(117,2,4,3,10,95,1,1,'2024-04-09',1,8),(118,2,3,1,10,7,1,1,'2024-04-09',1,8.5),(119,2,3,2,10,5,1,1,'2024-04-09',1,8),(120,2,5,1,10,10,1,1,'2024-04-10',1,10),(121,2,4,1,9,10,1,1,'2024-04-10',1,7.5),(122,1,2,1,1,500,10,10,'2024-04-15',10,6),(123,1,2,1,1,500,10,10,'2024-04-15',10,6),(124,1,2,1,1,500,1,1,'2024-04-15',1,6),(125,1,2,1,1,500,1,1,'2024-04-15',1,6),(126,1,2,1,1,500,1,1,'2024-04-15',1,6),(127,1,2,1,1,500,1,1,'2024-04-15',1,6);
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
  `description` mediumtext,
  `link` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`lift_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Lift`
--

LOCK TABLES `Lift` WRITE;
/*!40000 ALTER TABLE `Lift` DISABLE KEYS */;
INSERT INTO `Lift` VALUES (1,'Bench Press','The bench press, or chest press, is a weight training exercise where a person presses a weight upwards while lying horizontally on a weight training bench. Although the bench press is a compound movement, the muscles primarily used are the pectoralis major, the anterior deltoids, and the triceps, among other stabilizing muscles. A barbell is generally used to hold the weight, but a pair of dumbbells can also be used.[1]','https://www.youtube.com/watch?v=vcBig73ojpE&pp=ygUSaG93IHRvIGJlbmNoIHByZXNz'),(2,'Squat','A squat is a strength exercise in which the trainee lowers their hips from a standing position and then stands back up. During the descent, the hip and knee joints flex while the ankle joint dorsiflexes; conversely the hip and knee joints extend and the ankle joint plantarflexes when standing up. Squats also help the hip muscles.','https://www.youtube.com/watch?v=bEv6CCg2BC8'),(3,'Deadlift','The deadlift is a weight training exercise in which a loaded barbell or bar is lifted off the ground to the level of the hips, torso perpendicular to the floor, before being placed back on the ground. It is one of the three powerlifting exercises, along with the squat and bench press,[1] as well as a frequent lift in strongman.','https://www.youtube.com/watch?v=VL5Ab0T07e4'),(4,'Lat Pulldowns','The pull-down exercise is a strength training exercise designed to develop the latissimus dorsi muscle. It performs the functions of downward rotation and depression of the scapulae combined with adduction and extension of the shoulder joint. The standard pull-down motion is a compound movement that requires dynamic work by muscles surrounding the three joints which move during the exercise. These are the elbow in conjunction with the glenohumeral and scapulothoracic joints in the shoulder girdle','https://www.youtube.com/watch?v=SALxEARiMkw'),(5,'Bicep Curls','Bicep curls are a group of weight training exercises in which a person bends their arm towards their body at the elbow in order to make their biceps stronger. The bicep curl mainly targets the biceps brachii, brachialis and brachioradialis muscles. The biceps is stronger at elbow flexion when the forearm is supinated (palms turned upward) and weaker when the forearm is pronated.[1] The brachioradialis is at its most effective when the palms are facing inward, and the brachialis is unaffected by forearm rotation. Therefore, the degree of forearm rotation affects the degree of muscle recruitment between the three muscles.','https://www.youtube.com/watch?v=i1YgFZB6alI'),(6,'Leg Extensions','The leg extension is a resistance weight training exercise that targets the quadriceps muscle (m. quadriceps femoris)[1] in the legs. The exercise is done using a machine called the Leg Extension Machine. There are various manufacturers of these machines and each one is slightly different. Most gym and weight rooms will have the machine in their facility. The leg extension is an isolated exercise targeting one specific muscle group, the quadriceps. It should not be considered as a total leg workout, such as the squat or deadlift.','https://www.youtube.com/watch?v=YyvSfVjQeL0'),(7,'Treadmill','A treadmill is a device generally used for walking, running, or climbing while staying in the same place. The belt moves to the rear, requiring the user to walk or run at a speed matching the belt. The rate at which the belt moves is the rate of walking or running. Thus, the speed of running may be controlled and measured.','https://www.youtube.com/watch?v=8i3Vrd95o2k'),(8,'Elliptical','An elliptical trainer or cross-trainer is a stationary exercise machine used to stair climb, walk, or run without causing excessive pressure to the joints, hence decreasing the risk of impact injuries. Elliptical trainers offer a non-impact cardiovascular workout that can vary from light to high intensity based on the speed of the exercise and the resistance preference set by the user.','https://www.youtube.com/watch?v=j38LNpTLwzY'),(9,'Bike','Exercise bikes are used for exercise, to increase general fitness, for weight loss, and for training for cycle events. The exercise bike has long been used for physical therapy because of the low-impact, safe, and effective cardiovascular exercise it provides. The low-impact movement involved in operating an exercise bike does not put much stress on joints and does not involve sporadic motions that some other fitness equipment may require.','https://www.youtube.com/watch?v=jhPqTyejY_0'),(10,'Pull ups','A pull-up is an upper-body strength exercise. The pull-up is a closed-chain movement where the body is suspended by the hands, gripping a bar or other implement at a distance typically wider than shoulder-width, and pulled up. As this happens, the elbows flex and the shoulders adduct and extend to bring the elbows to the torso.\nPull-ups build up several muscles of the upper body, including the latissimus dorsi, trapezius, and biceps brachii. A pull-up may be performed with overhand (pronated), underhand (supinated)—sometimes referred to as a chin-up—neutral, or rotating hand position.','https://www.youtube.com/watch?v=eGo4IYlbE5g'),(11,'Face Pulls','The face pull is a weight training exercise that primarily targets the musculature of the upper back and shoulders, namely the posterior deltoids, trapezius, rhomboids, as well as the infraspinatus and teres minor muscles of the rotator cuff.[1] The face pull is considered an important exercise for shoulder health and stability. The face pull is often performed standing using a cable machine and rope attachment, with the subject rowing the rope attachment towards the face, with the elbows flared outwards.[2] The exercise can, however, also be performed seated or with resistance bands.','https://www.youtube.com/watch?v=ljgqer1ZpXg'),(12,'Rows','In strength training, rowing (or a row, usually preceded by a qualifying adjective — for instance a cable seated row, barbell upright row, dumbbell bent-over row, T-bar rows, et cetera) is an exercise where the purpose is to strengthen the muscles that draw the rower\'s arms toward the body (latissimus dorsi) as well as those that retract the scapulae (trapezius and rhomboids) and those that support the spine (erector spinae). When done on a rowing machine, rowing also exercises muscles that extend and support the legs (quadriceps[1] and thigh muscles[2]). In all cases, the abdominal and lower back muscles[3] must be used in order to support the body and prevent back injury.','https://www.youtube.com/watch?v=kBWAon7ItDw'),(13,'Dips','To perform a dip, the exerciser supports themselves on a dip bar with their arms straight down and shoulders over their hands, then lowers their body until their arms are bent to a 90 degree angle at the elbows, and then lifts their body up, returning to the starting position.','https://www.youtube.com/watch?v=vi1-BOcj3cQ'),(14,'Tricep Pushdowns','A push-down is a strength training exercise used for strengthening the triceps muscles in the back of the arm. This exercise can also be called a triceps push-down or a two-armed standing triceps extension.\nThe exercise is completed by pushing an object downward against resistance. This exercise is an example of the primary function of the triceps, the extension of the elbow joint.','https://www.youtube.com/watch?v=2-LAMcpzODU'),(15,'Leg Raises','The leg raise is a strength training exercise which targets the iliopsoas (the anterior hip flexors). Because the abdominal muscles are used isometrically to stabilize the body during the motion, leg raises are also often used to strengthen the rectus abdominis muscle and the internal and external oblique muscles.','https://www.youtube.com/watch?v=JB2oyawG9KI');
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
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2,'gtlien1','$2b$10$NM9x2OnRf/QQ9MnZY0yriuFPLyKuBha1XA6/VQJQQ9b/8nBAUCDVm','10','2002-07-25',1,NULL,'gtlien1@gmail.com',1,NULL,NULL),(9,'gtlienbit','$2b$10$vB/oC80.WRCnGlAv10lkK.Gudf/HxOneS2KXG9TzCZnghuYJfnVMW',NULL,NULL,NULL,NULL,'gtlienbit@gmail.com',1,NULL,NULL),(10,'user10','$2b$10$LkYc86GiTZTRwW6sRcAO3uE0eqi4skKRAoXrJibsBOrQZxIYftxi6',NULL,NULL,NULL,NULL,'gtlien1@gmail.com',0,NULL,NULL),(15,'gtlien7','$2b$10$LFys4/kxsSFG/kKBGkqTHelXVWZGNX39VMI6W0V2s3Zz9LY/1uDDq',NULL,NULL,NULL,NULL,'gtlien1@gmail.com',0,25534,NULL),(16,'gtlien2','$2b$10$JwHF58fCAwNp9bMJv3hnE.hvBp1TMNjHw5znIyExihjQyiCJ4eCDG',NULL,NULL,NULL,NULL,'gtlien1@gmail.com',1,93968,NULL),(17,'testuser','$2b$10$7RZXNHw7LJJw0tss8kCkuOIUpT8hRniCG6nXR3R6pV6udKUjtPvGS',NULL,NULL,NULL,NULL,'',0,96909,NULL),(18,'testuser1','$2b$10$0WWNkpf/whkcT3sVDS49lu5jZjXQqbJVKL3Dfe1GN.ip3Ucy2wEYm',NULL,NULL,NULL,NULL,'gtlien1@gmail.com',0,92356,NULL),(19,'testuser2','$2b$10$GIC4N/dTfdCk0ZUNW13uLOhRKMSymN3ZkKOlrZ.E26.vqUK49XiWK',NULL,NULL,NULL,NULL,'gtlien1@gmail.com',0,65102,NULL),(20,'user5','$2b$10$6BDSlrTLM2lX/H1ZmGK7QeRK51VOefcMCHH44yfMtJh784x7olN9W',NULL,NULL,NULL,NULL,'g.lien@wustl.edu',0,93358,NULL),(21,'user6','$2b$10$BY/bIuJmePJWgnkkiZL2XewBrDKDoiwKQQGvtuwoGoNiLLs8UbeGq',NULL,NULL,NULL,NULL,'',0,36009,NULL),(22,'user7','$2b$10$/5QnQMsFLyiDThk7srMquugNNJMb6nzwOTBGRHxAdo7ZeMHrq7mf6',NULL,NULL,NULL,NULL,'gtlien1@gmail.com',0,81911,NULL),(23,'sam','$2b$10$CkgE.z3ly1hy19xDiJP0X.n/pKkaQ5Mu12fgfYdFKrBxkHSL7G6hu',NULL,NULL,NULL,NULL,'sfeng@wustl.edu',0,53261,NULL),(24,'user4','$2b$10$z3tJ8GwBhWwn.egfHdabceNrjqlIr/jzJKcfK/gsoa4hiQCwun1Xi',NULL,NULL,NULL,NULL,'gtlien1@gmail.com',0,36673,NULL),(25,'samfeng','$2b$10$1nm/bXhXeIoxpgZpnEmXsuO1i/s7QsaVVkxI8jAqYyRbIo/MaqC2O',NULL,NULL,NULL,NULL,'samuelfeng03@gmail.com',1,44525,NULL),(26,'geoffrey','$2b$10$AM7SmkhBfIoX.7LfdSD1AuuiWdFkT3zUL2als2IWJONAeuKvW1IGe',NULL,NULL,NULL,NULL,'gtlien1@gmail.com',1,43099,NULL),(27,'lift','$2b$10$4MEpYiPeCDWG3PndNKx2meTEwY/RtEeyE7knDoOP6uqRxUUITGrn.',NULL,NULL,NULL,NULL,'gtlien1@gmail.com',1,97406,NULL),(28,'samfeng1','$2b$10$.Ifwm38L1YFhGupoi4e9EOyUuMWlEqM09VOGaC8uDB2hDGe5xSv7i',NULL,NULL,NULL,NULL,'gtlien1@gmail.com',1,21805,NULL),(29,'samfeng2','$2b$10$oaBGi/MkRQPN8HDwzpd8sOxguZzIi8i2N3ACmCpezl2yF3rAhqy4G',NULL,NULL,NULL,NULL,'gtlien1@gmail.com',0,31088,NULL),(30,'test99','$2b$10$UWRKLSGrC9/8l37zW0HU1eTTYz5UkZ1MlMap2IJAh8KTZkxNMy3ku',NULL,NULL,NULL,NULL,'',0,20442,NULL),(31,'test100','$2b$10$06UbTnwAFnvW07r.XhTcHuCtsWnsUZnsrGPijgVVFN9PIxOwFThB2',NULL,NULL,NULL,NULL,'',0,65778,NULL),(32,'test11','$2b$10$Th4tUEyiXwYi92J/WDI.re4NCoigkNWPpPRuNQplF5VwwJTk4Guoy',NULL,NULL,NULL,NULL,'gtlien1@gmail.com',0,58492,NULL),(33,'test12','$2b$10$y8xb0qolYn1a7dMOf3ny.OJ13D9hFlqabRqYwoQM/M57UBvfwaKDm',NULL,NULL,NULL,NULL,'gtlien1@gmail.com',0,73856,NULL),(34,'test13','$2b$10$I4KRvVlu1/Yc1w1hxUnC4ue2uiXTB4VWwXAw7YRvD6Xlc2yiepzNy',NULL,NULL,NULL,NULL,'gtlien1@gmail.com',0,62325,NULL),(35,'user11','$2b$10$M//QsD0PPF.3hUhMBD0MZuVW.7AqGDjXkjLGCB1mMUdwXu8HQGcAG',NULL,NULL,NULL,NULL,'asd;fkj@gmail.com',0,26355,NULL),(36,'wow','$2b$10$.qtrJYDTsNQilWlVZE97UuEN9dGTKIy5bHk37vm5HaTBLB0tlX1Jq',NULL,NULL,NULL,NULL,'',0,92594,NULL),(37,'test44','$2b$10$DDt76jtB0yJXnUoPEHffse43HI.hLh5u41m28rgKXmEFSqJKCrK06',NULL,NULL,NULL,NULL,'test',0,78598,NULL),(38,'woah','$2b$10$cVBEyYcwBYLVdqZR2jAiL.mJXlZh61SaR2XSLkd4tYKpv0Z0e/lHa',NULL,NULL,NULL,NULL,'woah@gmail.com',0,21698,NULL),(39,'wtf','$2b$10$SJAUNEWj/WFqZFg3Kq31e.sHxUe2HqdoU2Dulgd71Nf2MXyspzpjS',NULL,NULL,NULL,NULL,'',1,77269,NULL),(40,'test102','$2b$10$/DTjzdH.SWqNuPGE1JDaJe2ol6TdmzLl3A0hvwVJCvtUy6uPuvGUC','Muscle Building','2016-04-02',0,9,'gtlien1@gmail.com',1,72740,NULL),(41,'james','$2b$10$yRMey4NPYA6N2fq.OoFnWuZRkGCxtvw8JC/nz0DkIY2Z53KZuNlTm',NULL,NULL,NULL,NULL,'',0,36484,NULL),(42,'james1','$2b$10$.AIaXgGuUZ/omdxuk2XmKOR7DEf98PgoMVQ9Iusi/kDzY6dxGdXG2','Muscle Building','1997-04-02',1,8,'gtlien1@gmail.com',1,71337,NULL),(43,'test79','$2b$10$pmS8tBAC.bv9asnfXwg4ue07YUzioG2Op.jTTt8R3zoAX4ZnyrZjS',NULL,NULL,NULL,NULL,'',0,82746,NULL),(44,'test80','$2b$10$msi88Jrta73obcrxP83vYexs6yiFBop2cJ/vgXPSdomPkkKXBrXRW',NULL,NULL,NULL,NULL,'gtlien1@gmail.com',1,76135,NULL),(45,'geoffrey1','$2b$10$Wsq3RRLiMzXyOTqyN3nHjuPobWKNMPJu8IUc4VwKWm0MYKr80TvkS',NULL,NULL,NULL,NULL,'gtlien1@gmail.com',1,10861,NULL),(46,'whatsup','$2b$10$gzNK2g5prxFas8HrsUlqPOFwWb195TjCjri30tw87lRE3SVZCd672',NULL,NULL,NULL,NULL,'gtlien1@gmail.com',1,85759,NULL);
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

-- Dump completed on 2024-04-15  0:55:45
