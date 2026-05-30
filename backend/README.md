# RateGuard Backend API

This is the Express RESTful API that powers the RateGuard dashboard. It manages users, projects, rate limiting configurations (rules), and analytics logic.

## 🚀 Technologies

- **Framework**: Express.js (Node.js)
- **Database**: MongoDB & Mongoose
- **Cache**: Redis
- **Security**: JWT Authentication, bcrypt hashing, and helmet.
- **Architecture**: Service-Controller pattern for modularity.

## 📁 Directory Structure

```text
/backend
├── /config        // Database and Redis connection setups
├── /controllers   // Route handlers mapping logic to HTTP responses
├── /middlewares   // Custom Express middlewares (auth, validation)
├── /models        // Mongoose database schemas
├── /routes        // Express router definitions
└── /services      // Core business logic and database interactions
```

## ⚙️ Environment Variables

Create a `.env` file in the root of the backend directory:
```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
REDIS_URL=your_redis_connection_string
```

## 🏃‍♂️ Running the Server

```bash
npm install
npm run dev
```