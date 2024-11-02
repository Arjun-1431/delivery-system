# User API Documentation

This API allows you to register, log in, and edit user details with JWT authentication. Below are instructions for each endpoint and how to test them.

## Table of Contents
- [Endpoints](#endpoints)
- [1. Register a User](#1-register-a-user)
- [2. Login and Retrieve JWT Token](#2-login-and-retrieve-jwt-token)
- [3. Edit User Profile (JWT Protected)](#3-edit-user-profile-jwt-protected)

---

## Endpoints

| Method | Endpoint             | Description                          |
|--------|-----------------------|--------------------------------------|
| POST   | `/api/users/register`| Register a new user                  |
| POST   | `/api/users/login`   | Login and retrieve a JWT token       |
| PUT    | `/api/users/edit`    | Edit user details (JWT Protected)    |

---

#1. Register a User

- **Endpoint**: `/api/users/register`
- **Method**: `POST`
- **Description**: Register a new user by providing name, mobile, email, password, and coordinates (latitude and longitude).
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "mobile": "1234567890",
    "email": "johndoe@example.com",
    "password": "password123",
    "coordinates": {
      "latitude": 12.9716,
      "longitude": 77.5946
    }
  }
