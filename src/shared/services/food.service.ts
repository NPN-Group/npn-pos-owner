import { fetcherCSR } from "@/shared/lib";
import { APIResponse, Food, TCreateFood } from "@/shared/types";

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

export async function createFood(params: TCreateFood): Promise<APIResponse<Food>> {
  const formData = new FormData();

  // Add JSON data
  const jsonPayload = JSON.stringify({
    name: params.name,
    price: params.price,
    description: params.description || null,
    category: params.category || null,
    shop: params.shop,
  });

  formData.append('json', jsonPayload);

  if (params.img instanceof File) {
    formData.append('food-image', params.img); // Match backend field name
  }

  const response = await fetcherCSR<Food>(
    `${process.env.NEXT_PUBLIC_ENV}/api/foods`,
    {
      method: 'POST',
      body: formData,
    }
  );

  return response;
}


export async function updateFood(
  foodId: string,
  formData: FormData
): Promise<APIResponse<Food>> {
  return fetcherCSR<Food>(`${process.env.NEXT_PUBLIC_ENV}/api/foods/${foodId}`, {
    method: "PATCH",
    body: formData,
  });
}

export async function deleteFood(foodId: string): Promise<APIResponse<null>> {
  return fetcherCSR<null>(`${process.env.NEXT_PUBLIC_ENV}/api/foods/${foodId}`, {
    method: "DELETE",
  });
}
