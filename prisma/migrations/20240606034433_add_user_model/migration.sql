-- CreateTable
CREATE TABLE `users` (
    `email` VARCHAR(100) NOT NULL,
    `username` VARCHAR(100) NULL,
    `full_name` VARCHAR(100) NULL,
    `password` VARCHAR(100) NOT NULL,
    `phone_number` INTEGER NULL,
    `token` VARCHAR(191) NULL,

    PRIMARY KEY (`email`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
