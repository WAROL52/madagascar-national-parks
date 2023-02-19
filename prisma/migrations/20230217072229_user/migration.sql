-- CreateTable
CREATE TABLE `Email` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `passwordToken` VARCHAR(191) NULL,
    `role` ENUM('ResponsableSite', 'Admin', 'SuperAdmin') NOT NULL DEFAULT 'Admin',

    UNIQUE INDEX `Email_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `emailId` INTEGER NOT NULL,
    `nom` VARCHAR(191) NOT NULL,
    `prenom` VARCHAR(191) NOT NULL,
    `motdepasse` VARCHAR(191) NULL,
    `tel1` VARCHAR(191) NULL,
    `tel2` VARCHAR(191) NULL,
    `adresse` VARCHAR(191) NULL,
    `dataNaissance` DATETIME(3) NULL,
    `lieuNaissance` VARCHAR(191) NULL,
    `sexe` ENUM('Homme', 'Femme') NOT NULL DEFAULT 'Homme',
    `description` VARCHAR(191) NULL,
    `avatar` VARCHAR(191) NULL,

    UNIQUE INDEX `User_emailId_key`(`emailId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Site` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RisqueProjet` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `value` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `color` VARCHAR(191) NULL DEFAULT 'white',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RisqueTache` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `color` VARCHAR(191) NULL DEFAULT 'white',
    `value` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Etape` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `risqueProjetId` INTEGER NOT NULL,
    `risqueTacheId` INTEGER NOT NULL,
    `progression` INTEGER NULL DEFAULT 0,
    `debutPrevionnel` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `nombreDeJours` INTEGER NULL DEFAULT 0,
    `finPrevisionnel` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `debutReel` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `finReel` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `perturbation` INTEGER NULL DEFAULT 0,
    `tempsConsommes` INTEGER NULL DEFAULT 0,
    `formationId` INTEGER NOT NULL,
    `excecutionId` INTEGER NULL,

    INDEX `Etape_risqueTacheId_idx`(`risqueTacheId`),
    INDEX `Etape_risqueProjetId_idx`(`risqueProjetId`),
    INDEX `Etape_formationId_idx`(`formationId`),
    INDEX `Etape_excecutionId_idx`(`excecutionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ResponsableSite` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `siteId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `ResponsableSite_siteId_key`(`siteId`),
    UNIQUE INDEX `ResponsableSite_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Formation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `siteId` INTEGER NOT NULL,

    UNIQUE INDEX `Formation_siteId_key`(`siteId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Excecution` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `siteId` INTEGER NOT NULL,

    UNIQUE INDEX `Excecution_siteId_key`(`siteId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
