CREATE DATABASE  IF NOT EXISTS `airbnbnetwork` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `airbnbnetwork`;
-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: airbnbnetwork
-- ------------------------------------------------------
-- Server version	9.0.1

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
-- Table structure for table `bid`
--

DROP TABLE IF EXISTS `bid`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bid` (
  `idcleaner` int NOT NULL,
  `idreqest` int NOT NULL,
  PRIMARY KEY (`idcleaner`,`idreqest`),
  KEY `bid_reqestfk_idx` (`idreqest`),
  CONSTRAINT `bid_cleanefk` FOREIGN KEY (`idcleaner`) REFERENCES `cleaner` (`idcleaner`),
  CONSTRAINT `bid_reqestfk` FOREIGN KEY (`idreqest`) REFERENCES `requests` (`idrequest`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bid`
--

LOCK TABLES `bid` WRITE;
/*!40000 ALTER TABLE `bid` DISABLE KEYS */;
/*!40000 ALTER TABLE `bid` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bnbowner`
--

DROP TABLE IF EXISTS `bnbowner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bnbowner` (
  `idbnbowner` int NOT NULL,
  PRIMARY KEY (`idbnbowner`),
  UNIQUE KEY `idbnbowner_UNIQUE` (`idbnbowner`),
  CONSTRAINT `bnbownerfk` FOREIGN KEY (`idbnbowner`) REFERENCES `users` (`idusers`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bnbowner`
--

LOCK TABLES `bnbowner` WRITE;
/*!40000 ALTER TABLE `bnbowner` DISABLE KEYS */;
/*!40000 ALTER TABLE `bnbowner` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cleaner`
--

DROP TABLE IF EXISTS `cleaner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cleaner` (
  `idcleaner` int NOT NULL,
  `Bank Account #` varchar(20) NOT NULL,
  PRIMARY KEY (`idcleaner`),
  UNIQUE KEY `idcleaner_UNIQUE` (`idcleaner`),
  CONSTRAINT `cleanersFK` FOREIGN KEY (`idcleaner`) REFERENCES `users` (`idusers`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cleaner`
--

LOCK TABLES `cleaner` WRITE;
/*!40000 ALTER TABLE `cleaner` DISABLE KEYS */;
/*!40000 ALTER TABLE `cleaner` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cleaner_rating`
--

DROP TABLE IF EXISTS `cleaner_rating`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cleaner_rating` (
  `idorder` int NOT NULL AUTO_INCREMENT,
  `Comment` text,
  `Reliability` tinyint DEFAULT NULL,
  `Satisfaction` tinyint DEFAULT NULL,
  `Cleanliness` tinyint DEFAULT NULL,
  `idcleaner` int NOT NULL,
  PRIMARY KEY (`idorder`,`idcleaner`),
  UNIQUE KEY `idcleaner_rating_UNIQUE` (`idorder`),
  KEY `cleaner_rating_cleanerfk_idx` (`idcleaner`),
  CONSTRAINT `cleaner_rating_cleanerfk` FOREIGN KEY (`idcleaner`) REFERENCES `cleaner` (`idcleaner`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `cleaner_rating_orderfk` FOREIGN KEY (`idorder`) REFERENCES `orders` (`idorders`),
  CONSTRAINT `cleaner_rating_chk_1` CHECK ((`Reliability` between 1 and 5)),
  CONSTRAINT `cleaner_rating_chk_2` CHECK ((`Satisfaction` between 1 and 5)),
  CONSTRAINT `cleaner_rating_chk_3` CHECK ((`Cleanliness` between 1 and 5))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cleaner_rating`
--

LOCK TABLES `cleaner_rating` WRITE;
/*!40000 ALTER TABLE `cleaner_rating` DISABLE KEYS */;
/*!40000 ALTER TABLE `cleaner_rating` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cleaning_tools`
--

DROP TABLE IF EXISTS `cleaning_tools`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cleaning_tools` (
  `idcleaner` int NOT NULL,
  `Cleaning Tools` varchar(100) NOT NULL,
  PRIMARY KEY (`idcleaner`,`Cleaning Tools`),
  CONSTRAINT `cleaning_toolfk` FOREIGN KEY (`idcleaner`) REFERENCES `cleaner` (`idcleaner`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cleaning_tools`
--

LOCK TABLES `cleaning_tools` WRITE;
/*!40000 ALTER TABLE `cleaning_tools` DISABLE KEYS */;
/*!40000 ALTER TABLE `cleaning_tools` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `credit_card`
--

DROP TABLE IF EXISTS `credit_card`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `credit_card` (
  `idowner` int NOT NULL,
  `Card Number` char(16) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Billing Address` varchar(255) NOT NULL,
  `Expiracy Date` date NOT NULL,
  PRIMARY KEY (`idowner`,`Card Number`),
  UNIQUE KEY `idowner_UNIQUE` (`idowner`),
  CONSTRAINT `credit_card_ownerfk` FOREIGN KEY (`idowner`) REFERENCES `bnbowner` (`idbnbowner`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `credit_card`
--

LOCK TABLES `credit_card` WRITE;
/*!40000 ALTER TABLE `credit_card` DISABLE KEYS */;
/*!40000 ALTER TABLE `credit_card` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `debit_card`
--

DROP TABLE IF EXISTS `debit_card`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `debit_card` (
  `idowner` int NOT NULL,
  `Card Number` char(16) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Billing Address` varchar(255) NOT NULL,
  `Expiry Date` date NOT NULL,
  PRIMARY KEY (`idowner`,`Card Number`),
  UNIQUE KEY `idowner_UNIQUE` (`idowner`),
  CONSTRAINT `debit_card_ownerfk` FOREIGN KEY (`idowner`) REFERENCES `bnbowner` (`idbnbowner`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `debit_card`
--

LOCK TABLES `debit_card` WRITE;
/*!40000 ALTER TABLE `debit_card` DISABLE KEYS */;
/*!40000 ALTER TABLE `debit_card` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `idorders` int NOT NULL AUTO_INCREMENT,
  `idrequest` int NOT NULL,
  `idcleaner` int NOT NULL,
  `idowner` int NOT NULL,
  PRIMARY KEY (`idorders`),
  UNIQUE KEY `idorders_UNIQUE` (`idorders`),
  KEY `order_ownerfk_idx` (`idowner`),
  KEY `order_cleanerfk_idx` (`idcleaner`),
  KEY `order_request_idx` (`idrequest`),
  CONSTRAINT `order_cleanerfk` FOREIGN KEY (`idcleaner`) REFERENCES `cleaner` (`idcleaner`),
  CONSTRAINT `order_ownerfk` FOREIGN KEY (`idowner`) REFERENCES `bnbowner` (`idbnbowner`),
  CONSTRAINT `order_request` FOREIGN KEY (`idrequest`) REFERENCES `requests` (`idrequest`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `owner_rating`
--

DROP TABLE IF EXISTS `owner_rating`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `owner_rating` (
  `idorder` int NOT NULL AUTO_INCREMENT,
  `idowner` int NOT NULL,
  `Comment` text,
  `Behavior` tinyint(1) DEFAULT NULL,
  `Professionalism` tinyint(1) DEFAULT NULL,
  `Overall Score` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`idorder`,`idowner`),
  UNIQUE KEY `idowner_rating_UNIQUE` (`idorder`) /*!80000 INVISIBLE */,
  KEY `owner_rate_fk_idx` (`idowner`),
  CONSTRAINT `owner_rating_fk` FOREIGN KEY (`idowner`) REFERENCES `bnbowner` (`idbnbowner`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `owner_rating_order_fk` FOREIGN KEY (`idorder`) REFERENCES `orders` (`idorders`),
  CONSTRAINT `owner_rating_chk_1` CHECK ((`Behavior` between 1 and 5)),
  CONSTRAINT `owner_rating_chk_2` CHECK ((`Professionalism` between 1 and 5))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `owner_rating`
--

LOCK TABLES `owner_rating` WRITE;
/*!40000 ALTER TABLE `owner_rating` DISABLE KEYS */;
/*!40000 ALTER TABLE `owner_rating` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paypal`
--

DROP TABLE IF EXISTS `paypal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `paypal` (
  `idowner` int NOT NULL,
  `Account Number` varchar(20) NOT NULL,
  PRIMARY KEY (`idowner`,`Account Number`),
  UNIQUE KEY `idowner_UNIQUE` (`idowner`),
  CONSTRAINT `paypal_ownerfk` FOREIGN KEY (`idowner`) REFERENCES `bnbowner` (`idbnbowner`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paypal`
--

LOCK TABLES `paypal` WRITE;
/*!40000 ALTER TABLE `paypal` DISABLE KEYS */;
/*!40000 ALTER TABLE `paypal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `property`
--

DROP TABLE IF EXISTS `property`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `property` (
  `idproperty` int NOT NULL AUTO_INCREMENT,
  `idowner` int NOT NULL,
  `Street` varchar(255) DEFAULT NULL,
  `City` varchar(100) DEFAULT NULL,
  `ZIP` char(10) DEFAULT NULL,
  `Property Name` varchar(255) DEFAULT NULL,
  `Size (sqt feet)` int DEFAULT NULL,
  `Number of rooms` int DEFAULT NULL,
  `Type` enum('Apartment','House','Villa','Condo','Townhouse','Bungalow') DEFAULT NULL,
  `CheckInTime` time DEFAULT NULL,
  `CheckoutTime` time DEFAULT NULL,
  PRIMARY KEY (`idproperty`,`idowner`),
  UNIQUE KEY `idproperty_UNIQUE` (`idproperty`),
  KEY `propertyownerFK` (`idowner`),
  CONSTRAINT `propertyownerFK` FOREIGN KEY (`idowner`) REFERENCES `bnbowner` (`idbnbowner`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `property`
--

LOCK TABLES `property` WRITE;
/*!40000 ALTER TABLE `property` DISABLE KEYS */;
/*!40000 ALTER TABLE `property` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `requests`
--

DROP TABLE IF EXISTS `requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `requests` (
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL,
  `idrequest` int NOT NULL AUTO_INCREMENT,
  `ownerid` int NOT NULL,
  `propertyid` int NOT NULL,
  `Payment Amount` decimal(10,2) NOT NULL,
  `Payment Type` enum('Paypal','Credit Card','Debit Card') NOT NULL,
  `Service Description` text,
  `Service date` date NOT NULL,
  PRIMARY KEY (`idrequest`),
  UNIQUE KEY `idrequest_UNIQUE` (`idrequest`),
  KEY `request_ownerfk` (`ownerid`),
  KEY `request_propertyfk` (`propertyid`),
  CONSTRAINT `request_ownerfk` FOREIGN KEY (`ownerid`) REFERENCES `bnbowner` (`idbnbowner`),
  CONSTRAINT `request_propertyfk` FOREIGN KEY (`propertyid`) REFERENCES `property` (`idproperty`),
  CONSTRAINT `requests_chk_1` CHECK ((`Payment Amount` > 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `requests`
--

LOCK TABLES `requests` WRITE;
/*!40000 ALTER TABLE `requests` DISABLE KEYS */;
/*!40000 ALTER TABLE `requests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction`
--

DROP TABLE IF EXISTS `transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaction` (
  `idorder` int NOT NULL,
  `idowner` int NOT NULL,
  `idcleaner` int NOT NULL,
  PRIMARY KEY (`idorder`,`idowner`,`idcleaner`),
  UNIQUE KEY `idorder_UNIQUE` (`idorder`),
  KEY `transaction_ownerfk_idx` (`idowner`),
  KEY `transaction_cleanerfk_idx` (`idcleaner`),
  CONSTRAINT `transaction_cleanerfk` FOREIGN KEY (`idcleaner`) REFERENCES `cleaner` (`idcleaner`),
  CONSTRAINT `transaction_orderfk` FOREIGN KEY (`idorder`) REFERENCES `orders` (`idorders`),
  CONSTRAINT `transaction_ownerfk` FOREIGN KEY (`idowner`) REFERENCES `bnbowner` (`idbnbowner`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction`
--

LOCK TABLES `transaction` WRITE;
/*!40000 ALTER TABLE `transaction` DISABLE KEYS */;
/*!40000 ALTER TABLE `transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `idusers` int NOT NULL AUTO_INCREMENT,
  `First Name` varchar(45) NOT NULL,
  `Middle Initial` char(1) DEFAULT NULL,
  `Last Name` varchar(45) NOT NULL,
  `Email` varchar(45) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `City` varchar(45) DEFAULT NULL,
  `Street` varchar(45) DEFAULT NULL,
  `ZIP` varchar(9) DEFAULT NULL,
  `Phone Number` varchar(15) NOT NULL,
  `Gender` enum('M','F','Other') NOT NULL,
  `Date of Birth` date NOT NULL,
  PRIMARY KEY (`idusers`),
  UNIQUE KEY `idUsers_UNIQUE` (`idusers`),
  UNIQUE KEY `Email_UNIQUE` (`Email`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'New FirstName','A','Smith','new.email@email.com','123456','New York','123 Main St','10001','555111001','M','1985-03-15'),(2,'Emma','B','Johnson','emma.j@email.com','234567','Los Angeles','456 Oak Ave','90001','555111002','F','1990-07-22'),(3,'Michael','C','Williams','mike.w@email.com','345678','Chicago','789 Pine Rd','60601','555111003','M','1988-11-30'),(4,'Sarah','D','Brown','sarah.b@email.com','456789','Houston','321 Elm St','77001','555111004','F','1992-04-18'),(5,'David','E','Jones','david.j@email.com','567890','Phoenix','654 Maple Dr','85001','555111005','M','1987-09-25'),(6,'Lisa','F','Garcia','lisa.g@email.com','678901','Philadelphia','987 Cedar Ln','19101','555111006','F','1993-01-12'),(7,'James','G','Miller','james.m@email.com','789012','San Antonio','147 Birch St','78201','555111007','M','1986-06-28'),(8,'Jennifer','H','Davis','jen.d@email.com','890123','San Diego','258 Willow Ave','92101','555111008','F','1991-12-05'),(9,'Robert','I','Rodriguez','rob.r@email.com','901234','Dallas','369 Oak St','75201','555111009','M','1989-08-14'),(10,'Michelle','J','Martinez','michelle.m@email.com','112233','San Jose','741 Pine Ave','95101','555111010','F','1994-02-19'),(11,'William','K','Hernandez','will.h@email.com','223344','Austin','852 Maple St','73301','555111011','M','1987-07-08'),(12,'Patricia','L','Lopez','pat.l@email.com','334455','Jacksonville','963 Cedar Ave','32201','555111012','F','1992-11-27'),(13,'Thomas','M','Gonzales','tom.g@email.com','445566','Fort Worth','159 Birch Rd','76101','555111013','M','1986-03-16'),(14,'Elizabeth','N','Wilson','beth.w@email.com','556677','Columbus','753 Willow Dr','43201','555111014','F','1993-09-04'),(15,'Joseph','O','Anderson','joe.a@email.com','667788','Charlotte','951 Oak Ln','28201','555111015','M','1988-12-21'),(16,'Nancy','P','Thomas','nancy.t@email.com','778899','Indianapolis','357 Pine St','46201','555111016','F','1991-05-30'),(17,'Christopher','Q','Moore','chris.m@email.com','889900','Seattle','852 Maple Ave','98101','555111017','M','1989-10-09'),(18,'Amanda','R','Jackson','amanda.j@email.com','990011','Denver','753 Cedar Rd','80201','555111018','F','1994-04-25'),(19,'Daniel','S','Martin','dan.m@email.com','112233','Boston','951 Birch Dr','02201','555111019','M','1987-01-13'),(20,'Margaret','T','Lee','meg.l@email.com','223344','Portland','357 Willow St','97201','555111020','F','1992-08-02'),(21,'Paul','U','Perez','paul.p@email.com','334455','Las Vegas','159 Oak Ave','89101','555111021','M','1986-11-19'),(22,'Sandra','V','Thompson','sandra.t@email.com','445566','Oklahoma City','753 Pine Rd','73101','555111022','F','1993-06-07'),(23,'Kevin','W','White','kevin.w@email.com','556677','Detroit','951 Maple St','48201','555111023','M','1988-02-24'),(24,'Ashley','X','Harris','ashley.h@email.com','667788','Memphis','357 Cedar Ave','38101','555111024','F','1991-10-11'),(25,'Edward','Y','Sanchez','ed.s@email.com','778899','Baltimore','159 Birch Ln','21201','555111025','M','1989-05-28'),(26,'Linda','Z','Clark','linda.c@email.com','889900','Milwaukee','753 Willow Dr','53201','555111026','F','1994-12-15'),(27,'George','A','Ramirez','george.r@email.com','990011','Albuquerque','951 Oak St','87101','555111027','M','1987-04-03'),(28,'Helen','B','Lewis','helen.l@email.com','112233','Tucson','357 Pine Ave','85701','555111028','F','1992-09-20'),(29,'Brian','C','Robinson','brian.r@email.com','223344','Fresno','159 Maple Rd','93701','555111029','M','1986-02-07'),(30,'Sandra','D','Walker','sandra.w@email.com','334455','Sacramento','753 Cedar St','95801','555111030','F','1993-07-26'),(31,'Ronald','E','Young','ron.y@email.com','445566','Kansas City','951 Birch Ave','64101','555111031','M','1988-03-13'),(32,'Carol','F','Allen','carol.a@email.com','556677','Mesa','357 Willow Rd','85201','555111032','F','1991-11-30'),(33,'Steven','G','King','steve.k@email.com','667788','Atlanta','159 Oak Dr','30301','555111033','M','1989-06-17'),(34,'Ruth','H','Wright','ruth.w@email.com','778899','Virginia Beach','753 Pine Ln','23451','555111034','F','1994-01-04'),(35,'Kenneth','I','Scott','ken.s@email.com','889900','Raleigh','951 Maple St','27601','555111035','M','1987-08-21'),(36,'Sharon','J','Torres','sharon.t@email.com','990011','Omaha','357 Cedar Ave','68101','555111036','F','1992-03-09'),(37,'Jeffrey','K','Hill','jeff.h@email.com','112233','Miami','159 Birch Rd','33101','555111037','M','1986-10-26'),(38,'Cynthia','L','Flores','cynthia.f@email.com','223344','Cleveland','753 Willow Dr','44101','555111038','F','1993-05-13'),(39,'Gary','M','Green','gary.g@email.com','334455','Tulsa','951 Oak St','74101','555111039','M','1988-12-30'),(40,'Kathleen','N','Adams','kathy.a@email.com','445566','Minneapolis','357 Pine Ave','55401','555111040','F','1991-07-17'),(41,'Harold','O','Nelson','harold.n@email.com','556677','Wichita','159 Maple Rd','67201','555111041','M','1989-02-03'),(42,'Amy','P','Baker','amy.b@email.com','667788','New Orleans','753 Cedar St','70112','555111042','F','1994-09-20'),(43,'Roger','Q','Hall','roger.h@email.com','778899','Arlington','951 Birch Ave','76010','555111043','M','1987-05-07'),(44,'Shirley','R','Rivera','shirley.r@email.com','889900','Tampa','357 Willow Rd','33601','555111044','F','1992-10-24'),(45,'Howard','S','Campbell','howard.c@email.com','990011','Bakersfield','159 Oak Dr','93301','555111045','M','1986-04-11'),(46,'Frances','T','Mitchell','frances.m@email.com','112233','Aurora','753 Pine Ln','80011','555111046','F','1993-11-28'),(47,'Larry','U','Carter','larry.c@email.com','223344','Anaheim','951 Maple St','92805','555111047','M','1988-06-15'),(48,'Judith','V','Roberts','judith.r@email.com','334455','Santa Ana','357 Cedar Ave','92701','555111048','F','1991-01-02'),(49,'Justin','W','Gomez','justin.g@email.com','445566','Riverside','159 Birch Rd','92501','555111049','M','1989-08-19'),(50,'Martha','X','Phillips','martha.p@email.com','556677','Corpus Christi','753 Willow Dr','78401','555111050','F','1994-03-06'),(51,'Wayne','Y','Evans','wayne.e@email.com','667788','Pittsburgh','951 Oak St','15201','555111051','M','1987-10-23'),(52,'Cheryl','Z','Turner','cheryl.t@email.com','778899','Lexington','357 Pine Ave','40501','555111052','F','1992-05-10'),(53,'Roy','A','Diaz','roy.d@email.com','889900','Cincinnati','159 Maple Rd','45201','555111053','M','1986-12-27'),(54,'Rachel','B','Parker','rachel.p@email.com','990011','St. Louis','753 Cedar St','63101','555111054','F','1993-08-14'),(55,'Ralph','C','Cruz','ralph.c@email.com','112233','Toledo','951 Birch Ave','43601','555111055','M','1988-04-01'),(56,'Virginia','D','Edwards','virginia.e@email.com','223344','Newark','357 Willow Rd','07101','555111056','F','1991-11-18'),(57,'Eugene','E','Collins','eugene.c@email.com','334455','Orlando','159 Oak Dr','32801','555111057','M','1989-07-05'),(58,'Catherine','F','Reyes','catherine.r@email.com','445566','Spokane','753 Pine Ln','99201','555111058','F','1994-02-20'),(59,'Johnny','G','Stewart','johnny.s@email.com','556677','Boise','951 Maple St','83701','555111059','M','1987-09-07'),(60,'Alice','H','Morris','alice.m@email.com','667788','Richmond','357 Cedar Ave','23218','555111060','F','1992-04-24'),(61,'Gerald','I','Morales','gerald.m@email.com','778899','Tacoma','159 Birch Rd','98401','555111061','M','1986-11-11'),(62,'Theresa','J','Murphy','theresa.m@email.com','889900','Des Moines','753 Willow Dr','50309','555111062','F','1993-06-28'),(63,'Jeremy','K','Cook','jeremy.c@email.com','990011','Norfolk','951 Oak St','23501','555111063','M','1988-01-15'),(64,'Joyce','L','Rogers','joyce.r@email.com','112233','Fort Wayne','357 Pine Ave','46802','555111064','F','1991-08-02'),(65,'Dennis','M','Gutierrez','dennis.g@email.com','223344','Baton Rouge','159 Maple Rd','70801','555111065','M','1989-03-19'),(66,'Gloria','N','Ortiz','gloria.o@email.com','334455','Worcester','753 Cedar St','01608','555111066','F','1994-10-06'),(67,'Yufei','F','Zhang','haha123@gmail.com','test','Calgary','135 Panamount Circle NW','T03K29','999888777','F','2000-03-20');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-24  9:17:43
