/*
  Warnings:

  - Added the required column `updatedAt` to the `ARVTarget` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `SubCategory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `TMCTarget` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ARVTarget` ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `Category` ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `SubCategory` ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `TMCTarget` ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;
