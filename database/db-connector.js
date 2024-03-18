// ./database/db-connector.js

/*
Citation for the following function:
Date: 03/17/2024
Used completley for connecting to db 
(Added my own credentials)
Source URL: https://github.com/malikhum/340_example/blob/main/nodejs-starter-app-main/Step%201%20-%20Connecting%20to%20a%20MySQL%20Database/database/db-connector.js
*/

// Get an instance of mysql we can use in the app
var mysql = require('mysql')

// Create a 'connection pool' using the provided credentials
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'cs340_malikhum',
    password        : '2527',
    database        : 'cs340_malikhum'
})

// Export it for use in our application
module.exports.pool = pool;