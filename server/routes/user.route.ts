import express from 'express';
const userRouters = express.Router();
import { userSignup, userLogin } from "../controller/user.controller";





userRouters.post('/signup', userSignup)
    .post('/login', userLogin)




export default userRouters;