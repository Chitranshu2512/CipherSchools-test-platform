import mongoose from "mongoose";
import dotenv from 'dotenv';
import { processSubmissions } from "./src/Cron/evaluationJob.js"; // Adjust the import path
dotenv.config();

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI);
;

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");

  // Call the processSubmissions function
  processSubmissions().then(() => {
    console.log("Manual submission processing complete");
    mongoose.connection.close(); // Close the connection when done
  });
});
