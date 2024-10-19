import express, { urlencoded } from 'express';
const app = express();
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT || 7000;
import connectDB from './config/connectDB';
connectDB();





app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());








app.listen(PORT, () => {
    console.log(`Server is listening at PORT http://localhost:${PORT}`);

})