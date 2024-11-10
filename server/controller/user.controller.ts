import { NextFunction, Request, Response } from "express";
import userModel from "../models/user.model";
import bcrypt from 'bcrypt';
import { ErrorHandler } from "../utils/ErrorHandler";
import asyncErrorHandler from 'express-async-handler';
import createJwtToken from "../utils/jwtTokenAndCookies";
import { sendVerificationMail } from "../config/sendEmails";
import crypto from 'crypto';
import dotenv from 'dotenv';
dotenv.config();
import { sendResetPasswordToken } from "../config/sendEmails";
import { uploadOnCloudinary } from "../utils/cloudinary-setup/cloudinary";
import { sendSuccessfullResetEmail } from "../config/sendEmails";
import { unlink } from "fs/promises";




interface IUserTypes {
    fullname: string,
    email: string,
    password: string,
    city: string,
    address: string,
    country: string
}




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

    // create a six digit verification code  : 
    const verificationCode = Math.floor(100000 + Math.random() * 200000).toString();

    // create a new user : 
    const newUser = new userModel({
        fullname,
        email,
        contact,
        password: hashedPassword,
        verificationToken: verificationCode,
        verificationTokenExpiresAt: new Date(Date.now() + 15 * 60 * 1000) // OTP will expire in 15 minutes 
    })
    await newUser.save();

    // convert the mongoose document in plain object, then send the new user data in response without password : 
    const { password: _, ...rest } = newUser.toObject();


    // Create jwt token and set cookies : 
    createJwtToken(res, newUser._id);

    // Send verification mail : 
    await sendVerificationMail(newUser.email, verificationCode);

    return res.status(200).json({ success: true, message: 'User has been registered', user: rest });
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

    // Password mateched, create the jwt token and set the cookie : 

    createJwtToken(res, isUserExist._id);


    // Send user data without pasword in response : 
    const userWithoutPassword = isUserExist.toObject();
    const { password: _, ...rest } = userWithoutPassword;

    isUserExist.lastLogin = new Date(Date.now());

    await isUserExist.save();

    return res.status(200).json({ success: true, message: `Welcome back ${isUserExist.fullname}`, user: rest })
});



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

    // Check if the user has verified the email or not : 
    if (!user.isVerified) {
        return next(new ErrorHandler(401, "You need to verify the email address before performing forget password !"))
    }

    
    // Generate reset password token : 
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpire = new Date(Date.now() + 10 * 60 * 1000)// token will be expired after 10 minuites


    const updateUser = await userModel.findByIdAndUpdate(
        user._id,
        {
            resetPasswordToken: resetToken,
            resetPasswordTokenExpiresAt: resetTokenExpire
        }
    );
    await updateUser?.save();

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

    if (!user || user.resetPasswordTokenExpiresAt && user.resetPasswordTokenExpiresAt < new Date(Date.now())) {
        return next(new ErrorHandler(401, "Invalid link or link has been expired!"));
    }

    // If the token matched with Database token then create a password and convert it into hash format: 


    const hashedPassword = await bcrypt.hash(password, 10);

    // update in db 

    const updateUser = await userModel.findByIdAndUpdate(
        user._id,
        {
            password: hashedPassword,
            resetPasswordToken: undefined,
            resetPasswordTokenExpiresAt: undefined
        }
    );
    await updateUser?.save();

    //Send successfull reset email:

    await sendSuccessfullResetEmail(user.email);

    return res.status(200).json({ success: true, message: `Hi ${user.fullname} , Your password has been updated` });
});


// Check auth : 
export const checkAuth = asyncErrorHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {

    const user = await userModel.findById({ _id: req.userId }).select("-password");

    if (!user) {
        return next(new ErrorHandler(401, "User not found !"));
    }

    return res.status(200).json({ success: true, message: "Your profile has been fetched", user });
});




// Update user profile: 
export const updateUserProfile = asyncErrorHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {

    const userId = req.userId;
    const user = await userModel.findById({ _id: userId }).select("-password");

    if (!user) {
        return next(new ErrorHandler(400, "User not found!"));
    }

    if (!user.isVerified) {
        return next(new ErrorHandler(401, "You need to verify your email before updating !"));
    }


    const userImage = req.file;
    const { fullname, email, password, city, address, country }: Partial<IUserTypes> = req.body;

    // if file is there, upload it on cloudinary : 
    const cloudinaryImgURL = await uploadOnCloudinary(userImage?.path);


    let hashedPassword;
    // If password available convert it into hash : 
    if (password) {
        hashedPassword = await bcrypt.hash(password, 10);
    }

    // Update the userDetails : 
    const updateUserChanges = await userModel.findByIdAndUpdate(
        user._id,
        {
            profilePicture: cloudinaryImgURL || user.profilePicture,
            fullname: fullname || user.fullname,
            email: email || user.email,
            password: hashedPassword || user.password,
            city: city || user.city,
            address: address || user.address,
            country: country || user.country
        },
        { new: true }
    );
    await updateUserChanges?.save();

    // Delete the file from the folder after image has been pushed to the cloudinary :
    if (updateUserChanges && userImage) {
        unlink(userImage.path)
    }

    return res.status(200).json({ success: true, message: "User profile has been updated", user: updateUserChanges })
})
