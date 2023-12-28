/*
  Warnings:

  - You are about to drop the column `assignedToUserId` on the `Issue` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Issue` DROP FOREIGN KEY `Issue_assignedToUserId_fkey`;

-- AlterTable
ALTER TABLE `Issue` DROP COLUMN `assignedToUserId`,
    ADD COLUMN `ownerId` VARCHAR(255) NULL;

-- AddForeignKey
ALTER TABLE `Issue` ADD CONSTRAINT `Issue_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
