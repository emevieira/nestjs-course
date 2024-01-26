-- CreateTable
CREATE TABLE `download` (
    `downloadId` INTEGER NOT NULL AUTO_INCREMENT,
    `provedorName` VARCHAR(191) NOT NULL,
    `linkDownload` VARCHAR(191) NOT NULL,
    `movieId` VARCHAR(191) NULL,

    PRIMARY KEY (`downloadId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `download` ADD CONSTRAINT `download_movieId_fkey` FOREIGN KEY (`movieId`) REFERENCES `movies`(`movieId`) ON DELETE SET NULL ON UPDATE CASCADE;
