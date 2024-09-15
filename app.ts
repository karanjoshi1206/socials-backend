import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import socialRouter from "./routes/socials.js";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/users.js";

// Load environment variables
dotenv.config();

// Create an Express application
const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());

// Define a base route for your API
const BASE_API_ROUTE = "/serverApi";

// Use routers under the base route
app.use(`${BASE_API_ROUTE}/socials`, socialRouter);
app.use(`${BASE_API_ROUTE}/auth`, authRouter);
app.use(`${BASE_API_ROUTE}/users`, userRouter);

// MongoDB connection and server startup
const PORT = process.env.PORT || 10000;

mongoose
  .connect(process.env.SOCIALS_MONGO_DB_URL || "")
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
