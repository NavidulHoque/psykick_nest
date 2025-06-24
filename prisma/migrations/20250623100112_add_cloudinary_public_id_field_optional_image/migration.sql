/*
  Warnings:

  - A unique constraint covering the columns `[cloudinaryPublicId]` on the table `Image` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Image` ADD COLUMN `cloudinaryPublicId` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Image_cloudinaryPublicId_key` ON `Image`(`cloudinaryPublicId`);
