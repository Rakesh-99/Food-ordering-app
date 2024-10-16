# MERN TypeScript Food Ordering App

A full-stack food ordering application built with the MERN (MongoDB, Express.js, React.js, Node.js) stack and TypeScript. This app allows users to browse and order food items, with secure payment processing and an admin panel for managing products, orders, and users.

## Features

### User Features:

- **Advanced Authentication**: Secure user authentication using JWT (JSON Web Tokens) for login, signup, and authorization.
- **Password Management**: Includes password hashing, forget and reset password functionality.
- **Sorting, Searching, and Pagination**: Users can easily browse food items with sorting options, search capabilities, and pagination for better performance.
- **Dark/Light Mode**: The app supports both dark and light themes, offering a customizable UI experience.
- **Stripe Payment Integration**: Secure payments through Stripe payment gateway.

### Admin Features:

- **Admin Panel**: Admins can manage users, products, and orders, including adding, editing, or removing food items and processing orders.

### Optimizations:

- **Code Splitting**: Optimized loading times by splitting code to ensure faster performance.
- **Responsive Design**: Fully responsive design for mobile, tablet, and desktop screens.

## Tech Stack

### Frontend:

- **React.js** (with TypeScript) for building interactive UIs.
- **Redux Toolkit** for state management.
- **Tailwind CSS** for styling and theming, supporting dark/light modes.
- **React Router** for seamless navigation.

### Backend:

- **Node.js** with **Express.js** for the server-side API.
- **MongoDB** for the NoSQL database.
- **JWT** for user authentication and authorization.
- **Bcrypt** for hashing passwords securely.
- **Stripe API** for payment processing.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/mern-typescript-food-ordering-app.git
   cd mern-typescript-food-ordering-app

   ```

2. Install dependencies for both frontend and backend:

# Install frontend dependencies

cd client
npm install

# Install backend dependencies

cd ../server
npm install

3. Set up environment variables in the server directory by creating a .env file:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key

4. Run the development servers:

# Start backend server

cd server
npm run dev

# Start frontend server

cd ../client
npm start
