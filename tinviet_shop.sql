-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 18, 2025 at 04:34 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tinviet_shop`
--

-- --------------------------------------------------------

--
-- Table structure for table `attributes`
--

CREATE TABLE `attributes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(120) NOT NULL,
  `slug` varchar(150) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `attributes`
--

INSERT INTO `attributes` (`id`, `name`, `slug`, `created_at`) VALUES
(1, 'Tốc độ', 'toc-do', '2025-12-14 17:08:43'),
(2, 'Khổ giấy', 'kho-giay', '2025-12-14 17:08:43'),
(3, 'Kết nối', 'ket-noi', '2025-12-14 17:08:43'),
(4, 'Công nghệ in', 'cong-nghe-in', '2025-12-14 17:08:43'),
(5, 'Màu sắc', 'mau-sac', '2025-12-14 17:08:43'),
(6, 'Dung lượng', 'dung-luong', '2025-12-14 17:08:43');

-- --------------------------------------------------------

--
-- Table structure for table `brands`
--

CREATE TABLE `brands` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(190) NOT NULL,
  `slug` varchar(220) NOT NULL,
  `logo_url` varchar(500) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `brands`
--

INSERT INTO `brands` (`id`, `name`, `slug`, `logo_url`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Canon', 'canon', '/images/brands/canon.png', 1, '2025-12-14 17:08:43', '2025-12-14 17:08:43'),
(2, 'HP', 'hp', '/images/brands/hp.png', 1, '2025-12-14 17:08:43', '2025-12-14 17:08:43'),
(3, 'Brother', 'brother', '/images/brands/brother.png', 1, '2025-12-14 17:08:43', '2025-12-14 17:08:43'),
(4, 'Epson', 'epson', '/images/brands/epson.png', 1, '2025-12-14 17:08:43', '2025-12-14 17:08:43'),
(5, 'Ricoh', 'ricoh', '/images/brands/ricoh.png', 1, '2025-12-14 17:08:43', '2025-12-14 17:08:43'),
(6, 'Toshiba', 'toshiba', '/images/brands/toshiba.png', 1, '2025-12-14 17:08:43', '2025-12-14 17:08:43');

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `session_id` varchar(128) DEFAULT NULL,
  `status` enum('active','converted','abandoned') NOT NULL DEFAULT 'active',
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `carts`
--

INSERT INTO `carts` (`id`, `user_id`, `session_id`, `status`, `created_at`, `updated_at`) VALUES
(1, NULL, NULL, 'active', '2025-12-13 23:42:58', '2025-12-13 23:42:58');

-- --------------------------------------------------------

--
-- Table structure for table `cart_items`
--

CREATE TABLE `cart_items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `cart_id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `variant_id` bigint(20) UNSIGNED DEFAULT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `unit_price` decimal(12,2) NOT NULL DEFAULT 0.00,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `parent_id` bigint(20) UNSIGNED DEFAULT NULL,
  `type` enum('product','service','post') NOT NULL DEFAULT 'product',
  `name` varchar(190) NOT NULL,
  `slug` varchar(220) NOT NULL,
  `description` text DEFAULT NULL,
  `image_url` varchar(500) DEFAULT NULL,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `parent_id`, `type`, `name`, `slug`, `description`, `image_url`, `sort_order`, `is_active`, `created_at`, `updated_at`) VALUES
(1, NULL, 'product', 'Máy in', 'may-in', 'Danh mục máy in văn phòng, gia đình.', '/images/categories/cat-may-in.png', 1, 1, '2025-12-14 00:09:49', '2025-12-14 17:08:43'),
(2, NULL, 'product', 'Máy photocopy', 'may-photocopy', 'Danh mục máy photocopy, đa chức năng.', '/images/categories/cat-may-photocopy.png', 2, 1, '2025-12-14 00:09:49', '2025-12-14 17:08:43'),
(3, NULL, 'product', 'Mực in', 'muc-in', 'Danh mục mực in, toner, cartridge chính hãng.', '/images/categories/cat-muc-in.png', 3, 1, '2025-12-14 00:09:49', '2025-12-14 17:08:43');

-- --------------------------------------------------------

--
-- Table structure for table `contact_messages`
--

CREATE TABLE `contact_messages` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `full_name` varchar(120) NOT NULL,
  `phone` varchar(30) DEFAULT NULL,
  `email` varchar(190) DEFAULT NULL,
  `subject` varchar(190) DEFAULT NULL,
  `message` text NOT NULL,
  `status` enum('new','read','closed') NOT NULL DEFAULT 'new',
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `coupons`
--

CREATE TABLE `coupons` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `code` varchar(50) NOT NULL,
  `name` varchar(190) DEFAULT NULL,
  `discount_type` enum('percent','fixed') NOT NULL,
  `discount_value` decimal(12,2) NOT NULL DEFAULT 0.00,
  `min_order_value` decimal(12,2) DEFAULT NULL,
  `max_discount_value` decimal(12,2) DEFAULT NULL,
  `usage_limit` int(11) DEFAULT NULL,
  `used_count` int(11) NOT NULL DEFAULT 0,
  `starts_at` datetime DEFAULT NULL,
  `ends_at` datetime DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `inventories`
--

CREATE TABLE `inventories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED DEFAULT NULL,
  `variant_id` bigint(20) UNSIGNED DEFAULT NULL,
  `quantity` int(11) NOT NULL DEFAULT 0,
  `low_stock_threshold` int(11) NOT NULL DEFAULT 5,
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ;

--
-- Dumping data for table `inventories`
--

INSERT INTO `inventories` (`id`, `product_id`, `variant_id`, `quantity`, `low_stock_threshold`, `updated_at`) VALUES
(1, 1, NULL, 20, 5, '2025-12-14 17:08:43'),
(2, 2, NULL, 20, 5, '2025-12-14 17:08:43'),
(3, 3, NULL, 20, 5, '2025-12-14 17:08:43'),
(4, 4, NULL, 20, 5, '2025-12-14 17:08:43'),
(5, 5, NULL, 20, 5, '2025-12-14 17:08:43'),
(6, 6, NULL, 10, 5, '2025-12-14 17:08:43'),
(7, 7, NULL, 10, 5, '2025-12-14 17:08:43'),
(8, 8, NULL, 10, 5, '2025-12-14 17:08:43'),
(9, 9, NULL, 10, 5, '2025-12-14 17:08:43'),
(10, 10, NULL, 10, 5, '2025-12-14 17:08:43'),
(11, 11, NULL, 80, 5, '2025-12-14 17:08:43'),
(12, 12, NULL, 80, 5, '2025-12-14 17:08:43'),
(13, 13, NULL, 80, 5, '2025-12-14 17:08:43'),
(14, 14, NULL, 80, 5, '2025-12-14 17:08:43'),
(15, 15, NULL, 80, 5, '2025-12-14 17:08:43');

-- --------------------------------------------------------

--
-- Table structure for table `menus`
--

CREATE TABLE `menus` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(120) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `menu_items`
--

CREATE TABLE `menu_items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `menu_id` bigint(20) UNSIGNED NOT NULL,
  `parent_id` bigint(20) UNSIGNED DEFAULT NULL,
  `label` varchar(190) NOT NULL,
  `url` varchar(500) DEFAULT NULL,
  `target` enum('_self','_blank') NOT NULL DEFAULT '_self',
  `ref_type` enum('none','category','product','post') NOT NULL DEFAULT 'none',
  `ref_id` bigint(20) UNSIGNED DEFAULT NULL,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `order_code` varchar(30) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `coupon_id` bigint(20) UNSIGNED DEFAULT NULL,
  `customer_name` varchar(120) NOT NULL,
  `customer_phone` varchar(30) NOT NULL,
  `customer_email` varchar(190) DEFAULT NULL,
  `shipping_address_line` varchar(255) NOT NULL,
  `shipping_ward` varchar(120) DEFAULT NULL,
  `shipping_district` varchar(120) DEFAULT NULL,
  `shipping_province` varchar(120) DEFAULT NULL,
  `shipping_country` varchar(120) NOT NULL DEFAULT 'VN',
  `note` text DEFAULT NULL,
  `subtotal` decimal(12,2) NOT NULL DEFAULT 0.00,
  `discount_total` decimal(12,2) NOT NULL DEFAULT 0.00,
  `shipping_fee` decimal(12,2) NOT NULL DEFAULT 0.00,
  `total` decimal(12,2) NOT NULL DEFAULT 0.00,
  `payment_status` enum('unpaid','paid','refunded','partial') NOT NULL DEFAULT 'unpaid',
  `fulfillment_status` enum('unfulfilled','processing','shipped','delivered','cancelled') NOT NULL DEFAULT 'unfulfilled',
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `order_id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `variant_id` bigint(20) UNSIGNED DEFAULT NULL,
  `product_name_snapshot` varchar(255) NOT NULL,
  `sku_snapshot` varchar(80) DEFAULT NULL,
  `unit_price` decimal(12,2) NOT NULL DEFAULT 0.00,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `line_total` decimal(12,2) NOT NULL DEFAULT 0.00,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `order_id` bigint(20) UNSIGNED NOT NULL,
  `provider` enum('cod','bank_transfer','vnpay','momo','zalopay','other') NOT NULL DEFAULT 'cod',
  `amount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `status` enum('pending','succeeded','failed','refunded') NOT NULL DEFAULT 'pending',
  `transaction_ref` varchar(190) DEFAULT NULL,
  `paid_at` datetime DEFAULT NULL,
  `raw_payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`raw_payload`)),
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `post_type` enum('post','page','service') NOT NULL DEFAULT 'post',
  `category_id` bigint(20) UNSIGNED DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `slug` varchar(280) NOT NULL,
  `excerpt` text DEFAULT NULL,
  `content` longtext DEFAULT NULL,
  `featured_image_url` varchar(500) DEFAULT NULL,
  `status` enum('draft','published','archived') NOT NULL DEFAULT 'published',
  `published_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_type` enum('sell','service') NOT NULL DEFAULT 'sell',
  `category_id` bigint(20) UNSIGNED NOT NULL,
  `brand_id` bigint(20) UNSIGNED DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(280) NOT NULL,
  `sku` varchar(80) DEFAULT NULL,
  `short_desc` varchar(500) DEFAULT NULL,
  `description` longtext DEFAULT NULL,
  `featured_image_url` varchar(500) DEFAULT NULL,
  `price` decimal(12,2) NOT NULL DEFAULT 0.00,
  `compare_at_price` decimal(12,2) DEFAULT NULL,
  `cost_price` decimal(12,2) DEFAULT NULL,
  `is_featured` tinyint(1) NOT NULL DEFAULT 0,
  `status` enum('draft','published','archived') NOT NULL DEFAULT 'published',
  `view_count` bigint(20) UNSIGNED NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `product_type`, `category_id`, `brand_id`, `name`, `slug`, `sku`, `short_desc`, `description`, `featured_image_url`, `price`, `compare_at_price`, `cost_price`, `is_featured`, `status`, `view_count`, `created_at`, `updated_at`) VALUES
(1, 'sell', 1, 2, 'Máy in HP LaserJet Pro M404dn', 'may-in-hp-laserjet-pro-m404dn', 'HP-M404DN', 'In laser trắng đen bền bỉ, phù hợp văn phòng.', 'Máy in HP LaserJet Pro M404dn. Tốc độ cao, in sắc nét, tiết kiệm chi phí.', '/images/products/printer-hp-m404dn-1.png', 5480000.00, 6290000.00, NULL, 1, 'published', 0, '2025-12-14 17:08:43', '2025-12-16 14:11:17'),
(2, 'sell', 1, 1, 'Máy in Canon LBP 2900', 'may-in-canon-lbp-2900', 'CANON-LBP2900', 'Máy in quốc dân, nhỏ gọn, dễ sử dụng.', 'Canon LBP 2900: in laser trắng đen, phù hợp cá nhân/văn phòng nhỏ.', '/images/products/printer-canon-lbp2900-1.png', 3290000.00, 3790000.00, NULL, 1, 'published', 0, '2025-12-14 17:08:43', '2025-12-14 17:08:43'),
(3, 'sell', 1, 3, 'Máy in Brother HL-L2366DW', 'may-in-brother-hl-l2366dw', 'BRO-HLL2366DW', 'WiFi + In 2 mặt tự động, ổn định.', 'Brother HL-L2366DW hỗ trợ WiFi, in hai mặt tự động, phù hợp văn phòng.', '/images/products/printer-brother-hll2366dw-1.png', 4190000.00, 4890000.00, NULL, 0, 'published', 0, '2025-12-14 17:08:43', '2025-12-14 17:08:43'),
(4, 'sell', 1, 4, 'Máy in Epson L3150', 'may-in-epson-l3150', 'EPS-L3150', 'In phun màu EcoTank, tiết kiệm mực.', 'Epson L3150: in màu, scan, copy; bình mực lớn, chi phí thấp.', '/images/products/printer-epson-l3150-1.png', 3990000.00, 4590000.00, NULL, 0, 'published', 0, '2025-12-14 17:08:43', '2025-12-14 17:08:43'),
(5, 'sell', 1, 1, 'Máy in Canon MF3010', 'may-in-canon-mf3010', 'CANON-MF3010', 'In/Copy/Scan đa chức năng, nhỏ gọn.', 'Canon MF3010: đa chức năng, phù hợp gia đình và văn phòng nhỏ.', '/images/products/printer-canon-mf3010-1.png', 3890000.00, 4390000.00, NULL, 0, 'published', 0, '2025-12-14 17:08:43', '2025-12-14 17:08:43'),
(6, 'sell', 2, 5, 'Máy Photocopy Ricoh MP 5055', 'may-photocopy-ricoh-mp-5055', 'RICOH-MP5055', 'Photocopy A3, tốc độ cao, bền bỉ.', 'Ricoh MP 5055: photocopy/in/scan; vận hành ổn định, phù hợp doanh nghiệp.', '/images/products/copier-ricoh-mp5055-1.png', 45900000.00, 49900000.00, NULL, 1, 'published', 0, '2025-12-14 17:08:43', '2025-12-14 17:08:43'),
(7, 'sell', 2, 5, 'Máy Photocopy Ricoh MP 4054', 'may-photocopy-ricoh-mp-4054', 'RICOH-MP4054', 'Photocopy A3, tiết kiệm điện.', 'Ricoh MP 4054: in/scan/copy, chất lượng bản in tốt.', '/images/products/copier-ricoh-mp4054-1.png', 38900000.00, 42900000.00, NULL, 0, 'published', 0, '2025-12-14 17:08:43', '2025-12-14 17:08:43'),
(8, 'sell', 2, 6, 'Máy Photocopy Toshiba e-Studio 257', 'may-photocopy-toshiba-estudio-257', 'TOSH-257', 'Dòng phổ biến, dễ dùng, A3.', 'Toshiba e-Studio 257: photocopy/in/scan, phù hợp văn phòng.', '/images/products/copier-toshiba-257-1.png', 27900000.00, 31900000.00, NULL, 0, 'published', 0, '2025-12-14 17:08:43', '2025-12-14 17:08:43'),
(9, 'sell', 2, 5, 'Máy Photocopy Ricoh IM C3000', 'may-photocopy-ricoh-im-c3000', 'RICOH-IMC3000', 'Photocopy màu A3, màn hình cảm ứng.', 'Ricoh IM C3000: máy màu đa chức năng, tối ưu workflow.', '/images/products/copier-ricoh-imc3000-1.png', 89900000.00, 95900000.00, NULL, 1, 'published', 0, '2025-12-14 17:08:43', '2025-12-14 17:08:43'),
(10, 'sell', 2, 5, 'Máy Photocopy Ricoh MP C3004', 'may-photocopy-ricoh-mp-c3004', 'RICOH-MPC3004', 'Máy màu A3, chất lượng ổn định.', 'Ricoh MP C3004: máy màu đa chức năng, phù hợp văn phòng.', '/images/products/copier-ricoh-mpc3004-1.png', 79900000.00, 85900000.00, NULL, 0, 'published', 0, '2025-12-14 17:08:43', '2025-12-14 17:08:43'),
(11, 'sell', 3, 2, 'Hộp mực HP 12A (Q2612A)', 'muc-in-hp-12a-q2612a', 'HP-12A', 'Toner HP 12A cho dòng 1010/1020/3050...', 'Hộp mực HP 12A (Q2612A): bản in rõ, ổn định, phù hợp văn phòng.', '/images/products/ink-hp-12a-1.png', 390000.00, 450000.00, NULL, 1, 'published', 0, '2025-12-14 17:08:43', '2025-12-14 17:08:43'),
(12, 'sell', 3, 1, 'Hộp mực Canon 303', 'muc-in-canon-303', 'CANON-303', 'Toner Canon 303 cho LBP2900/3000...', 'Hộp mực Canon 303: tương thích LBP2900/3000, in rõ nét.', '/images/products/ink-canon-303-1.png', 320000.00, 380000.00, NULL, 1, 'published', 0, '2025-12-14 17:08:43', '2025-12-14 17:08:43'),
(13, 'sell', 3, 3, 'Mực Brother TN-2385', 'muc-in-brother-tn-2385', 'BRO-TN2385', 'Toner Brother TN-2385 dùng cho HL-L2361DN...', 'Mực Brother TN-2385: chất lượng ổn định, dễ thay thế.', '/images/products/ink-brother-tn2385-1.png', 450000.00, 520000.00, NULL, 0, 'published', 0, '2025-12-14 17:08:43', '2025-12-14 17:08:43'),
(14, 'sell', 3, 4, 'Mực Epson 003 (Bộ 4 màu)', 'muc-in-epson-003-bo-4-mau', 'EPS-003-4C', 'Mực Epson 003 cho L3110/L3150...', 'Bộ mực Epson 003 (4 màu): tiết kiệm, chính hãng, màu sắc bền.', '/images/products/ink-epson-003-1.png', 320000.00, 360000.00, NULL, 0, 'published', 0, '2025-12-14 17:08:43', '2025-12-14 17:08:43'),
(15, 'sell', 3, 5, 'Mực Ricoh MP 3554', 'muc-in-ricoh-mp-3554', 'RICOH-MP3554', 'Toner Ricoh MP 3554.', 'Mực Ricoh MP 3554: phù hợp dòng Ricoh MP 3054/3554, bản in sắc nét.', '/images/products/ink-ricoh-mp3554-1.png', 690000.00, 790000.00, NULL, 0, 'published', 0, '2025-12-14 17:08:43', '2025-12-14 17:08:43');

-- --------------------------------------------------------

--
-- Table structure for table `product_attribute_values`
--

CREATE TABLE `product_attribute_values` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `attribute_id` bigint(20) UNSIGNED NOT NULL,
  `value` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_attribute_values`
--

INSERT INTO `product_attribute_values` (`id`, `product_id`, `attribute_id`, `value`, `created_at`) VALUES
(1, 1, 1, '38 ppm', '2025-12-14 17:08:43'),
(2, 1, 2, 'A4', '2025-12-14 17:08:43'),
(3, 1, 3, 'USB/LAN', '2025-12-14 17:08:43'),
(4, 1, 4, 'Laser', '2025-12-14 17:08:43'),
(5, 2, 1, '12 ppm', '2025-12-14 17:08:43'),
(6, 2, 2, 'A4', '2025-12-14 17:08:43'),
(7, 2, 3, 'USB', '2025-12-14 17:08:43'),
(8, 2, 4, 'Laser', '2025-12-14 17:08:43'),
(9, 3, 1, '30 ppm', '2025-12-14 17:08:43'),
(10, 3, 3, 'USB/WiFi', '2025-12-14 17:08:43'),
(11, 4, 4, 'In phun EcoTank', '2025-12-14 17:08:43'),
(12, 4, 5, 'Màu', '2025-12-14 17:08:43'),
(13, 5, 1, '18 ppm', '2025-12-14 17:08:43'),
(14, 5, 3, 'USB', '2025-12-14 17:08:43'),
(15, 6, 1, '50 ppm', '2025-12-14 17:08:43'),
(16, 6, 2, 'A3/A4', '2025-12-14 17:08:43'),
(17, 7, 1, '40 ppm', '2025-12-14 17:08:43'),
(18, 8, 1, '25 ppm', '2025-12-14 17:08:43'),
(19, 9, 5, 'Màu', '2025-12-14 17:08:43'),
(20, 10, 5, 'Màu', '2025-12-14 17:08:43'),
(21, 11, 6, '2000 trang (5%)', '2025-12-14 17:08:43'),
(22, 12, 6, '2000 trang (5%)', '2025-12-14 17:08:43'),
(23, 13, 6, '2600 trang (5%)', '2025-12-14 17:08:43'),
(24, 14, 6, '4 chai / bộ', '2025-12-14 17:08:43'),
(25, 15, 6, '15000 trang (ước tính)', '2025-12-14 17:08:43');

-- --------------------------------------------------------

--
-- Table structure for table `product_images`
--

CREATE TABLE `product_images` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `image_url` varchar(500) NOT NULL,
  `alt_text` varchar(255) DEFAULT NULL,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_images`
--

INSERT INTO `product_images` (`id`, `product_id`, `image_url`, `alt_text`, `sort_order`, `created_at`) VALUES
(1, 1, '/images/products/printer-hp-m404dn-1.png', 'Máy in HP LaserJet Pro M404dn', 1, '2025-12-14 17:08:43'),
(2, 2, '/images/products/printer-canon-lbp2900-1.png', 'Máy in Canon LBP 2900', 1, '2025-12-14 17:08:43'),
(3, 3, '/images/products/printer-brother-hll2366dw-1.png', 'Máy in Brother HL-L2366DW', 1, '2025-12-14 17:08:43'),
(4, 4, '/images/products/printer-epson-l3150-1.png', 'Máy in Epson L3150', 1, '2025-12-14 17:08:43'),
(5, 5, '/images/products/printer-canon-mf3010-1.png', 'Máy in Canon MF3010', 1, '2025-12-14 17:08:43'),
(6, 6, '/images/products/copier-ricoh-mp5055-1.png', 'Máy Photocopy Ricoh MP 5055', 1, '2025-12-14 17:08:43'),
(7, 7, '/images/products/copier-ricoh-mp4054-1.png', 'Máy Photocopy Ricoh MP 4054', 1, '2025-12-14 17:08:43'),
(8, 8, '/images/products/copier-toshiba-257-1.png', 'Máy Photocopy Toshiba e-Studio 257', 1, '2025-12-14 17:08:43'),
(9, 9, '/images/products/copier-ricoh-imc3000-1.png', 'Máy Photocopy Ricoh IM C3000', 1, '2025-12-14 17:08:43'),
(10, 10, '/images/products/copier-ricoh-mpc3004-1.png', 'Máy Photocopy Ricoh MP C3004', 1, '2025-12-14 17:08:43'),
(11, 11, '/images/products/ink-hp-12a-1.png', 'Hộp mực HP 12A (Q2612A)', 1, '2025-12-14 17:08:43'),
(12, 12, '/images/products/ink-canon-303-1.png', 'Hộp mực Canon 303', 1, '2025-12-14 17:08:43'),
(13, 13, '/images/products/ink-brother-tn2385-1.png', 'Mực Brother TN-2385', 1, '2025-12-14 17:08:43'),
(14, 14, '/images/products/ink-epson-003-1.png', 'Mực Epson 003 (Bộ 4 màu)', 1, '2025-12-14 17:08:43'),
(15, 15, '/images/products/ink-ricoh-mp3554-1.png', 'Mực Ricoh MP 3554', 1, '2025-12-14 17:08:43'),
(16, 1, '/images/products/printer-hp-m404dn-2.png', 'Máy in HP LaserJet Pro M404dn - Ảnh 2', 2, '2025-12-14 17:08:43'),
(17, 2, '/images/products/printer-canon-lbp2900-2.png', 'Máy in Canon LBP 2900 - Ảnh 2', 2, '2025-12-14 17:08:43'),
(18, 3, '/images/products/printer-brother-hll2366dw-2.png', 'Máy in Brother HL-L2366DW - Ảnh 2', 2, '2025-12-14 17:08:43'),
(19, 4, '/images/products/printer-epson-l3150-2.png', 'Máy in Epson L3150 - Ảnh 2', 2, '2025-12-14 17:08:43'),
(20, 5, '/images/products/printer-canon-mf3010-2.png', 'Máy in Canon MF3010 - Ảnh 2', 2, '2025-12-14 17:08:43'),
(21, 6, '/images/products/copier-ricoh-mp5055-2.png', 'Máy Photocopy Ricoh MP 5055 - Ảnh 2', 2, '2025-12-14 17:08:43'),
(22, 7, '/images/products/copier-ricoh-mp4054-2.png', 'Máy Photocopy Ricoh MP 4054 - Ảnh 2', 2, '2025-12-14 17:08:43'),
(23, 8, '/images/products/copier-toshiba-257-2.png', 'Máy Photocopy Toshiba e-Studio 257 - Ảnh 2', 2, '2025-12-14 17:08:43'),
(24, 9, '/images/products/copier-ricoh-imc3000-2.png', 'Máy Photocopy Ricoh IM C3000 - Ảnh 2', 2, '2025-12-14 17:08:43'),
(25, 10, '/images/products/copier-ricoh-mpc3004-2.png', 'Máy Photocopy Ricoh MP C3004 - Ảnh 2', 2, '2025-12-14 17:08:43'),
(26, 11, '/images/products/ink-hp-12a-2.png', 'Hộp mực HP 12A (Q2612A) - Ảnh 2', 2, '2025-12-14 17:08:43'),
(27, 12, '/images/products/ink-canon-303-2.png', 'Hộp mực Canon 303 - Ảnh 2', 2, '2025-12-14 17:08:43'),
(28, 13, '/images/products/ink-brother-tn2385-2.png', 'Mực Brother TN-2385 - Ảnh 2', 2, '2025-12-14 17:08:43'),
(29, 14, '/images/products/ink-epson-003-2.png', 'Mực Epson 003 (Bộ 4 màu) - Ảnh 2', 2, '2025-12-14 17:08:43'),
(30, 15, '/images/products/ink-ricoh-mp3554-2.png', 'Mực Ricoh MP 3554 - Ảnh 2', 2, '2025-12-14 17:08:43'),
(31, 1, '/images/products/printer-hp-m404dn-3.png', 'Máy in HP LaserJet Pro M404dn - Ảnh 3', 3, '2025-12-14 17:08:43'),
(32, 2, '/images/products/printer-canon-lbp2900-3.png', 'Máy in Canon LBP 2900 - Ảnh 3', 3, '2025-12-14 17:08:43'),
(33, 3, '/images/products/printer-brother-hll2366dw-3.png', 'Máy in Brother HL-L2366DW - Ảnh 3', 3, '2025-12-14 17:08:43'),
(34, 4, '/images/products/printer-epson-l3150-3.png', 'Máy in Epson L3150 - Ảnh 3', 3, '2025-12-14 17:08:43'),
(35, 5, '/images/products/printer-canon-mf3010-3.png', 'Máy in Canon MF3010 - Ảnh 3', 3, '2025-12-14 17:08:43'),
(36, 6, '/images/products/copier-ricoh-mp5055-3.png', 'Máy Photocopy Ricoh MP 5055 - Ảnh 3', 3, '2025-12-14 17:08:43'),
(37, 7, '/images/products/copier-ricoh-mp4054-3.png', 'Máy Photocopy Ricoh MP 4054 - Ảnh 3', 3, '2025-12-14 17:08:43'),
(38, 8, '/images/products/copier-toshiba-257-3.png', 'Máy Photocopy Toshiba e-Studio 257 - Ảnh 3', 3, '2025-12-14 17:08:43'),
(39, 9, '/images/products/copier-ricoh-imc3000-3.png', 'Máy Photocopy Ricoh IM C3000 - Ảnh 3', 3, '2025-12-14 17:08:43'),
(40, 10, '/images/products/copier-ricoh-mpc3004-3.png', 'Máy Photocopy Ricoh MP C3004 - Ảnh 3', 3, '2025-12-14 17:08:43'),
(41, 11, '/images/products/ink-hp-12a-3.png', 'Hộp mực HP 12A (Q2612A) - Ảnh 3', 3, '2025-12-14 17:08:43'),
(42, 12, '/images/products/ink-canon-303-3.png', 'Hộp mực Canon 303 - Ảnh 3', 3, '2025-12-14 17:08:43'),
(43, 13, '/images/products/ink-brother-tn2385-3.png', 'Mực Brother TN-2385 - Ảnh 3', 3, '2025-12-14 17:08:43'),
(44, 14, '/images/products/ink-epson-003-3.png', 'Mực Epson 003 (Bộ 4 màu) - Ảnh 3', 3, '2025-12-14 17:08:43'),
(45, 15, '/images/products/ink-ricoh-mp3554-3.png', 'Mực Ricoh MP 3554 - Ảnh 3', 3, '2025-12-14 17:08:43');

-- --------------------------------------------------------

--
-- Table structure for table `product_reviews`
--

CREATE TABLE `product_reviews` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `rating` tinyint(3) UNSIGNED NOT NULL,
  `title` varchar(190) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `status` enum('pending','approved','rejected') NOT NULL DEFAULT 'pending',
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product_variants`
--

CREATE TABLE `product_variants` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `variant_name` varchar(190) NOT NULL,
  `sku` varchar(80) DEFAULT NULL,
  `price` decimal(12,2) NOT NULL DEFAULT 0.00,
  `compare_at_price` decimal(12,2) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `key` varchar(120) NOT NULL,
  `value` text DEFAULT NULL,
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`key`, `value`, `updated_at`) VALUES
('address', '362/2 Ung Văn Khiêm, Phường Thạnh Mỹ Tây, TP.HCM', '2025-12-13 23:11:55'),
('email', 'kinhdoanh01@tinvietvp.com', '2025-12-13 23:11:55'),
('hotline', '077 876 1999', '2025-12-13 23:11:55'),
('site_name', 'Tin Việt VP', '2025-12-13 23:11:55');

-- --------------------------------------------------------

--
-- Table structure for table `shipments`
--

CREATE TABLE `shipments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `order_id` bigint(20) UNSIGNED NOT NULL,
  `carrier` varchar(120) DEFAULT NULL,
  `tracking_number` varchar(190) DEFAULT NULL,
  `shipped_at` datetime DEFAULT NULL,
  `delivered_at` datetime DEFAULT NULL,
  `status` enum('pending','shipped','delivered','returned','cancelled') NOT NULL DEFAULT 'pending',
  `note` text DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sliders`
--

CREATE TABLE `sliders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(190) DEFAULT NULL,
  `image_url` varchar(500) NOT NULL,
  `link_url` varchar(500) DEFAULT NULL,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sliders`
--

INSERT INTO `sliders` (`id`, `title`, `image_url`, `link_url`, `sort_order`, `is_active`, `created_at`) VALUES
(1, 'Banner 1', 'https://via.placeholder.com/1200x400', '/', 1, 1, '2025-12-14 00:09:49'),
(2, 'Banner 2', 'https://via.placeholder.com/1200x400', '/', 2, 1, '2025-12-14 00:09:49');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `role` enum('customer','admin','staff') NOT NULL DEFAULT 'customer',
  `full_name` varchar(120) NOT NULL,
  `email` varchar(190) DEFAULT NULL,
  `phone` varchar(30) DEFAULT NULL,
  `password_hash` varchar(255) DEFAULT NULL,
  `status` enum('active','inactive','blocked') NOT NULL DEFAULT 'active',
  `email_verified_at` datetime DEFAULT NULL,
  `last_login_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `role`, `full_name`, `email`, `phone`, `password_hash`, `status`, `email_verified_at`, `last_login_at`, `created_at`, `updated_at`) VALUES
(1, 'customer', 'Nguyen Van A', 'a@gmail.com', '0909123456', '$2b$10$003qUaiVORkcRtfGGhE/cuPXeZx1.g4o.bhug/UUKiIRGUeMx0oq6', 'active', NULL, NULL, '2025-12-13 23:47:30', '2025-12-13 23:47:30'),
(2, 'admin', 'Admin TinViet', 'admin@tinviet.com', '0909000001', '$2b$10$TpgImHt9MpHSxxqK330gAuffSdkk9MoZF99AvC8IiXi08N1oapAnK', 'active', NULL, NULL, '2025-12-16 12:49:16', '2025-12-16 12:49:16'),
(3, 'customer', 'Customer TinViet', 'customer@tinviet.com', '0909000002', '$2b$10$dy7gOXPujOq0c3U2QUDSgOfgHxQNoyawyBuLroNfUe5b.sNiBFf26', 'active', NULL, NULL, '2025-12-16 12:49:16', '2025-12-16 12:49:16'),
(4, 'customer', 'Tâm Dịt', 'tamdit@gmail.com', '0987654321', '$2b$10$.QqXVvECVfOljLRlrHQ37epuaSzjFO7WGcGNeq5pv6I6VZBeiPlaG', 'active', NULL, NULL, '2025-12-16 12:51:35', '2025-12-16 12:51:35');

-- --------------------------------------------------------

--
-- Table structure for table `user_addresses`
--

CREATE TABLE `user_addresses` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `label` varchar(60) DEFAULT NULL,
  `recipient_name` varchar(120) NOT NULL,
  `recipient_phone` varchar(30) NOT NULL,
  `address_line` varchar(255) NOT NULL,
  `ward` varchar(120) DEFAULT NULL,
  `district` varchar(120) DEFAULT NULL,
  `province` varchar(120) DEFAULT NULL,
  `country` varchar(120) NOT NULL DEFAULT 'VN',
  `is_default` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_tokens`
--

CREATE TABLE `user_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `token_hash` varchar(255) NOT NULL,
  `token_type` enum('refresh') NOT NULL DEFAULT 'refresh',
  `expires_at` datetime NOT NULL,
  `revoked_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_tokens`
--

INSERT INTO `user_tokens` (`id`, `user_id`, `token_hash`, `token_type`, `expires_at`, `revoked_at`, `created_at`) VALUES
(1, 3, '1aa01ef6982d0b89f21d52a5cc85a19969e014b61fb2694111401afe5d4be374', 'refresh', '2025-12-23 12:50:11', NULL, '2025-12-16 12:50:11'),
(2, 2, '47962999f01e4c374e8535fd9ba9e2809b97d0e8a1d6994a1e21a6fd3590cd34', 'refresh', '2025-12-23 12:50:41', NULL, '2025-12-16 12:50:41'),
(3, 4, '1995aaec6c190759ebd856644965ed55815ad3079a1e5396d64ecf6322ada906', 'refresh', '2025-12-23 12:51:35', NULL, '2025-12-16 12:51:35'),
(4, 2, '87084b9002be6d76d82e7512e3bac64cf76eaade8222435bf3a10eace01fcafe', 'refresh', '2025-12-23 13:20:35', NULL, '2025-12-16 13:20:35'),
(5, 2, '1b0b009c5f4dbc3774588c7e7e1ad302ba498ab31e9afa377672f5dc586b529d', 'refresh', '2025-12-23 13:50:03', NULL, '2025-12-16 13:50:03'),
(6, 2, 'd302fe8996740ae9499b35d89452b3fc5115a81ee885163dce1ad4746a69de3d', 'refresh', '2025-12-23 14:10:13', NULL, '2025-12-16 14:10:13'),
(7, 2, '17363f51fe86cc6077ef6c2f2e392d021473daee541cc219b548cc5cfa08d528', 'refresh', '2025-12-23 14:30:59', NULL, '2025-12-16 14:30:59'),
(8, 2, 'ce55d8a694fecd757381c4ed1d043b3504991e7b63ccdce773a0a1542d8a0f1d', 'refresh', '2025-12-23 14:35:29', NULL, '2025-12-16 14:35:29'),
(9, 2, '80473ae297097fa5d834f29506675194d3c506fd1b9a1a300b732f764b2b0f45', 'refresh', '2025-12-23 14:38:14', NULL, '2025-12-16 14:38:14'),
(10, 2, '22bf75ae86a05d1a225121684a4de709a973eae5cf3ae8c7ceb0445d1bc02d9c', 'refresh', '2025-12-23 14:48:00', NULL, '2025-12-16 14:48:00'),
(11, 2, '1c103c29fd5a7288d3f05a992d5f1214a1c5edf6c4dd28ad0d664089718e4192', 'refresh', '2025-12-23 14:59:11', NULL, '2025-12-16 14:59:11');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attributes`
--
ALTER TABLE `attributes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_attributes_slug` (`slug`);

--
-- Indexes for table `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_brands_slug` (`slug`);

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_carts_user` (`user_id`),
  ADD KEY `idx_carts_session` (`session_id`);

--
-- Indexes for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_cart_line` (`cart_id`,`product_id`,`variant_id`),
  ADD KEY `idx_cart_items_cart` (`cart_id`),
  ADD KEY `fk_cart_items_product` (`product_id`),
  ADD KEY `fk_cart_items_variant` (`variant_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_categories_slug_type` (`slug`,`type`),
  ADD KEY `idx_categories_parent` (`parent_id`);

--
-- Indexes for table `contact_messages`
--
ALTER TABLE `contact_messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `coupons`
--
ALTER TABLE `coupons`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_coupons_code` (`code`);

--
-- Indexes for table `inventories`
--
ALTER TABLE `inventories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_inv_product` (`product_id`),
  ADD UNIQUE KEY `uq_inv_variant` (`variant_id`);

--
-- Indexes for table `menus`
--
ALTER TABLE `menus`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_menus_name` (`name`);

--
-- Indexes for table `menu_items`
--
ALTER TABLE `menu_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_menu_items_menu` (`menu_id`),
  ADD KEY `idx_menu_items_parent` (`parent_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_orders_code` (`order_code`),
  ADD KEY `idx_orders_user` (`user_id`),
  ADD KEY `idx_orders_coupon` (`coupon_id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_order_items_order` (`order_id`),
  ADD KEY `fk_order_items_product` (`product_id`),
  ADD KEY `fk_order_items_variant` (`variant_id`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_payments_order` (`order_id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_posts_slug` (`slug`),
  ADD KEY `idx_posts_category` (`category_id`);
ALTER TABLE `posts` ADD FULLTEXT KEY `ft_posts_title_content` (`title`,`excerpt`,`content`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_products_slug` (`slug`),
  ADD UNIQUE KEY `uq_products_sku` (`sku`),
  ADD KEY `idx_products_category` (`category_id`),
  ADD KEY `idx_products_brand` (`brand_id`);
ALTER TABLE `products` ADD FULLTEXT KEY `ft_products_name_desc` (`name`,`short_desc`,`description`);

--
-- Indexes for table `product_attribute_values`
--
ALTER TABLE `product_attribute_values`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_prod_attr` (`product_id`,`attribute_id`),
  ADD KEY `idx_pav_attr` (`attribute_id`);

--
-- Indexes for table `product_images`
--
ALTER TABLE `product_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_product_images_product` (`product_id`);

--
-- Indexes for table `product_reviews`
--
ALTER TABLE `product_reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_reviews_product` (`product_id`),
  ADD KEY `idx_reviews_user` (`user_id`);

--
-- Indexes for table `product_variants`
--
ALTER TABLE `product_variants`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_variants_sku` (`sku`),
  ADD KEY `idx_variants_product` (`product_id`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `shipments`
--
ALTER TABLE `shipments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_shipments_order` (`order_id`);

--
-- Indexes for table `sliders`
--
ALTER TABLE `sliders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_users_email` (`email`),
  ADD UNIQUE KEY `uq_users_phone` (`phone`);

--
-- Indexes for table `user_addresses`
--
ALTER TABLE `user_addresses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_user_addresses_user` (`user_id`);

--
-- Indexes for table `user_tokens`
--
ALTER TABLE `user_tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_user_tokens_user` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attributes`
--
ALTER TABLE `attributes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `brands`
--
ALTER TABLE `brands`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `cart_items`
--
ALTER TABLE `cart_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `contact_messages`
--
ALTER TABLE `contact_messages`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `coupons`
--
ALTER TABLE `coupons`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `inventories`
--
ALTER TABLE `inventories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `menus`
--
ALTER TABLE `menus`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `menu_items`
--
ALTER TABLE `menu_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `product_attribute_values`
--
ALTER TABLE `product_attribute_values`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `product_images`
--
ALTER TABLE `product_images`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `product_reviews`
--
ALTER TABLE `product_reviews`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product_variants`
--
ALTER TABLE `product_variants`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `shipments`
--
ALTER TABLE `shipments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sliders`
--
ALTER TABLE `sliders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `user_addresses`
--
ALTER TABLE `user_addresses`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_tokens`
--
ALTER TABLE `user_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `fk_carts_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD CONSTRAINT `fk_cart_items_cart` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_cart_items_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_cart_items_variant` FOREIGN KEY (`variant_id`) REFERENCES `product_variants` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `categories`
--
ALTER TABLE `categories`
  ADD CONSTRAINT `fk_categories_parent` FOREIGN KEY (`parent_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `inventories`
--
ALTER TABLE `inventories`
  ADD CONSTRAINT `fk_inv_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_inv_variant` FOREIGN KEY (`variant_id`) REFERENCES `product_variants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `menu_items`
--
ALTER TABLE `menu_items`
  ADD CONSTRAINT `fk_menu_items_menu` FOREIGN KEY (`menu_id`) REFERENCES `menus` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_menu_items_parent` FOREIGN KEY (`parent_id`) REFERENCES `menu_items` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `fk_orders_coupon` FOREIGN KEY (`coupon_id`) REFERENCES `coupons` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_orders_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `fk_order_items_order` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_order_items_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_order_items_variant` FOREIGN KEY (`variant_id`) REFERENCES `product_variants` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `fk_payments_order` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `fk_posts_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `fk_products_brand` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_products_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `product_attribute_values`
--
ALTER TABLE `product_attribute_values`
  ADD CONSTRAINT `fk_pav_attribute` FOREIGN KEY (`attribute_id`) REFERENCES `attributes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_pav_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `product_images`
--
ALTER TABLE `product_images`
  ADD CONSTRAINT `fk_product_images_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `product_reviews`
--
ALTER TABLE `product_reviews`
  ADD CONSTRAINT `fk_reviews_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_reviews_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `product_variants`
--
ALTER TABLE `product_variants`
  ADD CONSTRAINT `fk_variants_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `shipments`
--
ALTER TABLE `shipments`
  ADD CONSTRAINT `fk_shipments_order` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_addresses`
--
ALTER TABLE `user_addresses`
  ADD CONSTRAINT `fk_user_addresses_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_tokens`
--
ALTER TABLE `user_tokens`
  ADD CONSTRAINT `fk_user_tokens_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
