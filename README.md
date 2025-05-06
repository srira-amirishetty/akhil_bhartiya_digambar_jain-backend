Member Registration & Shayata Application System
Project Overview
This project aims to create a comprehensive backend for managing member registration and the Shayata application process. It includes APIs for handling two main functionalities: adding new members and submitting Shayata assistance forms. The backend is built with Node.js and MongoDB, providing a scalable and secure solution for the system.

Pages Overview
Page 32: Add New Members
This page provides an interface to add new members to the system.

The backend API handles the form data, performs validation, and stores the data in the MongoDB database.

File upload functionality is implemented using Multer, ensuring that profile pictures or other necessary documents can be uploaded securely.

Page 33: Shayata Application Form
This page is dedicated to processing the Shayata application forms submitted by users seeking assistance.

The backend API accepts data from the form, processes it, and stores it securely in the database.

Both text and file data are handled and saved to the appropriate collections in MongoDB.

Features
User Authentication: Secured API routes with authentication (JWT tokens).

File Upload Support: Profile picture upload for member registration via Multer.

Separation of Concerns: APIs are clearly separated for the Add New Members form and the Shayata Application form, ensuring maintainability and scalability.

Validation & Error Handling: Robust validation for form data to ensure data integrity.

MongoDB Integration: Data is stored in MongoDB for efficient querying and data management.

API Endpoints
1. Add New Members
POST /api/members/add

Description: Adds a new member to the system.

Body Parameters:

name (string): Member's name.

email (string): Member's email address.

phone (string): Member's contact number.

profilePicture (file): Member's profile picture (optional).

2. Shayata Application Form
POST /api/shayata/apply

Description: Submits a Shayata application form.

Body Parameters:

applicantName (string): Applicant's name.

address (string): Address of the applicant.

amountRequested (number): The amount the applicant is requesting.

supportingDocuments (file): Upload any relevant documents (optional).

Technologies Used
Node.js: JavaScript runtime for server-side development.

Express.js: Framework for building RESTful APIs.

MongoDB: NoSQL database for storing data.

Multer: Middleware for handling file uploads.

JWT Authentication: For secure access to APIs.
