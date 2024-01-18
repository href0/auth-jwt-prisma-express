-- AlterTable
ALTER TABLE `users` ADD COLUMN `birthdate` INTEGER NULL,
    ADD COLUMN `gender` ENUM('Male', 'Female') NULL,
    ADD COLUMN `phone` VARCHAR(15) NULL;
