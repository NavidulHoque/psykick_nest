/*
  Warnings:

  - You are about to drop the column `controlImage` on the `ARVTarget` table. All the data in the column will be lost.
  - You are about to drop the column `resultImage` on the `ARVTarget` table. All the data in the column will be lost.
  - You are about to drop the column `isUsed` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `targetImage` on the `TMCTarget` table. All the data in the column will be lost.
  - You are about to drop the `ARVTargetControlImages` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TMCTargetControlImages` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `ARVTargetControlImages` DROP FOREIGN KEY `ARVTargetControlImages_ARVTargetId_fkey`;

-- DropForeignKey
ALTER TABLE `ARVTargetControlImages` DROP FOREIGN KEY `ARVTargetControlImages_imageId_fkey`;

-- DropForeignKey
ALTER TABLE `TMCTargetControlImages` DROP FOREIGN KEY `TMCTargetControlImages_TMCTargetId_fkey`;

-- DropForeignKey
ALTER TABLE `TMCTargetControlImages` DROP FOREIGN KEY `TMCTargetControlImages_imageId_fkey`;

-- AlterTable
ALTER TABLE `ARVTarget` DROP COLUMN `controlImage`,
    DROP COLUMN `resultImage`;

-- AlterTable
ALTER TABLE `Image` DROP COLUMN `isUsed`;

-- AlterTable
ALTER TABLE `TMCTarget` DROP COLUMN `targetImage`;

-- DropTable
DROP TABLE `ARVTargetControlImages`;

-- DropTable
DROP TABLE `TMCTargetControlImages`;

-- CreateTable
CREATE TABLE `ARVTargetImages` (
    `id` VARCHAR(191) NOT NULL,
    `imageId` VARCHAR(191) NOT NULL,
    `ARVTargetId` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `isTargetImage` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TMCTargetImages` (
    `id` VARCHAR(191) NOT NULL,
    `imageId` VARCHAR(191) NOT NULL,
    `TMCTargetId` VARCHAR(191) NOT NULL,
    `isTargetImage` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ARVTargetImages` ADD CONSTRAINT `ARVTargetImages_imageId_fkey` FOREIGN KEY (`imageId`) REFERENCES `Image`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ARVTargetImages` ADD CONSTRAINT `ARVTargetImages_ARVTargetId_fkey` FOREIGN KEY (`ARVTargetId`) REFERENCES `ARVTarget`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TMCTargetImages` ADD CONSTRAINT `TMCTargetImages_imageId_fkey` FOREIGN KEY (`imageId`) REFERENCES `Image`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TMCTargetImages` ADD CONSTRAINT `TMCTargetImages_TMCTargetId_fkey` FOREIGN KEY (`TMCTargetId`) REFERENCES `TMCTarget`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
