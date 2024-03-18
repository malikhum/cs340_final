/*
Citation for editGenre function:
Date: 03/17/2024
Adapted from (used as starter code and modified):
This function manages the AJAX request for editing genre information, based on the foundational AJAX techniques demonstrated in the guide.
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data
*/


function editGenre() {
    let genreID = document.getElementById('edit-genreID').value;
    let newName = document.getElementById('edit-name').value;

    // Setup AJAX request
    let xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/edit-genre", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Handle response
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            alert("Genre updated successfully!");
            location.reload(); // Reload the page to see changes
        }
    };

    // Send request
    let data = { genreID: genreID, newName: newName };
    xhttp.send(JSON.stringify(data));
}
