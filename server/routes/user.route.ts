import express from 'express';
const userRouters = express.Router();
import { userSignup, userLogin, verifyEmail, logoutUser, forgetPassword, resetPassword } from "../controller/user.controller";





userRouters
    .post('/signup', userSignup)
    .post('/login', userLogin)
    .post('/verify-email', verifyEmail)
    .post('/logout', logoutUser)
    .post('/forget-password', forgetPassword)
    .post('/reset-passsword/:passwordtoken', resetPassword)


export default userRouters;