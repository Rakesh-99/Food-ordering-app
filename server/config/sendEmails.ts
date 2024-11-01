import { transport } from './email.config';
import { VERIFICATION_EMAIL_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE } from './emailTemplate';






// Send verification email : 
export const sendVerificationMail = async (email: string, verificationToken: string) => {
    try {
        const sendMessage = await transport.sendMail({
            from: process.env.USER_EMAIL,
            to: email,
            subject: "Food Frenzy || Verify Your Email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken)
        })
        console.log(`Message has been sent successfully ${sendMessage.messageId}`);

    } catch (error) {
        console.log(`The email could not deliver! , ${error}`);
    }
};


// Send reset password token : 

export const sendResetPasswordToken = async (email: string, token: string) => {

    try {
        const sendLink = transport.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Food Frenzy || Request for reset password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", token)

        });
        console.log(`Password reset link has been sent successfully-  ${(await sendLink).messageId}`,);

    } catch (error) {
        console.log(`Could not send reset password link! : ${error}`);
    }
}