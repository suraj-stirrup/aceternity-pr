import mongoose from "mongoose";

let isConnected = false; // Prevent multiple connections in dev

const connectDB = async (): Promise<void> => {
  if (isConnected) return;

  try {
    const uri = process.env.MONGODB_URI as string;
    if (!uri) throw new Error("MONGODB_URI is not defined in environment variables");

    await mongoose.connect(uri, {
      dbName: "your-db-name", // Optional: specify your DB name
    });

    isConnected = true;
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
};

export default connectDB;
