import { z } from "zod";

export type Food = {
  id: string;
  shop: string;
  name: string;
  price: number;
  description: string | null;
  img: string | null;
  category: string | null;
  status: FoodStatus;
  createdAt: string;
  updatedAt: string;
}

export enum FoodStatus {
  ACTIVE = "Active",
  INACTIVE = "Inactive",
}

export const CreateFoodSchema = z.object({
  name: z
    .string({
      message: "Name must be a string",
    })
    .min(1, {
      message: "Name is required",
    }),
  price: z
    .number({
      message: "Price must be a number",
    })
    .min(1, {
      message: "Price must be at least 1",
    }),
  description: z
    .string({
      message: "Description must be a string",
    })
    .optional()
    .nullable(),
  category: z
    .string({
      message: "Category must be a string",
    })
    .optional()
    .nullable(),
  img: z
    .union([
      z.string({
        message: "Image must be a string",
      }),
      z.instanceof(File, {
        message: "Image must be a File",
      }),
    ])
    .optional()
    .nullable(),
  shop: z.string({
    message: "Shop must be a string",
  }),
});

export type TCreateFood = z.infer<typeof CreateFoodSchema>;