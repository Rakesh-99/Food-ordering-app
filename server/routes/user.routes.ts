import express from 'express';
const userRouters = express.Router();
import { userSignup, userLogin, verifyEmail, logoutUser, forgetPassword, resetPassword, updateUserProfile, checkAuth } from "../controller/user.controller";
import { verifyUserByJwt } from '../middleware/verifyJwtToken';
import uploadFile from '../middleware/multer.config';



userRouters
    .get('/check-auth', verifyUserByJwt, checkAuth)
    .post('/signup', userSignup)
    .post('/login', userLogin)
    .post('/verify-email', verifyEmail)
    .post('/logout', logoutUser)
    .post('/forget-password', forgetPassword)
    .post('/reset-passsword/:passwordtoken', resetPassword)
    .put('/update-user', verifyUserByJwt, uploadFile.single("profilePicture"), updateUserProfile)



export default userRouters;