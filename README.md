# BooksWiki Project README

## File: app.js

### Scope: Whole File unless otherwise noted by specific comments in the file

**Date:** 3/17/2024

**Originality:** Custom Routes, SQL queries, and various unique code implementations.

### Overview:
The `app.js` file serves as the backbone of the BooksWiki application, where key server settings, routing mechanisms, and database interactions are defined. This file, while inspired by [CS340 Node.js Starter App](https://github.com/osu-cs340-ecampus/nodejs-starter-app), includes several significant customizations:

#### Key Highlights:
- **Enhanced Book Data Retrieval:** 
  - Extended the `/books` route with nested SQL queries to fetch data from Books, Genres, and Publishers.
- **Customized Search Feature:** 
  - Developed a multi-field search functionality at `/books/search`.
- **Expansive CRUD Operations:** 
  - Introduced routes like `/add-book`, `/delete-book`, and `/edit-book` to provide a wider array of database operations specific to BooksWiki.
- **Additional Routes and Functions:** 
  - Customized routes for handling authors, genres, publishers, and sales, reflecting the specific needs of the BooksWiki project.

### Adaptations from Source:
Each function and route was tailored to go beyond the foundational code, showcasing an evolution from the basic template to a comprehensive web application with unique features and improved user interaction.

---

## Handlebars Files in 'views' Directory

### Scope: All .hbs Files

**Date:** 03/18/2024

**Source:** [CS340 Node.js Starter App](https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main)

### Customizations:
Each Handlebars file within the `views` directory has been significantly adapted from the original starter code. The primary changes include:

- **Table-Specific Forms and Menus:** Customization was primarily focused around tables, where unique forms and menus were added for different entities like books, authors, genres, etc.
- **Adapted Layout and Data Presentation:** The layout and the way data is presented within each file has been tailored to fit the BooksWiki application's specific requirements.
- **Enhanced User Interaction:** Added new functionalities to improve user experience, such as search features, data filtering, and dynamic data rendering based on database queries.

### Implementation Details:
These customizations were implemented to align with the BooksWiki project's objectives, focusing on providing a comprehensive and user-friendly interface for managing books, authors, publishers, and related entities. Key implementations include dynamic data retrieval, form handling for CRUD operations, and user-friendly navigation across various sections of the application.

---

## JavaScript Files - Edit Functionality in 'js' Directory

### Scope: edit-[entity].js Files unless otherwise noted in the code comments

**Date:** 03/17/2024

**Source:** [CS340 Node.js Starter App - Step 8](https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data)

### Customizations:
The JavaScript files in the `js` directory are specialized for editing various entities such as publishers, sales, genres, authors, and books. These scripts have been adapted from the foundational AJAX methods provided in the Node.js guide, with significant modifications for the specific needs of the BooksWiki project.

### Details of Customization:
- **AJAX Requests:** Customized AJAX requests to handle specific data of each entity (like publishers, sales, genres, etc.) efficiently.
- **Dynamic Content Updating:** Implemented mechanisms to dynamically update the content on the web application without the need to refresh the page, enhancing user experience.
- **Application-Specific Data Handling:** The scripts are tailored to manage the BooksWiki application's data structures and user interaction flows, ensuring smooth operations for editing information.

### Implementation Summary:
These JavaScript files represent advanced adaptations of the AJAX techniques demonstrated in the guide. Each script is fine-tuned to handle the unique aspects of editing different entities within the BooksWiki application, illustrating the flexibility and scalability of AJAX in web development.

---