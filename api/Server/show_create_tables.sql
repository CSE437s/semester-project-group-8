-- Create Database
CREATE DATABASE LiftingApp;


--Show create tables
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `goal` varchar(100) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `gender` tinyint(1) DEFAULT NULL,
  `intensity` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE LiftingApp.Lift (
	lift_id INT auto_increment NOT NULL,
	lift_name varchar(100) NOT NULL,
	CONSTRAINT Lift_PK PRIMARY KEY (lift_id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE LiftingApp.Exercise (
	exercise_id INT auto_increment NOT NULL,
	user_id INT NOT NULL,
	lift_id INT NOT NULL,
	set_num INT NOT NULL,
	rep_num INT NOT NULL,
	weight FLOAT NOT NULL,
	sleep_quality INT NULL,
	stress_level INT NULL,
	`date` DATE NOT NULL,
	CONSTRAINT Exercise_PK PRIMARY KEY (exercise_id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;


