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
