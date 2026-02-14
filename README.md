# Authentication System API

## Project Overview

Authentication System API built using Node.js, Express, and MongoDB.
Provides secure user registration and login using JWT authentication with role-based authorization.

## Features

User Registration
User Login
JWT Authentication
Role-Based Access Control (User / Admin)
Input Validation
Password Hashing 
Centralized Error Handling
Protected Routes

## Project Structure

src
 *  models/
 *  controllers/
 *  routes/
 *  middleware/
 *  utils/
 *  main.js

 ## API Endpoints
| Method     | Endpoint      | Access        | Description                |
| :-----     | :------------ | :------------ | :------------------------- |
| **POST**   | `/users/register`   | AnyOne        | User registration          |
| **POST**   | `/users/login`      | AnyOne        | User login                 |
| **GET**    | `/users`      | User / Admin  | Get all users              |
| **GET**    | `/users/:id`  | User / Admin  | Get single user details    |
| **PUT**    | `/users/:id`  | User / Admin  | Update user information    |
| **DELETE** | `/users/:id`  | Admin         | Delete a user              |
| **GET**    | `/adminPage`  | Admin         | Access to Admin Dashboard  |

## ⚙️ Environment Variables
create .env File
PORT=your_port
MONGO_URI=your_mongodb_connection
PRIVATE_KEY=your_jwt_secret

## Installation & Run

npm install
npm run dev

### Created BY **mahmoud osman**