import { z } from "zod";

export type User = {
    id: string;
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
    img: string;
    role: string;
    createdAt: string;
    updatedAt: string;
}

export type EditUserProfile = {
    firstName?: string;
    lastName?: string;
    img?: File;
};

export const UpdateUserSchema = z.object({
    password: z
        .string({ message: "Password must be a string" })
        .min(8, { message: "Password length must be at least 8 characters" })
        .optional(),

    firstName: z
        .string({ message: "First name must be a string" })
        .refine((val) => val.trim().length > 0, { message: "First name is required" })
        .optional(),

    lastName: z
        .string({ message: "Last name must be a string" })
        .refine((val) => val.trim().length > 0, { message: "Last name is required" })
        .optional(),

    img: z
        .instanceof(File, { message: "Must be a valid image file" })
        .refine((file) => file.type.startsWith("image/"), { message: "File must be an image" })
        .optional(), 
});

export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;