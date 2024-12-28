import { z } from "zod";
import { User } from "./user";

export type Shop = {
    id: string;
    name: string;
    phone: string;
    location: string | null;
    img: string | null;
    owner: User;
    createdAt: string;
    updatedAt: string;
}

export const CreateShopSchema = z.object({
    name: z
        .string({ message: "Shop name must be a string." })
        .trim()
        .min(1, { message: "Shop name is required." })
        .transform((val) => val.trim()),
    phone: z
        .string({ message: "Phone must be a string." })
        .regex(/^(?:\+66|0)[689]\d{8}$/, { message: "Invalid phone number." }),
    location: z
        .string({ message: "Location must be a string." }).optional(),
    shopImageFile: z
        .instanceof(File, { message: "Shop image must be a file." })
        .refine((file) => file.type.startsWith("image/"), { message: "Shop image must be of type image/*" })
        .refine((file) => file.size <= 10 * 1024 * 1024, { message: "Shop image must be less than 10MB." })
        .optional()
});

export type TCreateShop = z.infer<typeof CreateShopSchema>

export type ShopParams = {
    shopId: string;
}
