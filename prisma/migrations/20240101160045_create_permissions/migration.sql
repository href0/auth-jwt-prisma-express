/*
  Warnings:

  - You are about to drop the column `name` on the `role_permissions` table. All the data in the column will be lost.
  - Added the required column `permissionId` to the `role_permissions` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `role_permissions_name_key` ON `role_permissions`;

-- AlterTable
ALTER TABLE `role_permissions` DROP COLUMN `name`,
    ADD COLUMN `permissionId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Permission` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Permission_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `role_permissions` ADD CONSTRAINT `role_permissions_permissionId_fkey` FOREIGN KEY (`permissionId`) REFERENCES `Permission`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
