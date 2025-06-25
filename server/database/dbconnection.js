import mongoose from 'mongoose';
import dotenv from 'dotenv';

// ✅ Load environment variables from config.env
dotenv.config({ path: "./server/config.env" });

mongoose.set('strictQuery', true);

export const connection = async () => {
  const dbUri = process.env.MONGO_URI;

  if (!dbUri) {
    console.error("❌ MONGO_URI is undefined. Check your config.env path and ensure dotenv is loading.");
    process.exit(1); // Stop the app if URI is missing
  }

  try {
    const conn = await mongoose.connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1); // Stop the app on DB connection failure
  }
};
