import express, { urlencoded } from 'express';
const app = express();
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT || 7000;
import connectDB from './config/connectDB';
connectDB();
import userRouters from './routes/user.routes';
import { erroMiddleware } from './middleware/ErrorMiddleware';
import restaturantRouters from './routes/restaurant.routes';
import menuRouters from './routes/menu.routes';



app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/user', userRouters);
app.use('/api/restaurant', restaturantRouters);
app.use('/api/menu', menuRouters);
app.use(erroMiddleware);






app.listen(PORT, () => {
    console.log(`Server is listening at PORT http://localhost:${PORT}`);
})