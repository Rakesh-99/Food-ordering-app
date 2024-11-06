import { Response } from "express";
import mongoose from "mongoose";
import jwt from 'jsonwebtoken';




// Create jwt token and set the cookie : 
const createJwtToken = async (res: Response, userId: mongoose.Types.ObjectId) => {

    const token = jwt.sign({ _id: userId }, process.env.JWT_TOKEN!, { expiresIn: "1d" });

    return res.cookie('token', token, {
        secure: false,
        httpOnly: true,
        sameSite: "strict",
        maxAge: Date.now() + 24 * 60 * 60 * 1000 // 1 Day 
    })
};

export default createJwtToken;


