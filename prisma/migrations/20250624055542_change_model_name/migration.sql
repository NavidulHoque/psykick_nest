/*
  Warnings:

  - You are about to drop the `ARVTargetImages` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TMCTargetImages` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `ARVTargetImages` DROP FOREIGN KEY `ARVTargetImages_ARVTargetId_fkey`;

-- DropForeignKey
ALTER TABLE `ARVTargetImages` DROP FOREIGN KEY `ARVTargetImages_imageId_fkey`;

-- DropForeignKey
ALTER TABLE `TMCTargetImages` DROP FOREIGN KEY `TMCTargetImages_TMCTargetId_fkey`;

-- DropForeignKey
ALTER TABLE `TMCTargetImages` DROP FOREIGN KEY `TMCTargetImages_imageId_fkey`;

-- DropTable
DROP TABLE `ARVTargetImages`;

-- DropTable
DROP TABLE `TMCTargetImages`;

-- CreateTable
CREATE TABLE `ARVTargetControlImages` (
    `id` VARCHAR(191) NOT NULL,
    `imageId` VARCHAR(191) NOT NULL,
    `ARVTargetId` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TMCTargetControlImages` (
    `id` VARCHAR(191) NOT NULL,
    `imageId` VARCHAR(191) NOT NULL,
    `TMCTargetId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ARVTargetControlImages` ADD CONSTRAINT `ARVTargetControlImages_imageId_fkey` FOREIGN KEY (`imageId`) REFERENCES `Image`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ARVTargetControlImages` ADD CONSTRAINT `ARVTargetControlImages_ARVTargetId_fkey` FOREIGN KEY (`ARVTargetId`) REFERENCES `ARVTarget`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TMCTargetControlImages` ADD CONSTRAINT `TMCTargetControlImages_imageId_fkey` FOREIGN KEY (`imageId`) REFERENCES `Image`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TMCTargetControlImages` ADD CONSTRAINT `TMCTargetControlImages_TMCTargetId_fkey` FOREIGN KEY (`TMCTargetId`) REFERENCES `TMCTarget`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
