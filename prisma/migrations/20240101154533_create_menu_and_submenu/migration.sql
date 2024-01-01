/*
  Warnings:

  - You are about to drop the `menu` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `submenu` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `submenu` DROP FOREIGN KEY `SubMenu_menuId_fkey`;

-- DropTable
DROP TABLE `menu`;

-- DropTable
DROP TABLE `submenu`;

-- CreateTable
CREATE TABLE `menus` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `icon` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NULL,

    UNIQUE INDEX `menus_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sub_menus` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `menuId` INTEGER NOT NULL,
    `icon` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NULL,

    UNIQUE INDEX `sub_menus_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `sub_menus` ADD CONSTRAINT `sub_menus_menuId_fkey` FOREIGN KEY (`menuId`) REFERENCES `menus`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
