/*
Citation for editSale function:
Date: 03/17/2024
Adapted from (used as starter code and modified):
This function is designed for editing sale records. It showcases modifications of the starter code for specialized AJAX requests handling sale data.
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data
*/


// Function to edit sale
function editSale() {
    let saleID = document.getElementById('edit-saleID').value;
    let bookID = document.getElementById('edit-bookID').value;
    let quantity = document.getElementById('edit-quantity').value;
    let saleDate = document.getElementById('edit-saleDate').value;

    // Setup AJAX request
    let xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/edit-sale", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Handle response
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            alert("Sale updated successfully!");
            location.reload(); // Reload the page to see changes
        }
    };

    // Send request
    let data = {
        saleID: saleID,
        bookID: bookID,
        quantity: quantity,
        saleDate: saleDate
    };
    xhttp.send(JSON.stringify(data));
}

// Call populateBookIDs when the page loads
window.onload = populateBookIDs;



// Function to populate the bookID dropdowns for both 'add' and 'edit' sale forms
// Made by the team on their own
function populateBookIDs() {
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/book-ids", true);

    // Define the function to execute when the server response is received
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(this.responseText);
            let addBookIDSelect = document.getElementById('bookID');
            let editBookIDSelect = document.getElementById('edit-bookID');

            // Clear any existing options in both dropdowns
            addBookIDSelect.innerHTML = '';
            editBookIDSelect.innerHTML = '';

            // Create and append a default 'Select Book' option to both dropdowns
            let defaultOptionAdd = document.createElement('option');
            defaultOptionAdd.textContent = 'Select Book';
            defaultOptionAdd.value = '';
            addBookIDSelect.appendChild(defaultOptionAdd);

            let defaultOptionEdit = document.createElement('option');
            defaultOptionEdit.textContent = 'Select Book';
            defaultOptionEdit.value = '';
            editBookIDSelect.appendChild(defaultOptionEdit);

            // Populate dropdowns with book IDs from the response
            response.forEach(book => {
                let optionAdd = document.createElement('option');
                let optionEdit = document.createElement('option');
                optionAdd.textContent = `ID: ${book.bookID}`;
                optionAdd.value = book.bookID;
                optionEdit.textContent = `ID: ${book.bookID}`;
                optionEdit.value = book.bookID;
                addBookIDSelect.appendChild(optionAdd);
                editBookIDSelect.appendChild(optionEdit);
            });
        }
    };

    // Send the AJAX request to the server
    xhttp.send();
}
