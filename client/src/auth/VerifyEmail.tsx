import { Loader, Verified } from "lucide-react";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import { FormEvent, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { verifyEmailSchema, verifyOtpType } from '../zod/schema-user/user';
import { useUserStore } from "../store/userStore";





const VerifyEmail = () => {

    const [formError, setFormError] = useState("");
    const navigate = useNavigate();

    const [verificationCode, setVerificationCode] = useState<verifyOtpType>();

    const { emailVerify, loading, isEmailVerified } = useUserStore((state) => state);

    const formSubmitHandle = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Form validation using zod : 

        const response = verifyEmailSchema.safeParse(verificationCode);
        if (!response.success) {
            const catchErr = response.error.errors.map((err) => err.message).join("\n")
            setFormError(catchErr)

        }

        // verify email api implementation : 
        try {
            await emailVerify(verificationCode!);
        } catch (error) {
            console.log(error);
        }
    };

    // useEffect to track the isEmailVerified state changes :
    useEffect(() => {
        if (isEmailVerified) {
            navigate('/login');
        }
    }, [isEmailVerified]);


    return (
        <>
            <div className="w-full select-none flex-col h-screen flex justify-center items-center">
                <h1 className="text-4xl text-gray-600 font-bold ">Verify Email</h1>
                <p className="mb-5 text-sm">Enter OTP recieved on registered email</p>
                {/* Form  */}
                <form
                    onSubmit={formSubmitHandle}
                    className="md:border lg:border md:w-2/3 lg:w-1/3 w-full  p-5 rounded-md"
                >
                    {/* Email  label */}
                    <div className="flex  items-center gap-2">
                        <label className="">Enter OTP</label>
                        <Verified className=" text-gray-500 w-5 h-5 pointer-events-none" />
                    </div>


                    {/* Email input :  */}
                    <div className="my-3">
                        <div className="text-center flex justify-center items-center" >
                            <input
                                type="text"
                                name="otp"
                                className=" w-full border outline-none h-10 text-center font-bold text-2xl"
                                onChange={(e) => { setVerificationCode(e.target.value) }}
                            />
                        </div>
                    </div>
                    {formError && (
                        <p className="text-xs text-red-500">{formError}</p>
                    )}


                    {/* Button  */}
                    <div className="transition-all duration-1000">
                        {loading ? (
                            <Button
                                disabled
                                className="w-full py-6 flex gap-2 items-center text-lg bg-dayAccentColor hover:bg-dayAccentColorOnHover"
                            >
                                <Loader className="animate-spin" />
                                Please wait..
                            </Button>
                        ) : (
                            <Button
                                type="submit"
                                className="w-full  py-6 text-lg bg-dayAccentColor hover:bg-dayAccentColorOnHover"
                            >
                                Submit
                            </Button>
                        )}
                    </div>

                    <Separator className="my-2" />

                    <p className="flex gap-1">
                        Back to
                        <NavLink
                            to="/login"
                            className="transition-all text-blue-600 hover:underline cursor-pointer hover:text-blue-400"
                        >
                            Login
                        </NavLink>
                    </p>
                </form>
            </div>
        </>
    );
};

export default VerifyEmail;
