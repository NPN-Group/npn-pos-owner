import { z } from "zod";

export const LoginSchema = z.object({
    email: z.string({ message: "Email is required" })
        .email({ message: "Email is invalid" }),
    password: z.string({ message: "Password is required" })
        .min(8, { message: "Password must be at least 8 characters long" }),
});

export type TLogin = z.infer<typeof LoginSchema>;

export const RegisterSchema = z.object({
    email: z.string({ message: "Email is required" })
        .email({ message: "Email is invalid" }),
    password: z.string({ message: "Password is required" })
        .min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z.string({ message: "Confirm password is required" }),
}).refine(data => data.password === data.confirmPassword, { message: "Passwords do not match", path: ["confirmPassword"] }); // Password matching check

export type TRegister = z.infer<typeof RegisterSchema>;
