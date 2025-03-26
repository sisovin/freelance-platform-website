# Installation Guide

This guide will help you set up the backend for the freelance platform website project.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- Node.js (v14.x or later)
- npm (v6.x or later)
- MongoDB (v4.x or later)
- Redis (v6.x or later)

## Step 1: Clone the repository

Clone the repository to your local machine using the following command:

```bash
git clone https://github.com/sisovin/freelance-platform-website.git
cd freelance-platform-website/backend
```

## Step 2: Install dependencies

Install the required dependencies using npm:

```bash
npm install
```

## Step 3: Set up environment variables

Create a `.env` file in the `backend` directory and add the following environment variables:

```
MONGODB_URI=mongodb://localhost:27017/freelance-platform
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_jwt_secret
```

## Step 4: Set up MongoDB

Ensure MongoDB is running on your machine. You can start MongoDB using the following command:

```bash
mongod
```

## Step 5: Set up Redis

Ensure Redis is running on your machine. You can start Redis using the following command:

```bash
redis-server
```

## Step 6: Run the server

Start the development server using the following command:

```bash
npm start
```

The server should now be running on `http://localhost:5000`.

## Step 7: Run tests

To run the tests, use the following command:

```bash
npm test
```

This will execute the tests using Jest and Supertest.

## Step 8: API Documentation

The API documentation is available in the `docs/api-docs.yaml` file. You can use tools like Swagger UI or Postman to view and interact with the API documentation.

## Step 9: Additional Configuration

You can customize the configuration files in the `src/config` directory to suit your needs. This includes database connections, environment variables, and other settings.

## Conclusion

You have successfully set up the backend for the freelance platform website project. You can now start developing and testing the various features of the platform.
