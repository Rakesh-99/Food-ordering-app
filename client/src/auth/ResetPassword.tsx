import { Loader, LockKeyhole } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Separator } from "../components/ui/separator";
import { ChangeEvent, FormEvent, useState } from "react";
import { NavLink } from "react-router-dom";
import { resetPasswordSchema, resetPasswordType } from '../zod/schema-user/user';
import { useUserStore } from "../store/userStore";




const ResetPassword = () => {

    const { loading, resetPassword } = useUserStore();

    const [formError, setFormError] = useState<Partial<resetPasswordType>>();


    const [passwordData, setPasswordData] = useState<resetPasswordType>({
        password: "",
    })

    const inputChangeHandle = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPasswordData({ ...passwordData, [name]: value })
    };

    const formSubmitHandle = async (e: FormEvent) => {
        e.preventDefault();

        // Form validation using zod

        const result = resetPasswordSchema.safeParse(passwordData);
        if (result.error) {
            const catchErr = result.error.formErrors.fieldErrors;
            setFormError(catchErr as Partial<resetPasswordType>);
            return;
        }

        setFormError(undefined);

        //Reset password Api implementation : 
        await resetPassword(passwordData);


    };

    return (
        <>
            <div className="w-full select-none flex-col h-screen flex justify-center items-center">
                <h1 className="text-4xl text-gray-600 font-bold ">Reset password</h1>
                <p className="mb-5 text-sm">Enter your new password</p>
                {/* Form  */}
                <form
                    onSubmit={formSubmitHandle}
                    className="md:border lg:border md:w-2/3 lg:w-1/3 w-full  p-5 rounded-md"
                >
                    {/* Email   */}
                    <label className="">Enter password</label>
                    <div className="mb-4 mt-1 relative">
                        <Input
                            name="password"
                            value={passwordData.password}
                            className="pl-10 text-lg focus-visible:ring-0"
                            type="password"
                            placeholder="Enter new password"
                            onChange={inputChangeHandle}
                        />
                        <LockKeyhole className="absolute inset-y-2 left-2 text-gray-500 w-5 h-5 pointer-events-none" />
                        {formError && (
                            <p className="text-xs text-red-500">{formError.password}</p>
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
                                Reset
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

export default ResetPassword;
