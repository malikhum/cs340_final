-- Bookstore Database Data Manipulation Queries

-- INSERT QUERIES

-- Insert a new book
INSERT INTO Books (title, genreID, publicationYear, price, publisherID)
VALUES (:title, (SELECT genreID FROM Genres WHERE name = :genreName), :publicationYear, :price, (SELECT publisherID FROM Publishers WHERE name = :publisherName));

-- Insert a new author
INSERT INTO Authors (name, biography)
VALUES (:name, :biography);

-- Insert a new publisher
INSERT INTO Publishers (name, street, city, state, country)
VALUES (:name, :street, :city, :state, :country);

-- Insert a new genre
INSERT INTO Genres (name)
VALUES (:name);

-- Insert a new sale
INSERT INTO Sales (bookID, quantity, saleDate)
VALUES ((SELECT bookID FROM Books WHERE title = :bookTitle), :quantity, :saleDate);

-- Insert a new book-author association
INSERT INTO BookAuthors (bookID, authorID)
VALUES ((SELECT bookID FROM Books WHERE title = :bookTitle), (SELECT authorID FROM Authors WHERE name = :authorName));

-- UPDATE QUERIES

-- Update a book's price
UPDATE Books
SET price = :price
WHERE bookID = :bookID;

-- Update a book's genre
UPDATE Books
SET genreID = (SELECT genreID FROM Genres WHERE name = :genreName)
WHERE bookID = :bookID;

-- Update a publisher's address
UPDATE Publishers
SET street = :street, city = :city, state = :state, country = :country
WHERE publisherID = :publisherID;

-- Update an author's biography
UPDATE Authors
SET biography = :biography
WHERE authorID = :authorID;

-- DELETE QUERIES

-- Remove a book-author association
DELETE FROM BookAuthors
WHERE bookAuthorID = :bookAuthorID;

-- Delete a book
DELETE FROM Books
WHERE bookID = :bookID;

-- Delete an author
DELETE FROM Authors
WHERE authorID = :authorID;

-- Delete a publisher
DELETE FROM Publishers
WHERE publisherID = :publisherID;

-- SELECT QUERIES

-- Select all books
SELECT * FROM Books;

-- Select all authors
SELECT * FROM Authors;

-- Select all publishers
SELECT * FROM Publishers;

-- Select all genres
SELECT * FROM Genres;

-- Select all sales
SELECT * FROM Sales;

-- Select all book-author associations
SELECT * FROM BookAuthors;

-- Additional Functionalities (If Required)

-- For example, setting a foreign key to NULL (if that's a requirement for one of the relationships)
UPDATE Orders
SET employeeID = NULL
WHERE orderID = :orderID;

-- Deleting a book and handling the M:M relationship with authors (CASCADE should take care of this)
DELETE FROM Books
WHERE bookID = :bookID;

-- SQL comment on special character notation
-- The ':' denotes placeholders for values provided by the back-end logic.
