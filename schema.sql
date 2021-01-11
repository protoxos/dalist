CREATE TABLE IF NOT EXISTS `listy_items` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `list_id` bigint(20) NOT NULL,
  `name` text NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `creation_time` bigint(20) NOT NULL,
  `order` int(11) NOT NULL DEFAULT 0,
  `check` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `listy_list` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `hash` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
