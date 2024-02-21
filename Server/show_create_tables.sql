-- Create Database
CREATE DATABASE LiftingApp;


--Show create tables
CREATE TABLE LiftingApp.users (
	id INT auto_increment NOT NULL,
	username varchar(100) NOT NULL,
	password varchar(100) NOT NULL,
	CONSTRAINT id PRIMARY KEY (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;


