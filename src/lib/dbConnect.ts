import mongoose from "mongoose";

export async function dbConnect() {
  try {
    console.log("🚀 Attempting to connect to MongoDB...");

    const mongoURI = process.env.MONGODB_URI;
    if (!mongoURI) {
      throw new Error("❌ MONGODB_URI not found in environment variables.");
    }

    await mongoose.connect(mongoURI, {
      dbName: "nextThoughtsDB", // optional: if you want to specify DB name
    });

    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("✅ Connected to MongoDB 🎉");
    });

    connection.on("error", (err) => {
      console.error("❌ MongoDB connection error:", err);
      process.exit(1);
    });
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error);
    process.exit(1);
  }
}
