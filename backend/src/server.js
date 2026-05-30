import dotenv from "dotenv";
// Load environment variables from the .env file so we can securely access secrets like database URLs
dotenv.config();

import app from "./app.js";
import { connectDB } from "./config/db.js";
import { connectRedis } from "./config/redis.js";

// Set the port the server will run on. If PORT isn't set in the environment, default to 5000.
const PORT = process.env.PORT || 5000;

// The main function that initializes and starts the entire backend server
const startServer = async () => {
  // 1. Connect to MongoDB (used for storing Users, Projects, and API Keys)
  await connectDB();

  // 2. Connect to Redis (used for extremely fast rate-limiting data storage)
  await connectRedis();

  // 3. Once databases are connected, start listening for incoming HTTP requests
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on ${PORT}`);
  });
};

// Execute the function to boot up the server
startServer().catch((err) => {
  console.error("==========================================");
  console.error("🔥 CRITICAL SERVER STARTUP ERROR 🔥");
  console.error(err);
  console.error("==========================================");
  // Give Render's logging system 1 second to flush the error to the dashboard before crashing
  setTimeout(() => process.exit(1), 1000);
});