import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import userRouter from './routes/user.js';
import { dbConnection } from './utils/dbConnection.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));
app.use(cookieParser());

// Routes
app.use('/api', userRouter);

dbConnection();

app.listen(process.env.PORT || 8000, () => {
  console.log(`✅ Connected to port ${process.env.PORT || 8000}`);
});