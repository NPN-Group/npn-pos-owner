"use server";

import { createTable } from "@/shared/services";
import { ActionResponse, CreateTableSchema, Table, TCreateTable } from "@/shared/types";

export async function CreateTableAction(formData: FormData): Promise<ActionResponse<TCreateTable, Table>> {
    const shopId = formData.get("shopId") as string;
    const activeTicket = formData.get("activeTicket") as string;
    const seats = Number(formData.get("seats"));
    const tableNumber = Number(formData.get("tableNumber"));
    const startTime = formData.get("startTime") as string;

    try {
        const data = {
            shopId,
            activeTicket,
            seats,
            tableNumber,
            startTime,
        };

        // Validate data using Zod schema
        const validateData = CreateTableSchema.safeParse(data);
        if (!validateData.success) {
            return {
                data,
                errors: {
                    shopId: validateData.error.errors.find((error) => error.path[0] === "shopId")?.message || "",
                    activeTicket: validateData.error.errors.find((error) => error.path[0] === "activeTicket")?.message || "",
                    seats: validateData.error.errors.find((error) => error.path[0] === "seats")?.message || "",
                    tableNumber: validateData.error.errors.find((error) => error.path[0] === "tableNumber")?.message || "",
                    startTime: validateData.error.errors.find((error) => error.path[0] === "startTime")?.message || "",
                }
            };
        }

        // Call createTable API service
        const response = await createTable(validateData.data);
        return {
            data: validateData.data,
            response: response,
        };
    } catch (err) {
        console.log(err);
        if (err instanceof Error) {
            return {
                data: { shopId, activeTicket, seats, tableNumber, startTime },
                errors: { internal: err.message }
            };
        }
        return {
            data: { shopId, activeTicket, seats, tableNumber, startTime },
            errors: { internal: "An error occurred. Please try again later." }
        };
    }
}
