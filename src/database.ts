import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const LOCAL_FALLBACK_URI = "mongodb://127.0.0.1:27017/task_express";

const connectDB = async (): Promise<void> => {
    const rawUri = process.env.MONGODB_URI?.trim();
    const hasPlaceholder = rawUri ? /<[^>]+>/.test(rawUri) : true;
    const connectionUri =
        !rawUri || hasPlaceholder ? LOCAL_FALLBACK_URI : rawUri;

    try {
        const conn = await mongoose.connect(connectionUri);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1);
    }
};

export default connectDB;
