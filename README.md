# E-commerce Backend

A RESTful backend for an e-commerce application built with Node.js, Express.js, Prisma, and SQLite.

## Technologies

* Node.js
* Express.js
* Prisma ORM
* SQLite
* JWT
* bcrypt
* Multer
* express-validator

## Features

* User registration and login
* JWT authentication
* Role-based authorization
* Category CRUD
* Product CRUD
* Product image upload
* User image upload, list, and delete
* Add, list, and remove favorites
* Input validation
* Centralized error handling

## Installation

Clone the project and install the dependencies:

```bash
pnpm install
```

Create a `.env` file in the project root:

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-super-secret-key"
```

Generate Prisma Client:

```bash
pnpm prisma generate
```

Create/update the database:

```bash
pnpm prisma db push
```

## Run the project

Start the development server:

```bash
pnpm dev
```

The API will run on:

```text
http://localhost:3000
```

## API Routes

### Auth

* `POST /auth/register`
* `POST /auth/login`

### Categories

* `GET /categories`
* `GET /categories/:id`
* `POST /categories`
* `PATCH /categories/:id`
* `DELETE /categories/:id`

### Products

* `GET /products`
* `GET /products/:id`
* `POST /products`
* `PATCH /products/:id`
* `DELETE /products/:id`

### User Images

* `POST /users/profile`
* `GET /users/profiles`
* `DELETE /users/profiles/:id`

### Favorites

* `GET /favorites`
* `POST /favorites/:id`
* `DELETE /favorites/:id`

## Authentication

Protected endpoints require a JWT token in the Authorization header:

```text
Authorization: Bearer <token>
```

Admin-only endpoints require an authenticated user with the `admin` role.

## File Uploads

Uploaded files are stored in the `uploads` directory and can be accessed through:

```text
http://localhost:3000/files/<filename>
```

## Postman

A Postman collection is included for testing the API endpoints.
