import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("FATAL ERROR: MONGO_URI environment variable is missing in Render settings!");
    }
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    throw new Error(`MongoDB Connection Error: ${error.message}`);
  }
};