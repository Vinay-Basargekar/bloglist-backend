# Blog API

This is a RESTful API for managing blogs. It allows users to create, read, and associate blogs with specific users using JSON Web Tokens for authentication.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)

# Getting started on local

1. Install the required dependencies:
   ```sh
   npm install
   ```
2. Create a `.env` file in the root directory and add the following environment variables:
   ```sh
    MONGODB_URI="mongodb+srv://vinaybasargekar13:%40Dahipeda6543@cluster0.4qlrh.mongodb.net/blogList?retryWrites=true&w=majority&appName=Cluster0"
    
    PORT=3003
    
    SECRET="Vinay"
   ```
3.  Start the server:
    ```sh
    npm run dev
    ```
The server will start on `http://localhost:3001` and Now start the frontend .

