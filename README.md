# devTinder

devTinder is a Node.js/Express application that connects developers, inspired by the Tinder model. Users can sign up, create profiles, send and review connection requests, and browse other developers' profiles.

## Features

- User authentication (signup, login, logout)
- Profile management (view, edit, password reset)
- Send and review connection requests (interested, ignored, accepted, rejected)
- View received requests and connections
- Feed of other users (excluding those already connected/requested)
- Secure password hashing and JWT-based authentication
- MongoDB database with Mongoose models

## API Endpoints

See [apiList.md](apiList.md) for a full list of available endpoints.

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- MongoDB Atlas account (or local MongoDB)

### Installation

1. Clone the repository:
   ```sh
   git clone <your-repo-url>
   cd devTinder
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Configure your MongoDB connection in [`src/config/database.js`](src/config/database.js).

### Running the Application

Start the server in development mode:
```sh
npm run dev
```
Or in production mode:
```sh
npm start
```

The server will run on [http://localhost:7777](http://localhost:7777).

## Project Structure

- `src/app.js` - Main application entry point
- `src/routes/` - Express route handlers
- `src/model/` - Mongoose models
- `src/middleware/` - Authentication middleware
- `src/utils/` - Validation utilities
- `src/config/` - Database configuration

## License

ISC

---

For more details on API usage, see [apiList.md](apiList.md).