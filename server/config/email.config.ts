import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();



// Create transport : 

export const transport = nodemailer.createTransport({
    host: process.env.HOST!,
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

