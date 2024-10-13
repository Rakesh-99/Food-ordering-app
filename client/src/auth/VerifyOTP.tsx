import { Loader, Verified } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Separator } from "../components/ui/separator";
import { ChangeEvent, FormEvent, useState } from "react";
import { NavLink } from "react-router-dom";






const VerifyOTP = () => {

    const [loading] = useState<boolean>(false);

    const [formError, setFormError] = useState<string>('');

    const [otp, setOtp] = useState<string>('');

    const inputChangeHandle = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        setOtp(value);
    };

    const formSubmitHandle = (e: FormEvent) => {
        e.preventDefault();

        // Api implementation 

    };

    return (
        <>
            <div className="w-full select-none flex-col h-screen flex justify-center items-center">
                <h1 className="text-4xl text-gray-600 font-bold ">Verify OTP</h1>
                <p className="mb-5 text-sm">Enter OTP recieved on registered email</p>
                {/* Form  */}
                <form
                    onSubmit={formSubmitHandle}
                    className="md:border lg:border md:w-2/3 lg:w-1/3 w-full  p-5 rounded-md"
                >
                    {/* Email   */}
                    <label className="">Enter OTP</label>
                    <div className="mb-4 mt-1 relative">
                        <Input
                            name="otp"
                            value={otp}
                            required
                            className="pl-10 text-center text-lg focus-visible:ring-0"
                            type="text"
                            placeholder="Enter OTP reveived on registered email"
                            onChange={inputChangeHandle}
                            minLength={6}
                            maxLength={6}
                        />
                        <Verified className="absolute inset-y-2 left-2 text-gray-500 w-5 h-5 pointer-events-none" />
                        {formError && (
                            <p className="text-xs text-red-500">{formError}</p>
                        )}
                    </div>

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

export default VerifyOTP;
