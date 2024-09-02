import express from "express";

import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import socialRouter from "./routes/socials.js";

dotenv.config();
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use("/socials", socialRouter);

mongoose
  .connect(process.env.SOCIALS_MONGO_DB_URL || "")
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
