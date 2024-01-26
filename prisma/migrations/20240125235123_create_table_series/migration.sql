-- AlterTable
ALTER TABLE `download` ADD COLUMN `serieId` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `series` (
    `serieId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `releaseYear` VARCHAR(191) NOT NULL,
    `bannerUrl` VARCHAR(191) NOT NULL,
    `imageUrl` VARCHAR(191) NOT NULL,
    `trailerLink` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `categoryId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`serieId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `series` ADD CONSTRAINT `series_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `categories`(`categoryId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `download` ADD CONSTRAINT `download_serieId_fkey` FOREIGN KEY (`serieId`) REFERENCES `series`(`serieId`) ON DELETE SET NULL ON UPDATE CASCADE;
