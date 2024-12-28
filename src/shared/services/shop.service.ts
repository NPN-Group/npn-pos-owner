import { revalidatePath } from "next/cache";
import { fetcher } from "@/shared/lib";
import { Shop, TCreateShop, APIResponse } from "@/shared/types";

export async function getShops(): Promise<APIResponse<Shop[]>> {
    return fetcher<Shop[]>(`${process.env.NEXT_PUBLIC_ENV}/api/shops`);
}

export async function getShop(shopId: string): Promise<APIResponse<Shop>> {
    return fetcher<Shop>(`${process.env.NEXT_PUBLIC_ENV}/api/shops/${shopId}`);
}

export async function createShop(param: TCreateShop): Promise<APIResponse<Shop>> {
    const formData = new FormData();
    formData.append("name", param.name);
    formData.append("phone", param.phone);
    formData.append("location", param.location || "");
    formData.append("shop-image", param.shopImageFile!);
    const response = await fetcher<Shop>(`${process.env.NEXT_PUBLIC_ENV}/api/shops`, {
        method: "POST",
        body: formData,
    });

    revalidatePath("/select-shop");
    return response;
}
