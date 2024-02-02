/*
  Warnings:

  - You are about to drop the column `serieId` on the `download` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `download` DROP FOREIGN KEY `download_serieId_fkey`;

-- AlterTable
ALTER TABLE `download` DROP COLUMN `serieId`,
    ADD COLUMN `seasonId` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `season` (
    `seasonId` VARCHAR(191) NOT NULL,
    `seasonNumber` INTEGER NOT NULL,
    `serieId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`seasonId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `season` ADD CONSTRAINT `season_serieId_fkey` FOREIGN KEY (`serieId`) REFERENCES `series`(`serieId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `download` ADD CONSTRAINT `download_seasonId_fkey` FOREIGN KEY (`seasonId`) REFERENCES `season`(`seasonId`) ON DELETE SET NULL ON UPDATE CASCADE;
