import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        const rawUri = process.env.MONGODB_URI?.trim();
        const hasPlaceholder = rawUri ? /<[^>]+>/.test(rawUri) : true;
        const uri = !rawUri || hasPlaceholder
            ? "mongodb://127.0.0.1:27017/task_express"
            : rawUri;

        if (!rawUri || hasPlaceholder) {
            console.warn(
                "MONGODB_URI is missing/placeholder; using local MongoDB fallback."
            );
        }

        const conn = await mongoose.connect(uri);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1);
    }
};

export default connectDB;