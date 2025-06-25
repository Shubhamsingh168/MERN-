import mongoose from 'mongoose';
import dotenv from 'dotenv';

// ✅ Load environment variables from config.env
dotenv.config({ path: "./server/config.env" });

mongoose.set('strictQuery', true);

export const connection = () => {
    const dbUri = process.env.MONGO_URI;

    if (!dbUri) {
        console.error("❌ MONGO_URI is undefined. Check your config.env path and ensure dotenv is loading.");
        return;
    }

    mongoose.connect(dbUri, {
        dbName: "MERN_AUTHENTICATION",
    }).then(() => {
        console.log("✅ Database connected successfully");
    }).catch((error) => {
        console.error("❌ Database connection failed:", error);
    });
};
