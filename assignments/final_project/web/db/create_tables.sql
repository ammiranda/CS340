CREATE TABLE `actor` (
   `id` INT(11) PRIMARY KEY AUTO_INCREMENT,
   `fname` VARCHAR(255) NOT NULL,
   `lname` VARCHAR(255) NOT NULL,
   `website` VARCHAR(255),
   `twitter` VARCHAR(255)	
) ENGINE=’innoDB’;

CREATE TABLE `st_character` (
   `id` INT(11) PRIMARY KEY AUTO_INCREMENT,
   `fname` VARCHAR(255) NOT NULL,
   `lname` VARCHAR(255) NOT NULL,
   `role` VARCHAR(255) NOT NULL,
   `race` VARCHAR(255) NOT NULL
) ENGINE=’innoDB’;

CREATE TABLE `series` (
   `id` INT(11) PRIMARY KEY AUTO_INCREMENT,
   `title` VARCHAR(255) NOT NULL,
   `creator_fname` VARCHAR(255),
   `creator_lname` VARCHAR(255) NOT NULL,
   `start_date` DATE,
   `end_date` DATE,
   `studio_id` INT(11),
   FOREIGN KEY(`studio_id`) REFERENCES studio(`id`)
      ON DELETE CASCADE
      ON UPDATE CASCADE
) ENGINE=’innoDB’;

CREATE TABLE `episode` (
   `id` INT(11) PRIMARY KEY AUTO_INCREMENT,
   `title` VARCHAR(255) NOT NULL,
   `episode_number` INT(11) NOT NULL,
   `season_number` INT(11) NOT NULL,
   `air_date` DATE,
   `series_id` INT(11),
   FOREIGN KEY(`series_id`) REFERENCES series(`id`)
      ON DELETE CASCADE
      ON UPDATE CASCADE
) ENGINE=’innoDB’;

CREATE TABLE `studio` (
   `id` INT(11) PRIMARY KEY AUTO_INCREMENT,
   `name` VARCHAR(255) NOT NULL,
   `address` VARCHAR(255),
   `website` VARCHAR(255)
) ENGINE=’innoDB’;

CREATE TABLE `actor_series` (
   `actor_id` INT(11),
   `series_id` INT(11),
   PRIMARY KEY (`actor_id`, `series_id`),
   FOREIGN KEY (`actor_id`) REFERENCES actor(`id`)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
   FOREIGN KEY (`series_id`) REFERENCES series(`id`)
      ON DELETE CASCADE
      ON UPDATE CASCADE
) ENGINE=’innoDB’;

CREATE TABLE `actor_character` (
   `actor_id` INT(11),
   `character_id` INT(11),
   PRIMARY KEY (`actor_id`, `character_id`),
   FOREIGN KEY (`actor_id`) REFERENCES actor(`id`)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
   FOREIGN KEY (`character_id`) REFERENCES st_character(`id`)
      ON DELETE CASCADE
      ON UPDATE CASCADE
) ENGINE=’innoDB’;

CREATE TABLE `character_episode` (
   `character_id` INT(11),
   `episode_id` INT(11),
   PRIMARY KEY (`character_id`, `episode_id`),
   FOREIGN KEY (`character_id`) REFERENCES st_character(`id`),
   FOREIGN KEY (`episode_id`) REFERENCES episode(`id`)
) ENGINE=’innoDB’;
