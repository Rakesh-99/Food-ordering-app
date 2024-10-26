import { NextFunction, Request, Response } from "express";

export const erroMiddleware = (err: Error & { statusCode: number }, req: Request, res: Response, next: NextFunction) => {

    err.message = err.message || "Internal server error!";
    err.statusCode = err.statusCode || 500;

    res.status(err.statusCode).json({ success: false, message: err.message });
};