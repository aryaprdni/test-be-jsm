/*
  Warnings:

  - A unique constraint covering the columns `[t_level_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `t_level_id` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `t_level_id` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `t_levels` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `level_name` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `users_t_level_id_key` ON `users`(`t_level_id`);

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_t_level_id_fkey` FOREIGN KEY (`t_level_id`) REFERENCES `t_levels`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
