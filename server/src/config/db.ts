import mongoose from "mongoose";

let isConnecting = false;

export const tryConnectMongoDB = async (): Promise<boolean> => {
  if (mongoose.connection.readyState === 1) {
    return true;
  }

  if (isConnecting) {
    return false;
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.warn("MONGODB_URI is not defined in environment variables.");
    return false;
  }

  isConnecting = true;
  try {
    console.log("⚡ Attempting connection to MongoDB Atlas...");
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
    });
    console.log(`✅ Connected to MongoDB Atlas: ${conn.connection.host}`);
    isConnecting = false;
    return true;
  } catch (error) {
    console.error("⚠️ MongoDB Atlas connection error:", (error as Error).message);
    isConnecting = false;

    // Local MongoDB fallback is for development only.
    if (process.env.NODE_ENV === "production") {
      return false;
    }
    try {
      const localConn = await mongoose.connect("mongodb://127.0.0.1:27017/magnertia", {
        serverSelectionTimeoutMS: 2000,
      });
      console.log(`✅ Connected to Local MongoDB: ${localConn.connection.host}`);
      return true;
    } catch {
      return false;
    }
  }
};

const connectDB = async (): Promise<void> => {
  await tryConnectMongoDB();

  // Background auto-retry loop if not connected yet
  setInterval(async () => {
    if (mongoose.connection.readyState !== 1) {
      await tryConnectMongoDB();
    }
  }, 10000);
};

export default connectDB;
