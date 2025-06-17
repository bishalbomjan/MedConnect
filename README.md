# MedConnect

---

**MedConnect** is a healthcare management platform built using the MERN stack, designed to streamline medical processes and enhance user experience. This project aims to provide a robust and scalable solution for various healthcare needs, starting with secure user authentication.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Setup and Installation](#setup-and-installation)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

## Features

Currently, the following core features have been implemented:

- **User Registration**: Secure user signup with password hashing using `bcrypt`. Prevents duplicate email registrations.
- **User Login**: Secure user login with password comparison and JSON Web Token (`jsonwebtoken`) generation for session management.
- **User Data Retrieval**: An endpoint to fetch all registered user data (for administrative purposes).

## Technologies Used

### Frontend

- **Next.js**: A React framework for building server-side rendered and static web applications.
- **Formik**: A popular library for building forms in React, simplifying form state management and validation.
- **Yup**: A schema builder for value parsing and validation, commonly used with Formik.
- **Shadcn/ui**: A collection of reusable components built with Radix UI and Tailwind CSS.
- **Lucide-React**: A library for beautiful, simple, and customizable icons.

### Backend

- **Express.js**: A fast, unopinionated, minimalist web framework for Node.js.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js, simplifying database interactions.
- **bcrypt**: A library to help you hash passwords.
- **jsonwebtoken**: A robust solution for creating and verifying JSON Web Tokens, used for authentication.
- **cors**: A Node.js package for providing a Connect/Express middleware that can be used to enable Cross-Origin Resource Sharing (CORS).

## Setup and Installation

Follow these steps to get the MedConnect project up and running on your local machine.

### Prerequisites

- Node.js (LTS version recommended)
- npm or Yarn
- MongoDB (local installation or cloud-based service like MongoDB Atlas)

### Backend Setup

1.  **Clone the repository (if not already cloned):**
    ```bash
    git clone <your-repository-url>
    cd medconnect-backend # Or whatever your backend folder is named
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # OR
    yarn install
    ```
3.  **Create a `.env` file in the root of the backend directory** and add your MongoDB connection string and a JWT secret:
    ```
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=a_strong_random_secret_key_for_jwt
    ```
    _Replace `your_mongodb_connection_string` with your actual MongoDB URI (e.g., `mongodb://localhost:27017/medconnect` or your MongoDB Atlas connection string)._
    _Replace `a_strong_random_secret_key_for_jwt` with a complex, random string._
4.  **Run the backend server:**
    ```bash
    npm start
    # OR
    node index.js
    ```
    The backend server will run on `http://localhost:8080`.

### Frontend Setup

1.  **Navigate to the frontend directory:**
    ```bash
    cd ../medconnect-frontend # Or whatever your frontend folder is named
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # OR
    yarn install
    ```
3.  **Create a `.env.local` file in the root of the frontend directory** and add the backend API URL:
    ```
    NEXT_PUBLIC_API_URL=http://localhost:8080
    ```
4.  **Run the frontend development server:**
    ```bash
    npm run dev
    # OR
    yarn dev
    ```
    The frontend application will typically open at `http://localhost:3000`.

## API Endpoints

The backend exposes the following API endpoints:

- `POST /register`: Registers a new user.
  - **Request Body**: `{ "email": "user@example.com", "password": "securepassword", "role": "patient", "phone": "1234567890", "location": "City" }`
  - **Response**: `User Registered` or `Email already taken`
- `POST /login`: Authenticates a user.
  - **Request Body**: `{ "email": "user@example.com", "password": "securepassword" }`
  - **Response**: `{ "message": "Logged in successfully", "user": {}, "isLoggedIn": true, "token": "jwt_token" }` or `{ "message": "Email not found" }` / `{ "message": "Invalid password" }`
- `GET /user`: Retrieves all user data.
  - **Response**: An array of user objects.

## Usage

Once both the frontend and backend servers are running:

1.  Open your web browser and navigate to `http://localhost:3000`.
2.  You can use the signup form to create a new user account.
3.  After successful registration, use the login form with your credentials to authenticate and receive a JWT.

## Future Enhancements

- **Dashboard**: Implement user-specific dashboards.
- **Role-Based Access Control (RBAC)**: Further develop role-based permissions (e.g., patient, doctor, admin).
- **Appointment Management**: Features for booking, rescheduling, and viewing appointments.
- **Medical Records**: Functionality to manage and view patient medical histories.
- **UI/UX Improvements**: Enhance the user interface and overall user experience.
- **Error Handling**: More robust error handling and user feedback.

## Contributing

Contributions are welcome! Please feel free to fork the repository, make your changes, and submit a pull request.

## License

This project is licensed under the MIT License.
