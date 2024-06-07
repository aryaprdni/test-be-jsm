/*
  Warnings:

  - Added the required column `t_department_id` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `t_department_id` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `t_departments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `department_name` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_t_department_id_fkey` FOREIGN KEY (`t_department_id`) REFERENCES `t_departments`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
