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
-- Table structure for table `cleaner`
--

DROP TABLE IF EXISTS `cleaner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cleaner` (
  `idcleaner` int NOT NULL,
  `Bank Account #` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`idcleaner`),
  UNIQUE KEY `idcleaner_UNIQUE` (`idcleaner`),
  CONSTRAINT `cleanersFK` FOREIGN KEY (`idcleaner`) REFERENCES `users` (`idusers`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
-- Table structure for table `property`
--

DROP TABLE IF EXISTS `property`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `property` (
  `idproperty` int NOT NULL AUTO_INCREMENT,
  `idowner` int NOT NULL,
  `Street` varchar(255) NOT NULL,
  `City` varchar(100) NOT NULL,
  `ZIP` char(10) NOT NULL,
  `Property Name` varchar(255) NOT NULL,
  `Size (sqt feet)` int NOT NULL,
  `Number of rooms` int NOT NULL,
  `Type` enum('Apartment','House','Villa','Condo','Townhouse','Bungalow') NOT NULL,
  `CheckInTime` time NOT NULL,
  `CheckoutTime` time NOT NULL,
  PRIMARY KEY (`idproperty`,`idowner`),
  UNIQUE KEY `idproperty_UNIQUE` (`idproperty`),
  UNIQUE KEY `unique_owner_property` (`idowner`,`idproperty`),
  KEY `propertyownerFK` (`idowner`),
  CONSTRAINT `propertyownerFK` FOREIGN KEY (`idowner`) REFERENCES `bnbowner` (`idbnbowner`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
  KEY `fk_owner_property` (`ownerid`,`propertyid`),
  CONSTRAINT `fk_owner_property` FOREIGN KEY (`ownerid`, `propertyid`) REFERENCES `property` (`idowner`, `idproperty`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `request_ownerfk` FOREIGN KEY (`ownerid`) REFERENCES `bnbowner` (`idbnbowner`),
  CONSTRAINT `request_propertyfk` FOREIGN KEY (`propertyid`) REFERENCES `property` (`idproperty`),
  CONSTRAINT `requests_chk_1` CHECK ((`Payment Amount` > 0))
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB AUTO_INCREMENT=102 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping events for database 'airbnbnetwork'
--

--
-- Dumping routines for database 'airbnbnetwork'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-09 23:11:50
