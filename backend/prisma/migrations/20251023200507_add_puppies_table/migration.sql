-- CreateTable
CREATE TABLE `Puppy` (
    `pet_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `breed` VARCHAR(191) NULL,
    `age_est` INTEGER NULL,
    `current_kennel_number` INTEGER NULL,

    PRIMARY KEY (`pet_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
