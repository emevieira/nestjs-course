/*
  Warnings:

  - You are about to drop the `download` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `download` DROP FOREIGN KEY `download_movieId_fkey`;

-- DropForeignKey
ALTER TABLE `download` DROP FOREIGN KEY `download_seasonId_fkey`;

-- DropTable
DROP TABLE `download`;

-- CreateTable
CREATE TABLE `movieDownloads` (
    `movieDownloadId` INTEGER NOT NULL AUTO_INCREMENT,
    `provedorName` VARCHAR(191) NOT NULL,
    `linkDownload` VARCHAR(191) NOT NULL,
    `movieId` VARCHAR(191) NULL,

    PRIMARY KEY (`movieDownloadId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `seasonDownloads` (
    `seasonDownloadId` INTEGER NOT NULL AUTO_INCREMENT,
    `provedorName` VARCHAR(191) NOT NULL,
    `linkDownload` VARCHAR(191) NOT NULL,
    `seasonId` VARCHAR(191) NULL,

    PRIMARY KEY (`seasonDownloadId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `movieDownloads` ADD CONSTRAINT `movieDownloads_movieId_fkey` FOREIGN KEY (`movieId`) REFERENCES `movies`(`movieId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `seasonDownloads` ADD CONSTRAINT `seasonDownloads_seasonId_fkey` FOREIGN KEY (`seasonId`) REFERENCES `season`(`seasonId`) ON DELETE SET NULL ON UPDATE CASCADE;
