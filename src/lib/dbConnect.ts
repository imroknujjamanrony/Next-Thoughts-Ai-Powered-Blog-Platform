import mongoose from "mongoose";

export async function dbConnect() {
    try {
        mongoose.connect(process.env.MONGODB_URI as string)
const connection=mongoose.connection
connection.on('connected',() => {
            console.log("✅ Connected to MongoDB");
        });
        connection.on('error', (err) => {
            console.error("❌ MongoDB connection error:", err);
            throw new Error("Failed to connect to the database");
        });
    } catch (error) {
        console.error("❌ MongoDB connection error:", error);
        throw new Error("Failed to connect to the database");
        
    }
}

