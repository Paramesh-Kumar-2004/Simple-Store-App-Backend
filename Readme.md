# Store — Backend (This Is Just A Prototype)

## Introduction

This is a backend service for the Store project. It provides APIs for the frontend application to interact with the database and perform CRUD operations.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose

## Features

- User authentication and authorization
- CRUD operations for products
- File upload and retrieval

## Installation

1. Clone the repository
2. Install dependencies using `npm install`
3. Start the server using `npm start`

## API Endpoints

### User Endpoints

- `/api/v1/users/register`: Register a new user
- `/api/v1/users/login`: Login an existing user
- `/api/v1/users/logout`: Logout an existing user
- `/api/v1/users/getAllUsers`: Get all users
- `/api/v1/users/getSingleUser/:id`: Get a single user by ID
- `/api/v1/users/updateUser/:id`: Update a single user by ID
- `/api/v1/users/deleteUser/:id`: Delete a single user by ID

### Product Endpoints

- `/api/v1/products/createProduct`: Create a new product
- `/api/v1/products/getAllProducts`: Get all products
- `/api/v1/products/getSingleProduct/:id`: Get a single product by ID
- `/api/v1/products/updateProduct/:id`: Update a single product by ID
- `/api/v1/products/deleteProduct/:id`: Delete a single product by ID
