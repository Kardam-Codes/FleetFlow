// backend/src/config/env.js

import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Export required environment variables safely
export const ENV = {
  PORT: process.env.PORT || 5000,
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  NODE_ENV: process.env.NODE_ENV || "development",
};