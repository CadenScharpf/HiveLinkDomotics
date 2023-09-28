-- CreateTable
CREATE TABLE `cart_item` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `session_id` INTEGER NOT NULL,
    `product_id` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL,
    `updated_at` TIMESTAMP(0) NOT NULL,

    INDEX `FK_product_TO_cart_item`(`product_id`),
    INDEX `FK_shopping_session_TO_cart_item`(`session_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `device` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `category_id` INTEGER NOT NULL,
    `manufacturer` VARCHAR(20) NOT NULL,
    `model` VARCHAR(20) NULL,
    `name` VARCHAR(50) NULL,
    `description` TEXT NULL,
    `created_at` TIMESTAMP(0) NOT NULL,
    `updated_at` TIMESTAMP(0) NOT NULL,

    INDEX `FK_device_category_TO_device`(`category_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `device_category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(20) NOT NULL,
    `description` TEXT NULL,
    `created_at` TIMESTAMP(0) NOT NULL,
    `updated_at` TIMESTAMP(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `order_details` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `payment_id` INTEGER NOT NULL,
    `address_id` INTEGER NOT NULL,
    `total` DECIMAL(10, 2) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL,
    `updated_at` TIMESTAMP(0) NOT NULL,

    INDEX `FK_payment_details_TO_order_details`(`payment_id`),
    INDEX `FK_user_TO_order_details`(`user_id`),
    INDEX `FK_user_address_TO_order_details`(`address_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `order_items` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `order_id` INTEGER NOT NULL,
    `product_id` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL,
    `updated_at` TIMESTAMP(0) NOT NULL,

    INDEX `FK_order_details_TO_order_items`(`order_id`),
    INDEX `FK_product_TO_order_items`(`product_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payment_details` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_payment_id` INTEGER NOT NULL,
    `amount` DECIMAL(10, 2) NOT NULL,
    `status` VARCHAR(10) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL,
    `updated_at` TIMESTAMP(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `category_id` INTEGER NOT NULL,
    `discount_id` INTEGER NOT NULL,
    `inventory_id` INTEGER NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `description` TEXT NULL,
    `sku` VARCHAR(50) NOT NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `active` BOOLEAN NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL,
    `updated_at` TIMESTAMP(0) NOT NULL,

    INDEX `FK_product_category_TO_product`(`category_id`),
    INDEX `FK_product_discount_TO_product`(`discount_id`),
    INDEX `FK_product_inventory_TO_product`(`inventory_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product_category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(20) NOT NULL,
    `description` TEXT NULL,
    `created_at` TIMESTAMP(0) NOT NULL,
    `updated_at` TIMESTAMP(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product_discount` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(20) NOT NULL,
    `description` TEXT NULL,
    `percent` DECIMAL(10, 2) NOT NULL,
    `active` BOOLEAN NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL,
    `updated_at` TIMESTAMP(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product_inventory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `quantity` INTEGER NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL,
    `updated_at` TIMESTAMP(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `shopping_session` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `total` DECIMAL(10, 2) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL,
    `updated_at` TIMESTAMP(0) NOT NULL,

    INDEX `FK_user_TO_shopping_session`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `telephone` VARCHAR(20) NULL,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `role` INTEGER NOT NULL,
    `auth_hash` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL,
    `updated_at` TIMESTAMP(0) NOT NULL,

    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_address` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `address_line1` VARCHAR(255) NOT NULL,
    `address_line2` VARCHAR(255) NULL,
    `city` VARCHAR(255) NOT NULL,
    `postal_code` VARCHAR(255) NOT NULL,
    `country` VARCHAR(255) NOT NULL,
    `telephone` VARCHAR(20) NOT NULL,
    `mobile` VARCHAR(20) NULL,
    `created_at` TIMESTAMP(0) NOT NULL,
    `updated_at` TIMESTAMP(0) NOT NULL,

    INDEX `FK_user_TO_user_address`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_home` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `address_id` INTEGER NULL,
    `name` VARCHAR(50) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL,
    `updated_at` TIMESTAMP(0) NOT NULL,

    INDEX `FK_user_TO_user_home`(`user_id`),
    INDEX `FK_user_address_TO_user_home`(`address_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_room` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `home_id` INTEGER NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL,
    `updated_at` TIMESTAMP(0) NOT NULL,

    INDEX `FK_user_TO_user_room`(`user_id`),
    INDEX `FK_user_home_TO_user_room`(`home_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_device` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `device_id` INTEGER NOT NULL,
    `room_id` INTEGER NOT NULL,
    `product_id` INTEGER NULL,
    `name` VARCHAR(50) NOT NULL,
    `last_conn` TIMESTAMP(0) NULL,
    `created_at` TIMESTAMP(0) NOT NULL,
    `updated_at` TIMESTAMP(0) NOT NULL,

    INDEX `FK_device_TO_user_device`(`device_id`),
    INDEX `FK_product_TO_user_device`(`product_id`),
    INDEX `FK_user_TO_user_device`(`user_id`),
    INDEX `FK_user_room_TO_user_device`(`room_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_payment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `payment_type` VARCHAR(20) NOT NULL,
    `account_no` VARCHAR(50) NOT NULL,
    `provider` VARCHAR(50) NOT NULL,
    `expiry` DATE NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL,
    `updated_at` TIMESTAMP(0) NOT NULL,

    INDEX `FK_user_TO_user_payment`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `cart_item` ADD CONSTRAINT `FK_product_TO_cart_item` FOREIGN KEY (`product_id`) REFERENCES `product`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `cart_item` ADD CONSTRAINT `FK_shopping_session_TO_cart_item` FOREIGN KEY (`session_id`) REFERENCES `shopping_session`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `device` ADD CONSTRAINT `FK_device_category_TO_device` FOREIGN KEY (`category_id`) REFERENCES `device_category`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `order_details` ADD CONSTRAINT `FK_payment_details_TO_order_details` FOREIGN KEY (`payment_id`) REFERENCES `payment_details`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `order_details` ADD CONSTRAINT `FK_user_TO_order_details` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `order_details` ADD CONSTRAINT `FK_user_address_TO_order_details` FOREIGN KEY (`address_id`) REFERENCES `user_address`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `order_items` ADD CONSTRAINT `FK_order_details_TO_order_items` FOREIGN KEY (`order_id`) REFERENCES `order_details`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `order_items` ADD CONSTRAINT `FK_product_TO_order_items` FOREIGN KEY (`product_id`) REFERENCES `product`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `FK_product_category_TO_product` FOREIGN KEY (`category_id`) REFERENCES `product_category`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `FK_product_discount_TO_product` FOREIGN KEY (`discount_id`) REFERENCES `product_discount`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `FK_product_inventory_TO_product` FOREIGN KEY (`inventory_id`) REFERENCES `product_inventory`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `shopping_session` ADD CONSTRAINT `FK_user_TO_shopping_session` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user_address` ADD CONSTRAINT `FK_user_TO_user_address` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user_home` ADD CONSTRAINT `FK_user_TO_user_home` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user_home` ADD CONSTRAINT `FK_user_address_TO_user_home` FOREIGN KEY (`address_id`) REFERENCES `user_address`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user_room` ADD CONSTRAINT `FK_user_TO_user_room` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user_room` ADD CONSTRAINT `FK_user_home_TO_user_room` FOREIGN KEY (`home_id`) REFERENCES `user_home`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user_device` ADD CONSTRAINT `FK_device_TO_user_device` FOREIGN KEY (`device_id`) REFERENCES `device`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user_device` ADD CONSTRAINT `FK_product_TO_user_device` FOREIGN KEY (`product_id`) REFERENCES `product`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user_device` ADD CONSTRAINT `FK_user_TO_user_device` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user_device` ADD CONSTRAINT `FK_user_room_TO_user_device` FOREIGN KEY (`room_id`) REFERENCES `user_room`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user_payment` ADD CONSTRAINT `FK_user_TO_user_payment` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

