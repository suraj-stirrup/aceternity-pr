// lib/db.ts
import mongoose from "mongoose";

let isConnected = false; // To avoid multiple connections in dev

const connectDB = async (): Promise<void> => {
  if (isConnected) {
    console.log("📡 Using existing MongoDB connection");
    return;
  }

  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("❌ MONGODB_URI is not defined in .env");
  }

  try {
    await mongoose.connect(uri); // No dbName here
    isConnected = true;
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    throw error;
  }
};

export default connectDB;
