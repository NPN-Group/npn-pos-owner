import { fetcherCSR } from "@/shared/lib";
import { APIResponse, Food } from "@/shared/types";

export async function getFoods(shopId: string): Promise<APIResponse<Food[]>> {
    return fetcherCSR<Food[]>(
      `${process.env.NEXT_PUBLIC_ENV}/api/foods/all`, // Correct the endpoint if needed
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ shop: shopId }), // Ensure the body matches backend expectations
      }
    );
  }
  
  