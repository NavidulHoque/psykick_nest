/*
  Warnings:

  - Made the column `cloudinaryPublicId` on table `Image` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Image` MODIFY `cloudinaryPublicId` VARCHAR(191) NOT NULL;
