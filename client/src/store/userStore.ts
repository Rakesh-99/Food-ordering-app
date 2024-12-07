import { create } from 'zustand';
import { createJSONStorage, persist, devtools } from 'zustand/middleware';
import { loginDataType, signupDataType } from '../zod/schema-user/user';
import { toast } from 'sonner';
import { axiosUserInstance } from '../axiosInstances/axiosApis';



type user = {
    fullname: string,
    email: string,
    admin: boolean,
    contact: number,
    password: string,
    address: string,
    country: string,
    city: string,
    profilePicture: string,
    isVerified: boolean,
}

type userType = {
    user: user | null,
    loading: boolean,
    isAuthenticated: boolean,   //<-- state for checking if the user is logged in or not 
    isEmailVerified: boolean,   //<-- state for checking if the email is verified or not 
    signup: (inputSignupData: signupDataType) => Promise<void>,
    login: (inputLoginData: loginDataType) => Promise<void>,
    emailVerify: (verificationCode: string) => Promise<void>,
    logout: () => Promise<void>,
    updateUser: (newUserInfo: any) => Promise<void>,
    resetPasssword: (newPassword: string, token: string) => Promise<void>
}




// user store : 

export const useUserStore = create<userType>()(devtools(persist((set) => ({

    // Initial state : 
    user: null,
    error: null,
    loading: false,
    isAuthenticated: false,
    isEmailVerified: false,

    // Signup Api implementation : 
    signup: async (inputSignupData: signupDataType) => {
        try {
            set({ loading: true });
            const response = await axiosUserInstance.post('/signup', inputSignupData)
            const data = await response.data;

            if (data.success) {
                set({ loading: false, user: data.user });
                toast.success(data.message);
            }
        } catch (err: any) {
            set({ loading: false, user: null });
            toast.error(err.response.data.message || "An unexpected error occurred while performing signup request!");
        }
    },
    // Login api implementation : 
    login: async (inputLoginData: loginDataType) => {

        try {
            set({ loading: true });
            const response = await axiosUserInstance.post("/login", inputLoginData)
            const data = await response.data;
            if (data.success) {
                toast.success(data.message);
                set({ loading: false, isAuthenticated: true, user: data.user });
                return;
            }
        } catch (err: any) {
            set({ loading: false, isAuthenticated: false });
            toast.error(err.response.data.message || "An unexpected error occurred while performing login request!");
            return;
        }
    },

    // Verify email api implementation : 
    emailVerify: async (verificationCode: string) => {

        try {
            set({ loading: true });
            const response = await axiosUserInstance.post("/verify-email", { otp: verificationCode });
            const data = await response.data;
            if (data.success) {
                toast.success(data.message);
                set({ loading: false, isEmailVerified: true })
            }
        } catch (err: any) {
            set({ loading: false, isEmailVerified: false });
            toast.error(err.response.data.message || "Unexpected error occurred while performing email verification !");
        }
    },

    // Logout Api implementation : 
    logout: async () => {
        try {
            set({ loading: false })
            const logoutResponse = await axiosUserInstance.post("/logout");
            const data = await logoutResponse.data;
            if (data.success) {
                toast.success(data.message);
                set({ loading: false, user: null, isAuthenticated: false });
            }
        } catch (err: any) {
            set({ loading: false });
            toast.error(err.response.data.message || "Unexpected error occurred while performing logout user!");
        }
    },

    // Forget password : 
    forgetPassword: async (email: string) => {
        try {
            set({ loading: true });
            const forgetPasswordResponse = await axiosUserInstance.post("/forget-password", email);
            const data = await forgetPasswordResponse.data;
            if (data.success) {
                set({ loading: false });
                toast.success(data.message)
            }
        } catch (err: any) {
            set({ loading: false });
            toast.error(err.response.data.message || "Unexpected error occurred while performing forget password!")
        }
    },

    // Reset password : 
    resetPasssword: async (newPassword: any, token: string) => {
        try {
            set({ loading: true });
            const resetPasswordResponse = await axiosUserInstance(`/reset-password/${token}`, newPassword);
            const data = await resetPasswordResponse.data;
            if (data.success) {
                set({ loading: false })
                toast.success(data.message)
            }
        } catch (error: any) {
            set({ loading: false });
            toast.error(error.response.data.message || "Unexpected error occurred while performing reset password!");
        }
    },

    // Update user api implementation :
    updateUser: async (newUserInfo: signupDataType) => {
        try {
            set({ loading: true })
            const updateUserResponse = await axiosUserInstance.post(`/update-user`, newUserInfo);
            const data = await updateUserResponse.data;

            if (data.success) {
                set({ loading: false, user: data.user });
                toast.success(data.message);
            }
        } catch (error: any) {
            set({ loading: false });
            toast.error(error.response.data.message || "Unexpected error occurred while updating user!");
        }
    },

    // Check authentication of user :  
    chekAuthByCookie: async () => {
        try {
            const cookieUserResponse = await axiosUserInstance.get('/check-auth');
            const data = await cookieUserResponse.data;
            if (data.success) {
                set({ user: data.response.user, isAuthenticated: true })
            }
        } catch (err: any) {
            set({ isAuthenticated: false });
            toast.error(err.response.data.message || "Could not fetch data at this moment!");
        }
    },
})
    ,
    {
        name: "userData",
        storage: createJSONStorage(() => localStorage)
    }
)))