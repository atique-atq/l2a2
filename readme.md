# Mongoose Express CRUD Mastery

### Objective: Develop a Node.js Express application with TypeScript as the programming language, integrating MongoDB with Mongoose for user data and order management. Ensure data integrity through validation using Zod. This application is developed using Node.js, Express, MongoDB, and TypeScript.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed
- MongoDB Atlas account (or your local MongoDB server)
- MongoDB connection string
- Your environment variables in a `.env` file (similar to the provided `.env` example)

## Getting Started

1.  Clone the repository:

    ```bash
        git clone https://github.com/riasat97/L2-B2-assignment-2
    ```

2.  Navigate to the project directory:
    ```bash
        cd L2-B2-assignment-2
    ```
3.  Install dependencies:
    ```bash
        npm install
    ```
4.  Create a .env file in the root directory and add your environment variables:

    ```bash
        NODE_ENV=development
        PORT=5000
        DATABASE_URL=mongodb+srv://your-username:your-password@cluster0.mongodb.net/your-database?retryWrites=true&w=majority
        BCRYPT_SALT_ROUNDS=12
    ```

    Replace your-username, your-password, and your-database with your MongoDB Atlas credentials.

5.  Start the application:

    ```bash
        npm run start:dev
    ```

    The application will be available at http://localhost:5000.
