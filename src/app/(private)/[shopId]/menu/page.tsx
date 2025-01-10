"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import LocalDiningRoundedIcon from "@mui/icons-material/LocalDiningRounded";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
} from "@mui/material";
import { Food, TCreateFood } from "@/shared/types";
import { createFood, getFoods } from "@/shared/services";
import Image from "next/image";
import { number } from "zod";

type Category = {
  name: string;
  foods: Food[];
};

type NewFood = {
  name: string;
  img: File | null;
  category: string;
  price: string | number;
  description: string;
};

export default function MenuPage() {
  const pathname = usePathname();
  const shopId = pathname.split("/")[1];
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isCategoryModalOpen, setCategoryModalOpen] = useState<boolean>(false);
  const [isFoodModalOpen, setFoodModalOpen] = useState<boolean>(false);
  const [newCategoryName, setNewCategoryName] = useState<string>("");
  const [editingFood, setEditingFood] = useState<Food | null>(null);
  const [newFood, setNewFood] = useState<TCreateFood>({
    name: "",
    img: null,
    category: "",
    price: 0,
    description: "",
    shop: shopId,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await getFoods(shopId);
        const foods = response.data ?? [];

        const groupedCategories: Category[] = foods.reduce((acc, food) => {
          const categoryName = food.category || "Other";
          const category = acc.find((cat) => cat.name === categoryName);

          if (category) {
            category.foods.push(food);
          } else {
            acc.push({
              name: categoryName,
              foods: [food],
            });
          }

          return acc;
        }, [] as Category[]);

        setCategories(groupedCategories);
      } catch (error) {
        console.error("Error fetching foods:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (shopId) fetchData();
  }, [shopId]);

  const handleOpenFoodModal = (food?: Food, categoryName?: string): void => {
    setSelectedCategory(categoryName || null);
  
    if (food) {
      setEditingFood(food);
      setNewFood({
        name: food.name,
        img: null,
        category: food.category || "Uncategorized",
        price: food.price,
        description: food.description || "",
        shop: shopId,
      });
    } else {
      setEditingFood(null);
      setNewFood({
        name: "",
        img: null,
        category: categoryName || "",
        price: 0,
        description: "",
        shop: shopId,
      });
    }
    setFoodModalOpen(true);
  };
  

  const handleCloseFoodModal = (): void => {
    setEditingFood(null);
    setFoodModalOpen(false);
  };

  const handleSaveFood = async () => {
    if (validateFields()) {
      try {
        const formData = new FormData();
        formData.append("name", newFood.name);
  
        const price = newFood.price || 0;
        formData.append("price", price.toString());
  
        formData.append("description", newFood.description || "");
        formData.append("category", newFood.category || "");
        formData.append("shop", newFood.shop);
  
        if (newFood.img instanceof File) {
          formData.append("food-img", newFood.img);
        }
  
        const response = await createFood({
          name: newFood.name,
          price: price,
          description: newFood.description,
          category: newFood.category,
          img: newFood.img,
          shop: newFood.shop,
        });
  
        if (response.statusCode === 200 && response.data) {
          const addedFood = response.data;
  
          setCategories((prevCategories) => {
            const updatedCategories = [...prevCategories];
            const categoryIndex = updatedCategories.findIndex(
              (cat) => cat.name === addedFood.category
            );
  
            if (categoryIndex !== -1) {
              // Check if the food already exists to avoid duplication
              const existingFoodIndex = updatedCategories[categoryIndex].foods.findIndex(
                (food) => food.name === addedFood.name && food.price === addedFood.price
              );
  
              if (existingFoodIndex === -1) {
                updatedCategories[categoryIndex].foods.push(addedFood);
              }
            } else {
              // Add a new category with the new food
              updatedCategories.push({
                name: addedFood.category || "Other",
                foods: [addedFood],
              });
            }
  
            return updatedCategories;
          });
  
          console.log("Food added successfully:", addedFood);
        } else {
          console.error("Error adding food:", response.message);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
      handleCloseFoodModal();
    }
  };
  
  

  const [errors, setErrors] = useState({
    name: false,
    category: false,
    price: false,
  });

  const validateFields = () => {
    const newErrors = {
      name: newFood.name.trim() === "",
      category: !newFood.category || newFood.category.trim() === "",
      price: newFood.price === null || newFood.price === undefined || newFood.price <= 0, // Validate number
    };
    setErrors(newErrors);
    return !Object.values(newErrors).includes(true);
  };
  

  const handleOpenCategoryModal = (): void => setCategoryModalOpen(true);
  const handleCloseCategoryModal = (): void => setCategoryModalOpen(false);

  const handleAddCategory = (): void => {
    if (newCategoryName.trim() !== "") {
      console.log("New Category Added:", newCategoryName);
      setNewCategoryName("");
      handleCloseCategoryModal();
    }
  };

  return (
    <>
      <div className="flex gap-4 text-lg">
        <LocalDiningRoundedIcon />
        <div className="font-medium">Shop Menu</div>
      </div>

      {isLoading ? (
        <div className="text-center mt-4">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((item, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-4">
              <div className="text-lg font-semibold">{item.name}</div>
              <div className="grid grid-cols-1 gap-4 mt-4">
                {item.foods.map((food, foodIndex) => (
                  <div key={foodIndex} className="flex gap-4">
                    {food.img ? (
                      <Image
                        src={`${process.env.NEXT_PUBLIC_ENV}/uploads/${food.img}`}
                        alt={food.name}
                        width={100}
                        height={100}
                        className="w-24 h-24 object-cover rounded-lg transition-all duration-150 ease-in-out hover:scale-110 hover:border-2 hover:border-[#F5533D]"
                      />
                    ) : (
                      <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
                        No Image
                      </div>
                    )}

                    <div>
                      <div className="text-lg font-semibold">{food.name}</div>
                      <div className="text-sm text-gray-500">
                        {food.description || "No description available"}
                      </div>
                      <div className="text-lg font-semibold">${food.price}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-4">
                <div
                  className="m-8 cursor-pointer"
                  onClick={() => handleOpenFoodModal(undefined, item.name)}
                >
                  <AddCircleOutlineIcon className="w-8 h-8 object-cover rounded-lg text-sm text-[#F5533D] transition-transform duration-300 ease-in-out hover:scale-125" />
                </div>
                <div className="flex justify-center items-center">
                  <div className="text-lg font-normal text-slate-500">
                    Add new Food
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div
            className="shadow-md rounded-lg p-4 flex flex-col justify-center items-center cursor-pointer"
            onClick={handleOpenCategoryModal}
          >
            <AddCircleOutlineIcon className="w-16 h-16 text-[#F5533D] transition-transform duration-300 ease-in-out hover:scale-125" />
            <div className="mt-4 text-lg font-medium text-gray-700">
              Add New Category
            </div>
          </div>
        </div>
      )}

<Dialog
  open={isFoodModalOpen}
  onClose={handleCloseFoodModal}
  fullWidth
  maxWidth="sm"
>
  <DialogTitle>
  {editingFood
    ? `Edit Food Item in ${selectedCategory || "Uncategorized"}`
    : `Add New Food to ${selectedCategory || "Uncategorized"}`}
  </DialogTitle>
  <DialogContent>
    <TextField
      size="small"
      margin="dense"
      label="Name"
      type="text"
      fullWidth
      required
      value={newFood.name}
      onChange={(e) => setNewFood({ ...newFood, name: e.target.value })}
      error={errors.name}
      helperText={errors.name && "Name is required"}
      sx={{
        "& .MuiOutlinedInput-root": {
          "& fieldset": { borderColor: "#F5533D" },
          "&:hover fieldset": { borderColor: "#F5533D" },
          "&.Mui-focused fieldset": { borderColor: "#F5533D" },
        },
      }}
    />

    <TextField
      size="small"
      margin="dense"
      label="Price"
      type="number"
      fullWidth
      required
      value={newFood.price}
      onChange={(e) =>
        setNewFood({ ...newFood, price: parseInt(e.target.value, 10) })
      }
      error={errors.price}
      helperText={errors.price && "Price is required"}
      sx={{
        "& .MuiOutlinedInput-root": {
          "& fieldset": { borderColor: "#F5533D" },
          "&:hover fieldset": { borderColor: "#F5533D" },
          "&.Mui-focused fieldset": { borderColor: "#F5533D" },
        },
      }}
    />

    <TextField
      size="small"
      margin="dense"
      label="Description (Optional)"
      type="text"
      fullWidth
      multiline
      rows={3}
      value={newFood.description}
      onChange={(e) =>
        setNewFood({ ...newFood, description: e.target.value })
      }
      sx={{
        "& .MuiOutlinedInput-root": {
          "& fieldset": { borderColor: "#F5533D" },
          "&:hover fieldset": { borderColor: "#F5533D" },
          "&.Mui-focused fieldset": { borderColor: "#F5533D" },
        },
      }}
    />

<div className="mt-4">
  <label className="text-gray-700 text-sm font-medium mb-2 block">
    Upload Image
  </label>
  <Button
    variant="outlined"
    component="label"
    sx={{
      borderColor: "#F5533D",
      color: "#F5533D",
      textTransform: "none",
      "&:hover": {
        borderColor: "#D24434",
        color: "#D24434",
      },
    }}
  >
    Choose File
    <input
      type="file"
      accept="image/*"
      hidden
      onChange={(e) =>
        setNewFood({ ...newFood, img: e.target.files?.[0] || null })
      }
    />
  </Button>
  {newFood.img && (
    <div className="mt-2 text-sm text-gray-500">
      {newFood.img instanceof File
        ? `Selected: ${newFood.img.name}`
        : `Current: ${newFood.img}`}
    </div>
  )}
</div>


    <div className="flex justify-end mt-4">
      <Button onClick={handleCloseFoodModal} color="error">
        Cancel
      </Button>
      <Button
  onClick={() => {
    setNewFood((prev) => ({
      ...prev,
      category: selectedCategory || "",
    }));
    handleSaveFood();
  }}
  variant="contained"
  sx={{
    backgroundColor: "#F5533D",
    "&:hover": {
      backgroundColor: "#D24434",
    },
  }}
>
  {editingFood ? "Save Changes" : "Add"}
</Button>

    </div>
  </DialogContent>
</Dialog>

    </>
  );
}
