# Backend Readme

This readme provides an overview of the backend for the Mediterra Delights project. It includes information about the APIs, architecture, and relevant files within the server folder.

## API

The backend exposes the following APIs:

1. `/api/articles`

2. `/api/auth`

3. `/api/comments`

4. `/api/orders`

5. `/api/products`

6. `/api/reviews`

7. `/api/users`

8. `/api/workers`

## Setting Up the Server

To set up the server for the Mediterra Delights project, follow these steps:

1. Clone the repository to your local machine:

   ```
   git clone https://github.com/eugene-ferra/react-mediterra-delights.git
   ```

2. Navigate to the server folder:

   ```
   cd /server
   ```

3. Install the required dependencies:

   ```
   npm install
   ```

4. Create a `.env` file in the root of the server folder and configure the following environment variables using the .env.example as a refference:

   ```
   PORT=3000
   DATABASE_URL=mongodb://localhost:27017/mediterra_delights
   JWT_SECRET=your_secret_key
   ...other secrets
   ```

5. Start the server:

   ```
   npm start
   ```

   The server will start running on port which specified in .env file

6. Test the APIs using a tool like Postman or cURL.

That's it! You have successfully set up the server for the Mediterra Delights project.

## Frontend

This readme provides an overview of the frontend for the Mediterra Delights project. It includes information about the project structure, dependencies, and how to spin it up.

### Project Structure

The frontend code is located in the `client` folder. Here's a brief overview of the folder structure:

- `src`: Contains the main source code files.
  - `components`: Contains reusable React components.
  - `hooks`: Contains reusable custom hooks.
  - `pages`: Contains the different pages of the application.
  - `assets`: Contains images and icons
  - `utils`: Contains utility functions and helper files.
  - `services`: Contains functions to communicate with server

Feel free to ask if you need any further assistance!

### Dependencies

Before spinning up the frontend, make sure you have the following dependencies installed:

- Node.js: Make sure you have Node.js installed on your machine. You can download it from the official website: [https://nodejs.org](https://nodejs.org)

### Spinning Up the Frontend

1. Clone the repository to your local machine:

   ```
   git clone https://github.com/eugene-ferra/react-mediterra-delights.git
   ```

2. Navigate to the client folder:

   ```
   cd /client
   ```

3. Install the required dependencies:

   ```
   npm install
   ```

4. Create a `.env` file in the root of the client folder and configure the following environment variables using the .env.example as a refference:

   ```
   VITE_STRIPE_SECRET=pk_test_example
   VITE_TINYMCE_API_KEY=example
   ```

5. Start the client:

   ```
   npm run dev
   ```

   The client will start running on port 5173 by default

6. Open your web browser and visit `http://localhost:5173` to see the application in action.

That's it! You have successfully spun up the frontend for the Mediterra Delights project.
