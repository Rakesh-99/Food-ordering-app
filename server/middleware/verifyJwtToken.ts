// This function is to check if the user is available/ authorized or not : 
import jwt, { JwtPayload } from 'jsonwebtoken';
import asyncErrorHandler from 'express-async-handler';
import { NextFunction, Request, Response } from 'express';
import { ErrorHandler } from '../utils/ErrorHandler';




declare global {
    namespace Express {
        interface Request {
            userId: string
        }
    }
};

export const verifyUserByJwt = asyncErrorHandler(async (req: Request, res: Response, next: NextFunction) => {

    const cookieToken = req.cookies.token;

    if (!cookieToken) {
        return next(new ErrorHandler(401, " Unauthorized user or cookie not found!"));
    }

    // verify the cookie : 
    const verifyCookie = jwt.verify(cookieToken, process.env.JWT_TOKEN!) as JwtPayload;

    if (!verifyCookie) {
        return next(new ErrorHandler(401, "Unauthorized user or Invalid token!"));
    }

    req.userId = verifyCookie._id;
    next();
});
