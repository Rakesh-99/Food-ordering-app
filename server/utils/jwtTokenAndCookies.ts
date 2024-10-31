import jwt from 'jsonwebtoken';
import { Response } from 'express';
import mongoose from 'mongoose';


const createJwtTokenAndCookies = (res: Response, userId: mongoose.Types.ObjectId) => {
    const token = jwt.sign({ userId }, process.env.JWT_TOKEN!, { expiresIn: '7d' });

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return token;
};



export default createJwtTokenAndCookies;