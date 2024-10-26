import { NextFunction, Request, Response } from "express";
import userModel from "../models/user.model";
import bcrypt, { genSalt } from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import { ErrorHandler } from "../utils/ErrorHandler";

// User Signup : 

export const userSignup = async (req: Request, res: Response, next: NextFunction): Promise<any> => {

    const { fullname, email, password, contact }: { fullname: string, email: string, password: string, contact: number } = req.body;

    try {
        // If user is already exist 
        const user = await userModel.findOne({ email });

        if (user) {
            return next(new ErrorHandler(401, "User already exist!"));
        }

        // Password hashing 
        const gensalt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, gensalt);


        // Register user ;
        const registerUser = new userModel({
            fullname,
            email,
            contact,
            password: hashedPassword
        })
        await registerUser.save();

        const userWithoutPassword = await userModel.findOne({ email }).select("-password");
        return res.status(200).json({ sucess: true, message: "User has been registered", user: userWithoutPassword })

    } catch (error) {
        return next(new ErrorHandler(500, `Internal Server Errro! : ${error}`));
    }
};


// User login : 

export const userLogin = async (req: Request, res: Response, next: NextFunction): Promise<any> => {

    const { email, password }: { email: string, password: string } = req.body;

    try {
        // Find if the user is exist or not : 
        const user = await userModel.findOne({ email });
        if (!user) {
            return next(new ErrorHandler(401, "Invalid email or password!"))
        }
        // If user already exist : 
        // Match the database password and password coming from body : 

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        // If password doesn't match .. : 

        if (!isPasswordMatch) {
            return next(new ErrorHandler(401, "Invalid email or password!"))
        }

        // If password match : 
        const userWithoutPassword = await userModel.findOne({ email }).select("-password")
        return res.status(200).json({ success: true, message: "Welcome Back", user: userWithoutPassword })


    } catch (error) {
        return next(new ErrorHandler(500, `Internal server error! ${error}`));
    }
};



// Verify email : 

export const verifyEmail = async (req: Request, res: Response) => {

    const { otp } = req.body;

    // Check if the OTP is matching to the specific user : 

    const user = await userModel.findOne({ verificationToken: otp });

    if (!user) {
        return res.status(401).json({ success: false, message: "User is not found!" });
    }

}