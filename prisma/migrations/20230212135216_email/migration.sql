/*
  Warnings:

  - You are about to drop the column `email` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[emailId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `emailId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `User_email_key` ON `user`;

-- AlterTable
ALTER TABLE `email` ADD COLUMN `role` ENUM('ResponsableSite', 'Admin', 'SuperAdmin') NOT NULL DEFAULT 'Admin',
    MODIFY `passwordToken` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `email`,
    ADD COLUMN `emailId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_emailId_key` ON `User`(`emailId`);
