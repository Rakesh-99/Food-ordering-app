import {
  Contact2Icon,
  Eye,
  EyeOff,
  Loader,
  LockKeyhole,
  Mail,
  User,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Separator } from "../components/ui/separator";
import { ChangeEvent, FormEvent, useState } from "react";
import { NavLink } from "react-router-dom";
import { signupDataType, userSignupSchema } from "../schema-zod/user";

type loadingState = boolean;
type passwordVisibility = boolean;

const Signup = () => {









  const [formError, setFormError] = useState<Partial<signupDataType>>({});

  const [loading] = useState<loadingState>(false);

  const [hidePassword, setHidePassword] = useState<passwordVisibility>(true);

  const [signupInputData, setSignupInputData] = useState<signupDataType>({
    email: "",
    password: "",
    fullname: "",
    contact: "",
  });

  const inputChangeHandle = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupInputData({ ...signupInputData, [name]: value });
  };

  const formSubmitHandle = (e: FormEvent) => {
    e.preventDefault();

    // Form validation using zod

    const validateForm = userSignupSchema.safeParse(signupInputData);

    if (validateForm.error) {
      const catchErr = validateForm.error.formErrors.fieldErrors;
      setFormError(catchErr as Partial<signupDataType>);
      return false;
    }

    // Signup Api implementation 

  };

  return (
    <>
      <div className="w-full select-none flex-col h-screen flex justify-center items-center">
        <h1 className="text-4xl font-bold my-10">Sign up</h1>

        {/* Form  */}
        <form
          onSubmit={formSubmitHandle}
          className="md:border transition-all duration-1000 lg:border md:w-2/3 lg:w-1/3 w-full  p-5 rounded-md"
        >
          {/* Fullname  */}
          <label className="">Enter Fullname *</label>
          <div className="mb-4 relative">
            <Input
              name="fullname"
              value={signupInputData.fullname}
              className={`pl-10 text-lg focus-visible:ring-0 `}
              type="text"
              placeholder="Fullname"
              onChange={inputChangeHandle}
            />
            <User className="absolute inset-y-2 left-2 text-gray-500 w-5 h-5 pointer-events-none" />
            {formError && (
              <p className="text-red-500 text-xs">{formError.fullname}</p>
            )}
          </div>

          {/* Email  */}
          <label className="">Enter email *</label>
          <div className="mb-4 relative">
            <Input
              name="email"
              value={signupInputData.email}
              className={`pl-10 text-lg focus-visible:ring-0 `}
              type="text"
              placeholder="Email"
              onChange={inputChangeHandle}
            />
            <Mail className="absolute inset-y-2 left-2 text-gray-500 w-5 h-5 pointer-events-none" />
            {formError && (
              <p className="text-red-500 text-xs">{formError.email}</p>
            )}
          </div>

          {/* Number  */}
          <label className="">Enter contact no *</label>
          <div className="mb-4 relative">
            <Input
              name="contact"
              value={signupInputData.contact}
              className={`pl-10 text-lg focus-visible:ring-0 `}
              type="text"
              placeholder="Contact number"
              onChange={inputChangeHandle}
            />
            <Contact2Icon className="absolute inset-y-2 left-2 text-gray-500 w-5 h-5 pointer-events-none" />
            {formError && (
              <p className="text-red-500 text-xs">{formError.contact}</p>
            )}
          </div>

          {/* Password  */}
          <label className="">Enter passowrd *</label>
          <div className="mb-4 relative">
            <Input
              name="password"
              value={signupInputData.password}
              className={`pl-10 text-lg focus-visible:ring-0 `}
              type={`${hidePassword ? "password" : "text"}`}
              placeholder="Password"
              onChange={inputChangeHandle}
            />

            {/* Show and hide password  */}
            {hidePassword ? (
              <EyeOff
                onClick={() => setHidePassword(!hidePassword)}
                className="absolute inset-y-2 cursor-pointer active:scale-95 text-gray-500 right-5 w-5 h-5"
              />
            ) : (
              <Eye
                onClick={() => setHidePassword(!hidePassword)}
                className="absolute inset-y-2 cursor-pointer w-5 h-5 active:scale-95 text-gray-500 right-5"
              />
            )}
            <LockKeyhole className="absolute inset-y-2 left-2 text-gray-500 w-5 h-5 pointer-events-none" />
            {formError.password && (
              <p className="text-red-500 text-xs">{formError.password}</p>
            )}
          </div>
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
                Signup
              </Button>
            )}
          </div>

          <Separator className="my-5" />

          <p className="flex gap-1">
            Already have an account ?
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

export default Signup;
