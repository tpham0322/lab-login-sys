# Lab 1: Basic Login System

## Description

A basic Express authentication API for Innovate Inc. that provides user registration and login functionality.

The application allows users to:

- Register with a username, email, and password
- Securely hash passwords using bcrypt
- Store users in MongoDB using Mongoose
- Log in with existing credentials
- Validate passwords against their hashed passwords
- Generate a JWT after successful login
- Return user information without exposing the password

## Technologies Used

- Node.js
- Express
- MongoDB
- Mongoose
- bcrypt
- JSON Web Token (JWT)
- dotenv

## Features

### User Registration

The registration endpoint:

- Accepts a username, email, and password
- Checks if the email is already registered
- Hashes the password before saving
- Creates a new user in MongoDB
- Excludes the password from the response

### User Login

The login endpoint:

- Accepts an email and password
- Finds the matching user
- Compares the provided password with the stored password hash
- Rejects incorrect credentials
- Generates a signed JWT after successful authentication
- Returns the JWT and user information

## Project Structure

```text
basic-login-system/
├── models/
│   └── User.js
├── routes/
│   └── userRoutes.js
├── .env
├── .gitignore
├── package.json
└── server.js
```

## Installation

### 1. Clone the repository

```bash
git clone <your-github-repository-url>
```

### 2. Navigate into the project

```bash
cd basic-login-system
```

### 3. Install dependencies

```bash
npm install
```

## Environment Variables

Create a `.env` file in the root of the project.

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=3000
```

Example:

```env
MONGO_URI=mongodb+srv://username:password@cluster0.mongodb.net/innovateDB?retryWrites=true&w=majority
JWT_SECRET=TruongLab1_JWT_2026_SuperSecret_8xK4pQ9z
PORT=3000
```

Do not commit the `.env` file to GitHub.

## .gitignore

The project includes a `.gitignore` file containing:

```gitignore
node_modules/
.env
```

This prevents sensitive environment variables and installed dependencies from being pushed to GitHub.

## Running the Application

Start the server with:

```bash
node server.js
```

The server runs on:

```text
http://localhost:3000
```

## API Endpoints

### Register User

```text
POST /api/users/register
```

Full URL:

```text
http://localhost:3000/api/users/register
```

### Request Body

```json
{
    "username": "truong",
    "email": "truong@example.com",
    "password": "Password123"
}
```

### Successful Response

Status:

```text
201 Created
```

Example:

```json
{
    "_id": "6ab6733993f492b3c8d68093",
    "username": "truong",
    "email": "truong@example.com",
    "createdAt": "2026-09-25T13:12:25.467Z",
    "updatedAt": "2026-09-25T13:12:25.467Z"
}
```

The password is not included in the response.

### Duplicate Email

If the email already exists, the API returns:

```text
400 Bad Request
```

Example:

```json
{
    "message": "A user with that email already exists."
}
```

## Login User

```text
POST /api/users/login
```

Full URL:

```text
http://localhost:3000/api/users/login
```

### Request Body

```json
{
    "email": "truong@example.com",
    "password": "Password123"
}
```

### Successful Response

Status:

```text
200 OK
```

Example:

```json
{
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
        "_id": "6ab6733993f492b3c8d68093",
        "username": "truong",
        "email": "truong@example.com"
    }
}
```

The JWT contains non-sensitive user information such as the user's `_id` and `username`.

## Incorrect Login

If an incorrect password or non-existent email is provided, the API returns:

```text
400 Bad Request
```

Example:

```json
{
    "message": "Incorrect email or password."
}
```

The same generic message is used for both cases.

## Password Security

Passwords are never stored as plain text.

Before a user is saved, the password is hashed using bcrypt.

```text
Plain Password
      ↓
    bcrypt
      ↓
Hashed Password
      ↓
   MongoDB
```

During login, bcrypt compares the submitted password with the stored hash.

```text
Submitted Password
        ↓
   bcrypt.compare()
        ↓
 Stored Password Hash
        ↓
   Match / No Match
```

## JWT Authentication

After a successful login, the application creates a signed JSON Web Token using `jsonwebtoken`.

The JWT payload contains:

```json
{
    "_id": "user_id",
    "username": "username"
}
```

The JWT secret is stored in the `.env` file using:

```env
JWT_SECRET=your_jwt_secret
```

The token expires after one hour.

## Testing

The API can be tested using Postman, Thunder Client, or another API testing application.

### Registration Test

```text
POST http://localhost:3000/api/users/register
```

Request body:

```json
{
    "username": "truong",
    "email": "truong@example.com",
    "password": "Password123"
}
```

Expected result:

```text
201 Created
```

### Successful Login Test

```text
POST http://localhost:3000/api/users/login
```

Request body:

```json
{
    "email": "truong@example.com",
    "password": "Password123"
}
```

Expected result:

```text
200 OK
```

A JWT token should be returned.

### Incorrect Password Test

```text
POST http://localhost:3000/api/users/login
```

Request body:

```json
{
    "email": "truong@example.com",
    "password": "WrongPassword"
}
```

Expected result:

```text
400 Bad Request
```

Response:

```json
{
    "message": "Incorrect email or password."
}
```

## Acceptance Criteria

- Express server runs without errors
- MongoDB connection works successfully
- Users can register with a username, email, and password
- Passwords are hashed using bcrypt
- Passwords are not returned in API responses
- Duplicate email addresses are rejected
- Users can log in with valid credentials
- Incorrect passwords are rejected
- Non-existent users are rejected
- Successful login generates a signed JWT
- JWT contains the user's `_id` and `username`
- `.env` is excluded from Git
- `node_modules` is excluded from Git

## Author

Truong Pham
