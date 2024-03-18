/* 
Students: Cade Wisecaver and Humayl Malik
Team: BooksWiki
Course: CS340 - Group 38
Code Citations: Code was used/inspired from the CS340  GitHub we also add citations for each function that used/adapted those given functions
https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/

const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const db = require('./database/db-connector');

const app = express();

// Setup Handlebars view engine
app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', 'hbs');

// Serve static files
app.use(express.static('public'));

// Apply body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define the server's port
const PORT = process.env.PORT || 61452;

// Home page route
app.get('/', (req, res) => {
    res.render('index');
});

/*
Citation for the following function:
Date: 03/17/2024
Adapted from (used as starter code and add/deleted from there)
Our function,focuses on retrieving and displaying data from existing database tables, 
specifically Books, Genres, and Publishers. This adaptation shows a more complex application 
with nested queries and practical data retrieval for web page rendering, demonstrating 
a significant evolution from the simpler, setup-oriented nature of the original code.
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data
*/

// Route handler for the '/books' endpoint
app.get('/books', (req, res) => {
    // Queries for fetching data from Books, Genres, and Publishers tables
    const booksQuery = 'SELECT * FROM Books;';
    const genresQuery = 'SELECT * FROM Genres;';
    const publishersQuery = 'SELECT * FROM Publishers;';

    // Execute query to fetch books data
    db.pool.query(booksQuery, (error, books) => {
        if (error) {
            // Send error response if there's a database connection issue
            res.send('Error encountered while connecting to the database.');
        } else {
            // Nested queries to fetch genres and publishers after fetching books
            db.pool.query(genresQuery, (error, genres) => {
                if (error) {
                    res.send('Error encountered while connecting to the database.');
                } else {
                    db.pool.query(publishersQuery, (error, publishers) => {
                        if (error) {
                            res.send('Error encountered while connecting to the database.');
                        } else {
                            // Render the 'books' view with the fetched data
                            res.render('books', { books: books, genres: genres, publishers: publishers });
                        }
                    });
                }
            });
        }
    });
});

// POST route for book search functionality. 
// This function handles a search request for books, using a query that matches against multiple fields (title, year, publisher, genre).
// It uses placeholders in the SQL query for search term injection, which helps prevent SQL injection.
// Upon successful retrieval of book data, it also fetches genre and publisher data to be rendered alongside the search results.
// Made completley by the team 
app.post('/books/search', (req, res) => {
    const searchQuery = req.body.searchQuery;
    const searchSQL = `
        SELECT * FROM Books
        WHERE title LIKE ? OR CAST(publicationYear AS CHAR) LIKE ? OR CAST(publisherID AS CHAR) LIKE ? OR CAST(genreID AS CHAR) LIKE ?;
    `;
    const searchTerms = [`%${searchQuery}%`, `%${searchQuery}%`, `%${searchQuery}%`, `%${searchQuery}%`];

    db.pool.query(searchSQL, searchTerms, (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error encountered while searching for books.');
        } else {
            // Assuming you have functions to get all genres and publishers
            getAllGenres((genresError, allGenres) => {
                if (genresError) {
                    console.error(genresError);
                    res.status(500).send('Error encountered while fetching genres.');
                } else {
                    getAllPublishers((publishersError, allPublishers) => {
                        if (publishersError) {
                            console.error(publishersError);
                            res.status(500).send('Error encountered while fetching publishers.');
                        } else {
                            // Render the books page with search results and all genres and publishers
                            res.render('books', {
                                books: results,
                                genres: allGenres,
                                publishers: allPublishers
                            });
                        }
                    });
                }
            });
        }
    });
});

// Function to retrieve all genres from the database. 
// It uses a simple SQL query to select all records from the Genres table. 
// The results of the query are returned via a callback function, which includes error handling.
function getAllGenres(callback) {
    const query = 'SELECT * FROM Genres;';
    db.pool.query(query, (error, results) => {
        callback(error, results);
    });
}

// Function to fetch all publishers from the database.
// Similar to getAllGenres, it queries the Publishers table and retrieves all records.
// The callback function is used to handle the query results and any errors.
function getAllPublishers(callback) {
    const query = 'SELECT * FROM Publishers;';
    db.pool.query(query, (error, results) => {
        callback(error, results);
    });
}

/*
Citation for dynamically displaying data functions:
Date: 03/17/2024
Adapted from (used as starter code and modified):
These functions build upon the foundational concepts of setting up implementation to add to simple data. Our implementation includes more detailed and specific database interactions and data rendering for our web application, such as handling books, genres, publishers, etc.
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data
*/

// POST route for adding a new book
app.post('/add-book', (req, res) => {
    let data = req.body;
    let query = "INSERT INTO Books (title, genreID, publicationYear, price, publisherID) VALUES (?, ?, ?, ?, ?)";
    let queryParams = [data.title, data.genre, data.publicationYear, data.price, data.publisher];

    db.pool.query(query, queryParams, (error, results, fields) => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.redirect('/books');
        }
    });
});

/*
Citation for the delete-book function:
Date: 03/17/2024
Adapted from (used as starter code and modified):
This function deletes a book from the Books table based on a given ID.
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data
*/

// POST route for deleting a book
app.post('/delete-book', (req, res) => {
    const bookID = req.body.bookID;
    const deleteQuery = "DELETE FROM Books WHERE bookID = ?";

    db.pool.query(deleteQuery, [bookID], (error, results) => {
        if (error) {
            res.status(500).send('Error encountered while deleting the book.');
        } else {
            res.redirect('/books');
        }
    });
});

/*
Citation for dynamically displaying data functions:
Date: 03/17/2024
Adapted from (used as starter code and modified):
These functions build upon the foundational concepts of setting up a web server, database connection, and data presentation outlined in the Node.js guide. Our implementation includes more detailed and specific database interactions and data rendering for our web application, such as handling books, genres, publishers, etc.
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data

// Route for authors
app.get('/authors', (req, res) => {
    const query = 'SELECT * FROM Authors;';
    db.pool.query(query, (error, rows) => {
        if (error) {
            res.send('Error encountered while connecting to the database.');
        } else {
            res.render('authors', { authors: rows });
        }
    });
});



/*
Citation for dynamically displaying data functions:
Date: 03/17/2024
Adapted from (used as starter code and modified):
These functions build upon the foundational concepts of setting up a web server, database connection, and data presentation outlined in the Node.js guide. Our implementation includes more detailed and specific database interactions and data rendering for our web application, such as handling books, genres, publishers, etc.
Source URL:https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data
*/

// Route for genres
app.get('/genres', (req, res) => {
    const query = 'SELECT * FROM Genres;';
    db.pool.query(query, (error, rows) => {
        if (error) {
            res.send('Error encountered while connecting to the database.');
        } else {
            res.render('genres', { genres: rows });
        }
    });
});

// Route for book authors
app.get('/bookauthors', (req, res) => {
    const bookQuery = 'SELECT * FROM Books;';
    const authorQuery = 'SELECT * FROM Authors;';
    const bookAuthorQuery = 'SELECT * FROM BookAuthors;';

    db.pool.query(bookAuthorQuery, (error, bookauthors) => {
        if (error) {
            res.send('Error encountered while connecting to the database.');
        } else {
            db.pool.query(bookQuery, (error, books) => {
                if (error) {
                    res.send('Error encountered while connecting to the database.');
                } else {
                    db.pool.query(authorQuery, (error, authors) => {
                        if (error) {
                            res.send('Error encountered while connecting to the database.');
                        } else {
                            res.render('bookauthors', { bookauthors: bookauthors, books: books, authors: authors });
                        }
                    });
                }
            });
        }
    });
});

/*
Citation for dynamically displaying data functions:
Date: 03/17/2024
Adapted from (used as starter code and modified):
These functions build upon the foundational concepts of setting up a web server, database connection, and data presentation outlined in the Node.js guide. Our implementation includes more detailed and specific database interactions and data rendering for our web application, such as handling books, genres, publishers, etc.
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data
*/
app.get('/publishers', (req, res) => {
    const query = 'SELECT * FROM Publishers;';
    db.pool.query(query, (error, rows) => {
        if (error) {
            res.send('Error encountered while displaying publishers.');
        } else {
            res.render('publishers', { publishers: rows });
        }
    });
});

/*
Citation for dynamically displaying data functions:
Date: 03/17/2024
Adapted from (used as starter code and modified):
These functions build upon the foundational concepts of setting up a web server, database connection, and data presentation outlined in the Node.js guide. Our implementation includes more detailed and specific database interactions and data rendering for our web application, such as handling books, genres, publishers, etc.
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data
*/

// Route for sales
app.get('/sales', (req, res) => {
    const query = 'SELECT * FROM Sales;';
    db.pool.query(query, (error, rows) => {
        if (error) {
            res.send('Error encountered while displaying sales.');
        } else {
            res.render('sales', { sales: rows });
        }
    });
});


/*
Citation for dynamically displaying data functions:
Date: 03/17/2024
Adapted from (used as starter code and modified):
These functions build upon the foundational concepts of setting up implementation to add to simple data. Our implementation includes more detailed and specific database interactions and data rendering for our web application, such as handling books, genres, publishers, etc.
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data
*/

// Route to add a new book-author relationship
app.post('/add-book-author', (req, res) => {
    const { bookID, authorID } = req.body;
    const query = `INSERT INTO BookAuthors (bookID, authorID) VALUES (?, ?)`;
    const placeholders = [bookID, authorID];

    db.pool.query(query, placeholders, (error, results) => {
        if (error) {
            res.status(500).send('Error encountered while adding book author relationship.');
        } else {
            res.redirect('/bookauthors');
        }
    });
});

/*
Citation for dynamically displaying data functions:
Date: 03/17/2024
Adapted from (used as starter code and modified):
These functions build upon the foundational concepts of setting up implementation to add to simple data. Our implementation includes more detailed and specific database interactions and data rendering for our web application, such as handling books, genres, publishers, etc.
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data
*/

// POST route for adding a new genre
app.post('/add-genre', (req, res) => {
    let data = req.body;
    let query = "INSERT INTO Genres (name) VALUES (?)";
    let queryParams = [data.name];

    db.pool.query(query, queryParams, (error, results, fields) => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.redirect('/genres');
        }
    });
});

/*
Citation for dynamically displaying data functions:
Date: 03/17/2024
Adapted from (used as starter code and modified):
These functions build upon the foundational concepts of setting up implementation to add to simple data. Our implementation includes more detailed and specific database interactions and data rendering for our web application, such as handling books, genres, publishers, etc.
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data
*/

// POST route for adding a new publisher
app.post('/add-publisher', (req, res) => {
    const { name, street, city, state, country } = req.body;
    const query = `INSERT INTO Publishers (name, street, city, state, country) VALUES (?, ?, ?, ?, ?)`;
    const placeholders = [name, street, city, state, country];

    db.pool.query(query, placeholders, (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error encountered while adding publisher.');
        } else {
            res.redirect('/publishers');
        }
    });
});

/*
Citation for dynamically displaying data functions:
Date: 03/17/2024
Adapted from (used as starter code and modified):
These functions build upon the foundational concepts of setting up implementation to add to simple data. Our implementation includes more detailed and specific database interactions and data rendering for our web application, such as handling books, genres, publishers, etc.
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data
*/

// POST route for adding a new sale
app.post('/add-sale', (req, res) => {
    let data = req.body;
    let query = "INSERT INTO Sales (bookID, quantity, saleDate) VALUES (?, ?, ?)";
    let queryParams = [data.bookID, data.quantity, data.saleDate];

    db.pool.query(query, queryParams, (error, results, fields) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error encountered while adding sale.');
        } else {
            res.redirect('/sales');
        }
    });
});

/*
Citation for the delete-genre function:
Date: 03/17/2024
Adapted from (used as starter code and modified):
This function handles the deletion of a genre from the Genres table.
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data
*/


// POST route for deleting a genre
app.post('/delete-genre', (req, res) => {
    let genreID = req.body.genreID;
    let query = "DELETE FROM Genres WHERE genreID = ?";

    db.pool.query(query, genreID, (error, results, fields) => {
        if (error) {
            res.status(500).send('Error encountered while deleting genre.');
        } else {
            res.redirect('/genres');
        }
    });
});


/*
Citation for the delete-publisher function:
Date: 03/17/2024
Adapted from (used as starter code and modified):
This function facilitates the removal of a publisher from the Publishers table.
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data
*/

// POST route for deleting a publisher
app.post('/delete-publisher', (req, res) => {
    let publisherID = req.body.publisherID;
    let query = "DELETE FROM Publishers WHERE publisherID = ?";
    
    db.pool.query(query, [publisherID], (error, results) => {
        if (error) {
            // Handle the error, e.g., log to console and send a response to the client
            console.error(error);
            res.status(500).send('Error encountered while deleting the publisher.');
        } else {
            // Redirect back to the publishers page
            res.redirect('/publishers');
        }
    });
});

// PUT route for editing a genre
app.put('/edit-genre', (req, res) => {
    const { genreID, newName } = req.body;
    const query = `UPDATE Genres SET name = ? WHERE genreID = ?`;
    const placeholders = [newName, genreID];

    db.pool.query(query, placeholders, (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error encountered while editing genre.');
        } else {
            res.send('Genre updated successfully');
        }
    });
});

// PUT route for editing a book
app.put('/edit-book', (req, res) => {
    const { bookID, title, genreID, publicationYear, price, publisherID } = req.body;
    const query = `UPDATE Books SET title = ?, genreID = ?, publicationYear = ?, price = ?, publisherID = ? WHERE bookID = ?`;
    const queryParams = [title, genreID, publicationYear, price, publisherID, bookID];

    db.pool.query(query, queryParams, (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error encountered while editing book.');
        } else {
            res.send('Book updated successfully');
        }
    });
});

/*
Citation for the delete-author function:
Date: 03/17/2024
Adapted from (used as starter code and modified):
This function is used to delete an author from the Authors table.
Source URL:https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data
*/


// POST route for deleting a book
app.post('/delete-author', (req, res) => {
    let authorID = req.body.authorID;
    let query = "DELETE FROM Authors WHERE authorID = ?";
    db.pool.query(query, [authorID], (error, results, fields) => {
        if (error) {
            res.status(500).send('Error encountered while deleting author.');
        } else {
            res.redirect('/authors');
        }
    });
});


/*
Citation for dynamically displaying data functions:
Date: 03/17/2024
Adapted from (used as starter code and modified):
These functions build upon the foundational concepts of setting up implementation to add to simple data. Our implementation includes more detailed and specific database interactions and data rendering for our web application, such as handling books, genres, publishers, etc.
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data
*/

// POST route for adding a new author
app.post('/add-author', (req, res) => {
    let data = req.body;
    let query = "INSERT INTO Authors (name, biography) VALUES (?, ?)";
    let queryParams = [data.name, data.biography];

    db.pool.query(query, queryParams, (error, results, fields) => {
        if (error) {
            // Handle error
            console.log(error);
            res.status(500).send('Error encountered while adding author.');
        } else {
            // Redirect back to the authors page
            res.redirect('/authors');
        }
    });
});

// PUT route for editing an author
app.put('/edit-author', (req, res) => {
    const { authorID, name, biography } = req.body;
    const query = `UPDATE Authors SET name = ?, biography = ? WHERE authorID = ?`;
    db.pool.query(query, [name, biography, authorID], (error, results) => {
        if (error) {
            res.status(500).send('Error encountered while editing author.');
        } else {
            res.send('Author updated successfully');
        }
    });
});


// POST route for editing a book author relationship
app.post('/edit-book-author', (req, res) => {
    const { bookAuthorID, newBookID, newAuthorID } = req.body;
    const updateQuery = "UPDATE BookAuthors SET bookID = ?, authorID = ? WHERE bookAuthorID = ?";

    db.pool.query(updateQuery, [newBookID, newAuthorID, bookAuthorID], (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error encountered while editing book author relationship.');
        } else {
            res.redirect('/bookauthors');
        }
    });
});

/*
Citation for the delete-book-author function:
Date: 03/17/2024
Adapted from (used as starter code and modified):
This function manages the deletion of a book-author relationship from the BookAuthors table.
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data
*/


// POST route for deleting a book author relationship
app.post('/delete-book-author', (req, res) => {
    const bookAuthorID = req.body.bookAuthorID;
    const deleteQuery = "DELETE FROM BookAuthors WHERE bookAuthorID = ?";

    db.pool.query(deleteQuery, [bookAuthorID], (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error encountered while deleting book author relationship.');
        } else {
            res.redirect('/bookauthors');
        }
    });
});

// PUT route for editing a publisher
app.put('/edit-publisher', (req, res) => {
    const { publisherID, name, street, city, state, country } = req.body;
    const query = `UPDATE Publishers SET name = ?, street = ?, city = ?, state = ?, country = ? WHERE publisherID = ?`;
    const queryParams = [name, street, city, state, country, publisherID];

    db.pool.query(query, queryParams, (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error encountered while editing publisher.');
        } else {
            res.send('Publisher updated successfully');
        }
    });
});

// PUT route for editing a sale
app.put('/edit-sale', (req, res) => {
    const { saleID, bookID, quantity, saleDate } = req.body;
    const query = `UPDATE Sales SET bookID = ?, quantity = ?, saleDate = ? WHERE saleID = ?`;
    const queryParams = [bookID, quantity, saleDate, saleID];

    db.pool.query(query, queryParams, (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error encountered while editing sale.');
        } else {
            res.send('Sale updated successfully');
        }
    });
});

// Route to get all book IDs
app.get('/book-ids', (req, res) => {
    const query = 'SELECT bookID FROM Books;';
    db.pool.query(query, (error, results) => {
        if (error) {
            res.status(500).send('Error encountered while fetching book IDs.');
        } else {
            res.json(results);
        }
    });
});

/*
Citation for the delete-sale function:
Date: 03/17/2024
Adapted from (used as starter code and modified):
This function is responsible for deleting a sale record from the Sales table.
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data
*/

// POST route for deleting a sale
app.post('/delete-sale', (req, res) => {
    const { saleID } = req.body;
    const query = "DELETE FROM Sales WHERE saleID = ?";

    db.pool.query(query, [saleID], (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error encountered while deleting sale.');
        } else {
            res.redirect('/sales');
        }
    });
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});