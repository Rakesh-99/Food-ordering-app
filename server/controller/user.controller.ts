import { NextFunction, Request, Response } from "express";
import userModel from "../models/user.model";
import bcrypt from 'bcrypt';
import { ErrorHandler } from "../utils/ErrorHandler";
import asyncErrorHandler from 'express-async-handler';
import createJwtTokenAndCookies from "../utils/jwtTokenAndCookies";
import { sendVerificationMail } from "../config/sendEmails";

// User Signup : 

export const userSignup = asyncErrorHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { fullname, email, password, contact }: { fullname: string, email: string, password: string, contact: string } = req.body;


    // Check if the user is already exist in db : 

    const isUserExist = await userModel.findOne({ email });
    if (isUserExist) {
        return next(new ErrorHandler(400, "User is already exist!"));
    }

    // Hash the plain password coming from req body: 
    const hashedPassword = await bcrypt.hash(password, 10);

    // create a verification token : 

    const verificationToken = Math.floor(100000 + Math.random() * 200000).toString();

    // create a new user : 

    const newUser = new userModel({
        fullname,
        email,
        contact,
        password: hashedPassword,
        verificationToken,
        verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000  // 24 hours\
    })
    await newUser.save();

    // send the new user data in response without password : 
    // convert the mongoose document in plain object : 
    const { password: _, ...rest } = newUser.toObject();


    // Send verification mail : 
    await sendVerificationMail(newUser.email, verificationToken);

    return res.status(200).json({ success: true, message: 'User has been registered', user: rest });
})

// User login : 

export const userLogin = asyncErrorHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { email, password }: { email: string, password: string } = req.body;

    // Check if the user is exist or not : 

    const isUserExist = await userModel.findOne({ email });

    if (!isUserExist) {
        return next(new ErrorHandler(401, "Invalid username or passowrd!"));
    }

    // compare both password : 

    const isPasswordMatch = await bcrypt.compare(password, isUserExist.password);

    // Check if the passwords are matching or not : 

    if (!isPasswordMatch) {
        return next(new ErrorHandler(401, "Invalid email or password!"));
    }

    // Generate token : 
    createJwtTokenAndCookies(res, isUserExist._id);
    isUserExist.lastLogin = new Date();


    // Send user data without pasword in response : 
    const userWithoutPassword = isUserExist.toObject();
    const { password: _, ...rest } = userWithoutPassword;

    return res.status(200).json({ success: true, message: `Welcome back ${isUserExist.fullname}`, user: rest })
});



// Verify email : 

export const verifyEmail = asyncErrorHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {

    const { otp }: { otp: string } = req.body;

    // Check if the OTP is matching to the specific user : 

    const user = await userModel.findOne({ verificationToken: otp });

    if (!user) {
        return res.status(401).json({ success: false, message: "User is not found!" });
    }

})