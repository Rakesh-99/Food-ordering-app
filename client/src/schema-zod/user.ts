import { z } from "zod";



// Signup  data - zod 
export const userSignupSchema = z.object({
  fullname: z
    .string()
    .min(3, "Fullname must be atleast 3 char!")
    .max(35, "Fullname can not exceed 35 char!"),
  email: z.string().email("Invalid email address!"),
  password: z
    .string()
    .min(8, "Password must be atleast 8 char!")
    .max(20, "Password can not exceed 20 char!")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  contact: z
    .string()
    .min(10, "Contact no. must be 10 digit!")
    .max(10, "Contact no. must be 10 digit!"),
});

export type signupDataType = z.infer<typeof userSignupSchema>;


// Login data - zod 
export const userLoginSchema = z.object({
  email: z.string().email("Invalid email address!"),
  password: z.string().min(8, "Password must be atleast 8 char!")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
});

export type loginDataType = z.infer<typeof userLoginSchema>;


// Forget-password data fr zod 

export const forgetPasswordSchema = z.object({
  email: z.string().email("Invalid email address!")
})

export type isEmailValidType = z.infer<typeof forgetPasswordSchema>


// Reset password data - zos

export const resetPasswordSchema = z.object({
  password: z.string()
    .min(8, 'Password must be at least 8 characters long')
    .max(20, "Password must not exceed 20 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
})
export type resetPasswordType = z.infer<typeof resetPasswordSchema>


