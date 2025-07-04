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

// ✅ Fixed 'origin' key (was 'origins')
app.use(cors({
    origin: process.env.FRONTEND_URL, // e.g., "http://localhost:5173"
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("🚀 MERN Authentication Backend is Running");
});

app.use("/api/v1", userRouter);

removeUnverifiedAccount();
connection();

app.use(errorMiddleware);
