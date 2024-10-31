import { NextFunction, Response } from 'express';
import { transport } from './email.config';
import { VERIFICATION_EMAIL_TEMPLATE } from './emailTemplate';
import { ErrorHandler } from '../utils/ErrorHandler';





// Send veriofication email : 
export const sendVerificationMail = async (email: string, verificationToken: string) => {
    try {
        const sendMessage = await transport.sendMail({
            from: process.env.USER_EMAIL,
            to: email,
            subject: "Verify Your Email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken)
        })
        console.log(`Message has been sent successfully ${sendMessage.messageId}`);

    } catch (error) {
        // return next(new ErrorHandler(400, `The email could not deliver! , ${error}`));
        console.log(`The email could not deliver! , ${error}`);

    }
}