import { fetcherCSR } from "@/shared/lib";
import { APIResponse, Table, TCreateTable } from "@/shared/types";
import { fetcher } from "@/shared/lib";
import { revalidatePath } from "next/cache";


export async function getTables(shopId: string): Promise<APIResponse<Table[]>> {
  return fetcherCSR<Table[]>(`${process.env.NEXT_PUBLIC_ENV}/api/shops/${shopId}/tables`);
}

export async function getTable(shopId: string, tableId: string): Promise<APIResponse<Table[]>> {
  return fetcherCSR<Table[]>(`${process.env.NEXT_PUBLIC_ENV}/api/shops/${shopId}/tables/${tableId}`);
}

export async function createTable(param: TCreateTable): Promise<APIResponse<Table>> {
  console.log("📌 Sending Create Table Request:", param); // ✅ Debugging

  if (!param.shopId || param.shopId.length !== 24) {
    console.error("❌ Invalid shopId:", param.shopId);
    throw new Error("Invalid shopId: Must be a 24-character hex string.");
  }

  const response = await fetcherCSR<Table>(
    `${process.env.NEXT_PUBLIC_ENV}/api/shops/${param.shopId}/tables`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(param),
    }
  );

  console.log("📌 API Response:", response); // ✅ Log full response for debugging

  if (response.statusCode !== 201) {
    console.error("❌ API Error:", response);
    throw new Error(
      `Failed to create table: ${Array.isArray(response.message) ? response.message.join(", ") : response.message}`
    );
  }

  return response;
}



export async function updateTable(
  tableId: string,
  payload: { startTime?: string; seats?: number },
  shopId: string
): Promise<APIResponse<Table>> {
  console.log("🚀 Updating Table with Data:");
  console.log("Table ID:", tableId);
  console.log("Shop ID:", shopId);
  console.log("Payload:", payload);

  // Ensure IDs are valid ObjectIds
  if (!tableId || tableId.length !== 24) {
    console.error("❌ Invalid tableId:", tableId);
    throw new Error("Invalid tableId: Must be a 24-character hex string.");
  }

  if (!shopId || shopId.length !== 24) {
    console.error("❌ Invalid shopId:", shopId);
    throw new Error("Invalid shopId: Must be a 24-character hex string.");
  }

  return fetcherCSR<Table>(
    `${process.env.NEXT_PUBLIC_ENV}/api/shops/${shopId}/tables/${tableId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );
}



export async function deleteTable(tableId: string, shopId: string): Promise<APIResponse<null>> {
  return fetcherCSR<null>(`${process.env.NEXT_PUBLIC_ENV}/api/shops/${shopId}/tables/${tableId}`, {
    method: "DELETE",
  });
}
