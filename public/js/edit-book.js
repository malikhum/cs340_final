/*
Citation for editBook function:
Date: 03/17/2024
Adapted from (used as starter code and modified):
This function is tailored for editing book records through AJAX requests, expanding upon the initial concepts of AJAX in data handling.
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data
*/


// edit-book.js
function editBook() {
    let bookID = document.getElementById('edit-bookID').value;
    let title = document.getElementById('edit-title').value;
    let genreID = document.getElementById('edit-genre').value;
    let publicationYear = document.getElementById('edit-publicationYear').value;
    let price = document.getElementById('edit-price').value;
    let publisherID = document.getElementById('edit-publisher').value;

    // Setup AJAX request
    let xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/edit-book", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Handle response
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            alert("Book updated successfully!");
            location.reload(); // Reload the page to see changes
        }
    };

    // Send request
    let data = {
        bookID: bookID,
        title: title,
        genreID: genreID,
        publicationYear: publicationYear,
        price: price,
        publisherID: publisherID
    };
    xhttp.send(JSON.stringify(data));
}
