-- AlterTable
ALTER TABLE `role_permissions` ADD COLUMN `canUpdateOthers` TINYINT NOT NULL DEFAULT 0;
