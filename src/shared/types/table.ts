import { z } from "zod";
import { Shop } from "./shop";

// Table Type Definition
export type Table = {
    id: number;
    shopId: string; // Foreign key reference to Shop
    startTime: string;
    seats: number;
    activeTicket: string;
    tableNumber: number;
    createdAt: string;
    updatedAt: string;
};

// Zod Schema for Table Validation
export const CreateTableSchema = z.object({
    shopId: z.string().min(1, { message: "Shop ID is required." }),
    activeTicket: z.string().min(1, { message: "Active ticket is required." }),
    seats: z.number().min(1, { message: "Seats must be at least 1." }),
    tableNumber: z.number().min(1, { message: "Table number must be unique and at least 1." }),
    startTime: z.string().min(1, { message: "Start time is required." }),
});

// Infer Type from Zod Schema
export type TCreateTable = z.infer<typeof CreateTableSchema>;

// Table Props for Components
export interface TableProps {
    Tables: Table;
    onClick?: (id: number, event?: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => void;
    isActive?: boolean;
}
