import { z } from "zod";

export const userSignupSchema = z.object({
  fullname: z.string().min(3, "Fullname must be atleast 3 char!"),
  email: z.string().email("Invalid email address!"),
  password: z.string().min(8, "Password must be atleast 8 char!"),
  contact: z.string().min(10, "Contact no. must be 10 digit"),
});

export type signupDataType = z.infer<typeof userSignupSchema>;

export const userLoginSchema = z.object({
  email: z.string().email("Invalid email address!"),
  password: z.string().min(8, "Password must be atleast 8 char!"),
});

export type loginDataType = z.infer<typeof userLoginSchema>;
