import { NextFunction, Request, Response } from "express";
import userModel from "../models/user.model";
import bcrypt from 'bcrypt';
import { ErrorHandler } from "../utils/ErrorHandler";
import asyncErrorHandler from 'express-async-handler';
import createJwtTokenAndCookies from "../utils/jwtTokenAndCookies";
import { sendVerificationMail } from "../config/sendEmails";
import crypto from 'crypto';
import dotenv from 'dotenv';
dotenv.config();
import { sendResetPasswordToken } from "../config/sendEmails";






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
        verificationTokenExpiresAt: Date.now() + 1 * 60 * 1000  // 1 minute
    })
    await newUser.save();

    // send the new user data in response without password : 
    // convert the mongoose document in plain object : 
    const { password: _, ...rest } = newUser.toObject();


    // Send verification mail : 
    await sendVerificationMail(newUser.email, verificationToken);

    return res.status(200).json({ success: true, message: 'User has been registered', user: rest });
})

//User login : 
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


//Verify email : 
export const verifyEmail = asyncErrorHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {

    const { otp }: { otp: string } = req.body;

    // Find otp if it is available or not 
    const user = await userModel.findOne({ verificationToken: otp });

    if (!user) {
        return next(new ErrorHandler(401, "Icorrect OTP entered!"));
    } else if (user.verificationTokenExpiresAt && user.verificationTokenExpiresAt.getTime() < Date.now()) {
        return next(new ErrorHandler(401, "OTP verification code has been expired!"));
    }
    // If the user enter correct OTP : 
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    return res.status(200).json({ success: true, message: `Hi ${user.fullname}, you have been verified` });

})


//Logout user : 
export const logoutUser = asyncErrorHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    return res.clearCookie("token").status(200).json({
        success: true,
        message: "You have been log out "
    })
});


// Forget password : 
export const forgetPassword = asyncErrorHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {

    const { email }: { email: string } = req.body

    // Check if the user is exist or not : 

    const user = await userModel.findOne({ email });

    if (!user) {
        return next(new ErrorHandler(401, "User not found!"));
    }

    // Generate reset password token : 

    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpire = Date.now() + 10 * 60 * 1000   // token will be expired after 10 minuites


    user.resetPasswordToken = resetToken;
    user.resetPasswordTokenExpiresAt = new Date(resetTokenExpire);


    // save the updated data in the db : 

    await user.save();
    // send reset password token : 

    await sendResetPasswordToken(user.email, `${process.env.CLIENT_BASE_URL}/reset-password/${resetToken}`)

    return res.status(200).json({ success: true, message: `Hi ${user.fullname} , Reset password link has been sent to your email` });
})


// Reset password : 
export const resetPassword = asyncErrorHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {

    const { passwordtoken } = req.params;

    const { password }: { password: string, passwordResetToken: string } = req.body;

    // find user whose resetPassword token match with the req password token : 

    const user = await userModel.findOne({ resetPasswordToken: passwordtoken });

    if (!user) {
        return next(new ErrorHandler(401, "Invalid link or link has been expired!"));
    }

    // Convert the plain password to hashed format : 

    const hashedPassword = await bcrypt.hash(password, 10);

    // if the both token match : 

    await userModel.findByIdAndUpdate(user._id, { password: hashedPassword });
    await user.save();

    return res.status(200).json({ success: true, message: `Hi ${user.fullname} , Your password has been updated` });
});

