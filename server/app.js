import { config } from "dotenv";
config({ path: "./config.env" });

import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { connection } from './database/dbconnection.js';
import { errorMiddleware } from './middlewares/error.js';
import userRouter from './routes/userRouter.js';
import { removeUnverifiedAccount } from './automation/removeUnverifiedaccount.js';

export const app = express();

// ✅ CORS
app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ API Routes
app.use("/api/v1", userRouter);

// ✅ Cron Task (only run AFTER DB connects)
removeUnverifiedAccount();

// ✅ Connect to MongoDB
connection();

// ✅ Global error handler
app.use(errorMiddleware);
