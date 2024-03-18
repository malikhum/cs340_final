/*
Citation for editAuthor function:
Date: 03/17/2024
Adapted from (used as starter code and modified):
This function handles editing author details via AJAX, an advancement from the basic AJAX setup outlined in the guide.
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data
*/


// edit-author.js
function editAuthor() {
    let authorID = document.getElementById('edit-authorID').value;
    let name = document.getElementById('edit-name').value;
    let biography = document.getElementById('edit-biography').value;

    // Setup AJAX request
    let xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/edit-author", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Handle response
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            alert("Author updated successfully!");
            location.reload(); // Reload the page to see changes
        }
    };

    // Send request
    let data = {
        authorID: authorID,
        name: name,
        biography: biography
    };
    xhttp.send(JSON.stringify(data));
}
