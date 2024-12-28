"use server";

import { createShop } from "@/shared/services";
import { ActionResponse, CreateShopSchema, Shop, TCreateShop } from "@/shared/types";

export async function CreateShopAction(formData: FormData): Promise<ActionResponse<TCreateShop, Shop>> {
    const shopName = formData.get("name") as string;
    const shopPhone = formData.get("phone") as string;
    const shopLocation = formData.get("location") as string;
    const shopImageFile = formData.get("shopImageFile") as File;

    try {
        const data = {
            name: shopName,
            phone: shopPhone,
            location: shopLocation,
            shopImageFile: shopImageFile,
        }

        const validateData = CreateShopSchema.safeParse(data);
        if (!validateData.success) {
            return {
                data: { name: shopName, phone: shopPhone, location: shopLocation, shopImageFile: shopImageFile },
                errors: {
                    name: validateData.error.errors.find((error) => error.path[0] === "name")?.message || "",
                    phone: validateData.error.errors.find((error) => error.path[0] === "phone")?.message || "",
                    location: validateData.error.errors.find((error) => error.path[0] === "location")?.message || "",
                    shopImageFile: validateData.error.errors.find((error) => error.path[0] === "shopImageFile")?.message || "",
                }
            }
        }

        const response = await createShop(validateData.data);
        return {
            data: validateData.data,
            response: response,
        }
    } catch (err) {
        console.log(err);
        if (err instanceof Error) {
            return {
                data: { name: shopName, phone: shopPhone, location: shopLocation, shopImageFile: shopImageFile },
                errors: { internal: err.message }
            }
        }
        return {
            data: { name: shopName, phone: shopPhone, location: shopLocation, shopImageFile: shopImageFile },
            errors: { internal: "An error occurred. Please try again later." }
        }
    }
}