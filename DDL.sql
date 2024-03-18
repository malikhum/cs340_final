-- Team BooksWiki - Cade Wisecaver and Humayl Malik
-- CS340 Project Database SQL Script

SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

-- -----------------------------------------------------
-- Table `Authors`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Authors`;
CREATE TABLE IF NOT EXISTS `Authors` (
  `authorID` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(225) NOT NULL,
  `biography` TEXT NULL,
  PRIMARY KEY (`authorID`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `Publishers`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Publishers`;
CREATE TABLE IF NOT EXISTS `Publishers` (
  `publisherID` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(225) NOT NULL,
  `street` VARCHAR(225) NOT NULL,
  `city` VARCHAR(225) NOT NULL,
  `state` VARCHAR(225) NULL,
  `country` VARCHAR(225) NOT NULL,
  PRIMARY KEY (`publisherID`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `Genres`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Genres`;
CREATE TABLE IF NOT EXISTS `Genres` (
  `genreID` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(225) NOT NULL,
  PRIMARY KEY (`genreID`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `Books`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Books`;
CREATE TABLE IF NOT EXISTS `Books` (
  `bookID` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(225) NOT NULL,
  `genreID` INT NULL,  
  `publicationYear` INT NOT NULL,
  `price` DECIMAL(10,2) NOT NULL,
  `publisherID` INT NOT NULL,
  PRIMARY KEY (`bookID`),
  INDEX `fk_Books_Publishers_idx` (`publisherID`),
  INDEX `fk_Books_Genres_idx` (`genreID`),
  CONSTRAINT `fk_Books_Publishers`
    FOREIGN KEY (`publisherID`)
    REFERENCES `Publishers` (`publisherID`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Books_Genres`
    FOREIGN KEY (`genreID`)
    REFERENCES `Genres` (`genreID`)
    ON DELETE SET NULL  
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `BookAuthors`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `BookAuthors`;
CREATE TABLE IF NOT EXISTS `BookAuthors` (
  `bookAuthorID` INT NOT NULL AUTO_INCREMENT,
  `bookID` INT NOT NULL,
  `authorID` INT NOT NULL,
  PRIMARY KEY (`bookAuthorID`),
  INDEX `fk_BookAuthors_Authors_idx` (`authorID`),
  INDEX `fk_BookAuthors_Books_idx` (`bookID`),
  CONSTRAINT `fk_BookAuthors_Books`
    FOREIGN KEY (`bookID`)
    REFERENCES `Books` (`bookID`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_BookAuthors_Authors`
    FOREIGN KEY (`authorID`)
    REFERENCES `Authors` (`authorID`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `Sales`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Sales`;
CREATE TABLE IF NOT EXISTS `Sales` (
  `saleID` INT NOT NULL AUTO_INCREMENT,
  `bookID` INT NOT NULL,
  `quantity` INT NOT NULL,
  `saleDate` DATE NOT NULL,
  PRIMARY KEY (`saleID`),
  INDEX `fk_Sales_Books_idx` (`bookID`),
  CONSTRAINT `fk_Sales_Books`
    FOREIGN KEY (`bookID`)
    REFERENCES `Books` (`bookID`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- INSERTING DATA INTO TABLES
-- -----------------------------------------------------

-- Insert data for Authors
INSERT INTO `Authors` (`name`, `biography`) VALUES
('F. Scott Fitzgerald', 'American Novelist, famous for Jazz Age novels'),
('George Orwell', 'English Novelist and critic, noted for political and dystopian themes'),
('Harper Lee', 'American Novelist, best known for writing about racial injustice'),
('Aldous Huxley', 'English Writer and philosopher'),
('J.D. Salinger', 'American Writer known for the novel "The Catcher in the Rye"');

-- Insert data for Publishers
INSERT INTO `Publishers` (`name`, `street`, `city`, `state`, `country`) VALUES
('Penguin Books', '80 Strand', 'London', NULL, 'England'),
('HarperCollins', '195 Broadway', 'New York', 'NY', 'USA'),
('Simon & Schuster', '1230 Avenue of the Americas', 'New York', 'NY', 'USA'),
('Hachette Book Group', '1290 Avenue of the Americas', 'New York', 'NY', 'USA'),
('Macmillian Publishers', '120 Broadway', 'New York', 'NY', 'USA');

-- Insert data for Genres
INSERT INTO `Genres` (`name`) VALUES
('Classic'),
('Dystopian'),
('Southern Gothic'),
('Coming-of-Age');

-- Insert data for Books
INSERT INTO `Books` (`title`, `genreID`, `publicationYear`, `price`, `publisherID`) VALUES
('The Great Gatsby', (SELECT `genreID` FROM `Genres` WHERE `name` = 'Classic'), 1925, 15.99, (SELECT `publisherID` FROM `Publishers` WHERE `name` = 'Penguin Books')),
('1984', (SELECT `genreID` FROM `Genres` WHERE `name` = 'Dystopian'), 1949, 15.00, (SELECT `publisherID` FROM `Publishers` WHERE `name` = 'HarperCollins')),
('To Kill A Mockingbird', (SELECT `genreID` FROM `Genres` WHERE `name` = 'Southern Gothic'), 1960, 18.00, (SELECT `publisherID` FROM `Publishers` WHERE `name` = 'Simon & Schuster')),
('Brave New World', (SELECT `genreID` FROM `Genres` WHERE `name` = 'Dystopian'), 1932, 22.00, (SELECT `publisherID` FROM `Publishers` WHERE `name` = 'Hachette Book Group')),
('The Catcher in the Rye', (SELECT `genreID` FROM `Genres` WHERE `name` = 'Coming-of-Age'), 1951, 17.00, (SELECT `publisherID` FROM `Publishers` WHERE `name` = 'Macmillian Publishers'));

-- Insert data for BookAuthors
INSERT INTO `BookAuthors` (`bookID`, `authorID`) VALUES
((SELECT `bookID` FROM `Books` WHERE `title` = 'The Great Gatsby'), (SELECT `authorID` FROM `Authors` WHERE `name` = 'F. Scott Fitzgerald')),
((SELECT `bookID` FROM `Books` WHERE `title` = '1984'), (SELECT `authorID` FROM `Authors` WHERE `name` = 'George Orwell')),
((SELECT `bookID` FROM `Books` WHERE `title` = 'To Kill A Mockingbird'), (SELECT `authorID` FROM `Authors` WHERE `name` = 'Harper Lee')),
((SELECT `bookID` FROM `Books` WHERE `title` = 'Brave New World'), (SELECT `authorID` FROM `Authors` WHERE `name` = 'Aldous Huxley')),
((SELECT `bookID` FROM `Books` WHERE `title` = 'The Catcher in the Rye'), (SELECT `authorID` FROM `Authors` WHERE `name` = 'J.D. Salinger'));

-- Insert data for Sales
INSERT INTO `Sales` (`bookID`, `quantity`, `saleDate`) VALUES
((SELECT `bookID` FROM `Books` WHERE `title` = 'The Great Gatsby'), 3, '2024-02-01'),
((SELECT `bookID` FROM `Books` WHERE `title` = '1984'), 1, '2024-02-02'),
((SELECT `bookID` FROM `Books` WHERE `title` = 'To Kill A Mockingbird'), 2, '2024-02-03'),
((SELECT `bookID` FROM `Books` WHERE `title` = 'Brave New World'), 4, '2024-02-04'),
((SELECT `bookID` FROM `Books` WHERE `title` = 'The Catcher in the Rye'), 5, '2024-02-05');



SET FOREIGN_KEY_CHECKS=1;
COMMIT;
