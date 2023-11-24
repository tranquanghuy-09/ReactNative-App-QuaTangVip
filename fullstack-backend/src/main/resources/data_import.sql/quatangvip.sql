-- MySQL dump 10.13  Distrib 8.0.34, for macos13 (arm64)
--
-- Host: localhost    Database: quatangvip
-- ------------------------------------------------------
-- Server version	8.0.34

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
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (1,'Quận 3','hongphuoc@gmail.com','Lê Hồng Phước','0123889678','Bách Hoá Xanh'),(2,'Phú Nhuận','huelam@gmail.com','Tô Huệ Lâm','0456556789','Điện Máy Xanh');
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `order_detail`
--

LOCK TABLES `order_detail` WRITE;
/*!40000 ALTER TABLE `order_detail` DISABLE KEYS */;
INSERT INTO `order_detail` VALUES (1,1,NULL,14500,1),(1,2,NULL,7000,1),(1,3,NULL,4372,2),(1,4,NULL,37500,1),(1,5,NULL,4400,3),(1,6,NULL,25500,1),(1,14,NULL,3800,10),(2,5,NULL,4400,2),(2,7,NULL,18900,1),(2,8,NULL,17000,1),(2,9,NULL,23200,2),(2,10,NULL,37000,1),(2,11,NULL,5100,4),(3,6,NULL,25500,1),(3,12,NULL,1600,1),(3,13,NULL,137000,1),(3,15,NULL,5100,5),(4,9,NULL,11600,3),(4,14,NULL,3800,3),(4,15,NULL,5100,5),(4,16,NULL,56000,1),(4,17,NULL,35000,1),(4,18,NULL,34000,1),(5,19,NULL,19300,1),(5,20,NULL,28500,1),(5,21,NULL,36200,1),(6,22,NULL,15900,4),(6,23,NULL,4100,1);
/*!40000 ALTER TABLE `order_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,'2023-11-01 12:30:00.000000',1,1,'Giao thành công'),(2,'2023-11-05 12:30:00.000000',1,1,'Giao thành công'),(3,'2023-11-08 12:30:00.000000',1,1,'Giao thành công'),(4,'2023-10-09 12:30:00.000000',1,1,'Giao thành công'),(5,'2023-10-11 12:30:00.000000',1,1,'Giao thành công'),(6,'2023-09-13 12:30:00.000000',1,1,'Giao thành công');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'Nước tương nấm Shiitake Chin-su chai 330ML','Chinsu','Nước tương nấm Shiitake Chin-su chai 330ML',1,'100'),(2,'Ớt hiểm','BHX','Ớt hiểm',1,'100'),(3,'Xà lách LOLO Xanh(KG)','BHX','Xà lách LOLO Xanh(KG)',1,'100'),(4,'Dao cạo râu Gillette cán vàng gói 5+1','Gillette','Dao cạo râu Gillette cán vàng gói 5+1',1,'100'),(5,'Mì Hảo Hảo tôm chua cay 75G','AceCook','Mì Hảo Hảo tôm chua cay 75G',1,'100'),(6,'Trứng gà hộp 10','BHX','Trứng gà hộp 10',1,'100'),(7,'Hộp khẩu trang niva 3 lớp hộp 20 cái','Niva','Hộp khẩu trang niva 3 lớp hộp 20 cái',1,'100'),(8,'Nước ngọt pepsi cola pet 1.5L','Pepsi','Nước ngọt pepsi cola pet 1.5L',1,'100'),(9,'Nước tăng lực redbull 250ML','Redbull','Nước tăng lực redbull 250ML',1,'100'),(10,'Trứng vịt hộp 10','BHX','Trứng vịt hộp 10',1,'100'),(11,'Mì 3 miền gold bò rau thơm 75G*30','3 Miền','Mì 3 miền gold bò rau thơm 75G*30',1,'100'),(12,'Hành tím túi 200gr','BHX','Hành tím túi 200gr',1,'100'),(13,'Dầu gội sunsik đen ống mượt rạng ngời 650gr','Sunsik','Dầu gội sunsik đen ống mượt rạng ngời 650gr',1,'100'),(14,'Mì 3 miền gold chua cay thái 75g','3 Miền','Mì 3 miền gold chua cay thái 75g',1,'100'),(15,'Mì 3 miền tôm chua cay gói 75gr','3 Miền','Mì 3 miền tôm chua cay gói 75gr',1,'100'),(16,'Nước mắm nam ngư Phú Quốc đậm đặc 500ml','ChinSu','Nước mắm nam ngư Phú Quốc đậm đặc 500ml',1,'100'),(17,'Dầu ăn good meal chai 1l','Goodmeal','Dầu ăn good meal chai 1l',1,'100'),(18,'Kem đánh răng colgate maxfresh bạc hà 230g','Colgate','Kem đánh răng colgate maxfresh bạc hà 230g',1,'100'),(19,'Bắp mỹ','BHX','Bắp mỹ',1,'100'),(20,'Bánh socola pie oreo cadbury hộp 180g','Oreo','Bánh socola pie oreo cadbury hộp 180g',1,'100'),(21,'Bột ngọt Ajnomoto 454g','Ajnomoto','Bột ngọt Ajnomoto 454g',1,'100'),(22,'Đậu phụ làng mơ','BHX','Đậu phụ làng mơ',1,'100'),(23,'Muối tinh sấy i-ốt sosal group gói 500gr','Sosal group','Muối tinh sấy i-ốt sosal group gói 500gr',1,'100');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `product_image`
--

LOCK TABLES `product_image` WRITE;
/*!40000 ALTER TABLE `product_image` DISABLE KEYS */;
INSERT INTO `product_image` VALUES (1,NULL,'/images/product1.png',1),(2,NULL,'/images/product2.png',2),(3,NULL,'/images/product3.png',3),(4,NULL,'/images/product4.png',4),(5,NULL,'/images/product5.png',5),(6,NULL,'/images/product6.png',6),(7,NULL,'/images/product7.png',7),(8,NULL,'/images/product8.png',8),(9,NULL,'/images/product9.png',9),(10,NULL,'/images/product10.png',10),(11,NULL,'/images/product11.png',11),(12,NULL,'/images/product12.png',12),(13,NULL,'/images/product13.png',13),(14,NULL,'/images/product14.png',14),(15,NULL,'/images/product15.png',15),(16,NULL,'/images/product16.png',16),(17,NULL,'/images/product17.png',17),(18,NULL,'/images/product18.png',18),(19,NULL,'/images/product19.png',19),(20,NULL,'/images/product20.png',20),(21,NULL,'/images/product21.png',21),(22,NULL,'/images/product22.png',22),(23,NULL,'/images/product23.png',23);
/*!40000 ALTER TABLE `product_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `product_price`
--

LOCK TABLES `product_price` WRITE;
/*!40000 ALTER TABLE `product_price` DISABLE KEYS */;
INSERT INTO `product_price` VALUES ('2023-10-22 12:30:00.000000',1,NULL,14500),('2023-10-22 12:30:00.000000',2,NULL,7000),('2023-10-22 12:30:00.000000',3,NULL,4372),('2023-10-22 12:30:00.000000',4,NULL,37500),('2023-10-22 12:30:00.000000',5,NULL,4400),('2023-10-22 12:30:00.000000',6,NULL,25500),('2023-10-22 12:30:00.000000',7,NULL,18900),('2023-10-22 12:30:00.000000',8,NULL,17000),('2023-10-22 12:30:00.000000',9,NULL,11600),('2023-10-22 12:30:00.000000',10,NULL,37000),('2023-10-22 12:30:00.000000',11,NULL,5100),('2023-10-22 12:30:00.000000',12,NULL,16000),('2023-10-22 12:30:00.000000',13,NULL,137000),('2023-10-22 12:30:00.000000',14,NULL,3800),('2023-10-22 12:30:00.000000',15,NULL,5100),('2023-10-22 12:30:00.000000',16,NULL,56000),('2023-10-22 12:30:00.000000',17,NULL,35000),('2023-10-22 12:30:00.000000',18,NULL,34000),('2023-10-22 12:30:00.000000',19,NULL,19300),('2023-10-22 12:30:00.000000',20,NULL,28500),('2023-10-22 12:30:00.000000',21,NULL,36200),('2023-10-22 12:30:00.000000',22,NULL,15900),('2023-10-22 12:30:00.000000',23,NULL,4100);
/*!40000 ALTER TABLE `product_price` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'tranquanghuyit09@gmail.com','Tỷ Vy','0357391270',8309,'https://res.cloudinary.com/tranquanghuyit09/image/upload/v1700775074/quatangvip/gejwcog7h7soey9zs57j.jpg'),(2,'nhandep09@gmail.com','Trần Quang Huy','0338116008',0,'https://res.cloudinary.com/tranquanghuyit09/image/upload/v1700775075/quatangvip/rps3uinckvbzsl5yobmg.jpg');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-24 23:47:34
