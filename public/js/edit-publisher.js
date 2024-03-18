/*
Citation for editPublisher function:
Date: 03/17/2024
Adapted from (used as starter code and modified):
Focused on editing publisher information, this function demonstrates an application-specific use of AJAX, derived from the foundational AJAX methods in the guide.
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data
*/



// edit-publisher.js
function editPublisher() {
    let publisherID = document.getElementById('edit-publisherID').value;
    let name = document.getElementById('edit-name').value;
    let street = document.getElementById('edit-street').value;
    let city = document.getElementById('edit-city').value;
    let state = document.getElementById('edit-state').value;
    let country = document.getElementById('edit-country').value;

    // Setup AJAX request
    let xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/edit-publisher", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Handle response
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            alert("Publisher updated successfully!");
            location.reload(); // Reload the page to see changes
        }
    };

    // Send request
    let data = {
        publisherID: publisherID,
        name: name,
        street: street,
        city: city,
        state: state,
        country: country
    };
    xhttp.send(JSON.stringify(data));
}
