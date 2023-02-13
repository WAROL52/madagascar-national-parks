/*
  Warnings:

  - Added the required column `passwordToken` to the `Email` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `email` ADD COLUMN `passwordToken` VARCHAR(191) NOT NULL;
