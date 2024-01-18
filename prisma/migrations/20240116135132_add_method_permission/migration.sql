-- AlterTable
ALTER TABLE `permission` ADD COLUMN `method` ENUM('GET', 'POST', 'PUT', 'PATCH', 'DELETE') NOT NULL DEFAULT 'GET';
