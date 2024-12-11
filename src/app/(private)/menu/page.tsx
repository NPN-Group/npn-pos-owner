"use client";
import { MainLayout } from "@/shared/components";
import LocalDiningRoundedIcon from "@mui/icons-material/LocalDiningRounded";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
} from "@mui/material";
import React, { useState } from "react";

type FoodItem = {
  name: string;
  img: string | null;
  price: string;
  description: string;
};

type Category = {
  name: string;
  foods: FoodItem[];
};

const catagory = [
  {
    name: "Main course",
    foods: [
      {
        name: "Steak",
        img: "https://www.seriouseats.com/thmb/-KA2hwMofR2okTRndfsKtapFG4Q=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__recipes__images__2015__05__Anova-Steak-Guide-Sous-Vide-Photos15-beauty-159b7038c56a4e7685b57f478ca3e4c8.jpg",
        price: "$25",
        description: "Grilled steak with vegetables and sauce.",
      },
      {
        name: "Pasta",
        img: "https://www.allrecipes.com/thmb/mvO1mRRH1zTz1SvbwBCTz78CRJI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/67700_RichPastaforthePoorKitchen_ddmfs_4x3_2284-220302ec8328442096df370dede357d7.jpg",
        price: "$15",
        description: "Creamy Alfredo pasta with chicken.",
      },
    ],
  },
  {
    name: "Appetizers",
    foods: [
      {
        name: "Spring Rolls",
        img: "https://zenaskitchen.com/wp-content/uploads/2022/02/Pork-Vegetable-Spring-Rolls.jpg",
        price: "$8",
        description: "Crispy spring rolls with sweet chili sauce.",
      },
      {
        name: "Garlic Bread",
        img: "https://www.allrecipes.com/thmb/JPYAOXw7_0SBDpxAEaHxAGpxbe0=/0x512/filters:no_upscale():max_bytes(150000):strip_icc()/21080-great-garlic-bread-DDMFS-4x3-e1c7b5c79fde4d629a9b7bce6c0702ed.jpg",
        price: "$6",
        description: "Toasted garlic bread with herbs.",
      },
    ],
  },
  {
    name: "Beverages",
    foods: [
      {
        name: "Lemonade",
        img: "https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_1:1/k%2Farchive%2Fbcbceed90d40c95acd29cf8295f6fda017ba9887",
        price: "$4",
        description: "Freshly squeezed lemonade.",
      },
      {
        name: "Coffee",
        img: "https://thumbs.dreamstime.com/b/cup-cofee-20825194.jpg",
        price: "$3",
        description: "Hot brewed coffee.",
      },
      {
        name: "Tea",
        img: "https://www.aicr.org/wp-content/uploads/2020/06/peppermint-tea-on-teacup-1417945.jpg",
        price: "$2",
        description: "Refreshing green tea.",
      },
    ],
  },
  {
    name: "Desserts",
    foods: [
      {
        name: "Ice Cream",
        img: "https://www.allrecipes.com/thmb/SI6dn__pfJb9G5eBpYAqkyGCLxQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/50050-five-minute-ice-cream-DDMFS-4x3-076-fbf49ca6248e4dceb3f43a4f02823dd9.jpg",
        price: "$5",
        description: "Vanilla ice cream with chocolate syrup.",
      },
      {
        name: "Cake",
        img: "https://sugargeekshow.com/wp-content/uploads/2023/10/easy_chocolate_cake_slice.jpg",
        price: "$7",
        description: "Moist chocolate cake with frosting.",
      },
    ],
  },
];

type NewFood = {
  name: string;
  img: File | null;
  category: string;
  price: string | number;
  description: string;
};

export default function MenuPage(): JSX.Element {
  const [isCategoryModalOpen, setCategoryModalOpen] = useState<boolean>(false);
  const [isFoodModalOpen, setFoodModalOpen] = useState<boolean>(false);
  const [newCategoryName, setNewCategoryName] = useState<string>("");
  const [editingFood, setEditingFood] = useState<FoodItem | null>(null);
  const [newFood, setNewFood] = useState<NewFood>({
    name: "",
    img: null,
    category: "",
    price: "",
    description: "",
  });

  const handleOpenFoodModal = (food?: FoodItem): void => {
    if (food) {
      // Edit existing food
      setEditingFood(food);
      setNewFood({
        name: food.name,
        img: null,
        category: catagory.find((cat) =>
          cat.foods.find((f) => f.name === food.name)
        )?.name || "",
        price: food.price.replace("$", ""),
        description: food.description,
      });
    } else {
      // Add new food
      setEditingFood(null);
      setNewFood({
        name: "",
        img: null,
        category: "",
        price: "",
        description: "",
      });
    }
    setFoodModalOpen(true);
  };

  const handleCloseFoodModal = (): void => {
    setEditingFood(null);
    setFoodModalOpen(false);
  };

  const handleSaveFood = () => {
    if (validateFields()) {
      if (editingFood) {
        console.log("Food Edited:", newFood);
      } else {
        console.log("New Food Added:", newFood);
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
      category: newFood.category === "",
      price: newFood.price === "",
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
    <MainLayout className="flex-1 p-4 overflow-y-auto">
      <div className="flex gap-4 text-lg">
        <LocalDiningRoundedIcon />
        <div className="font-medium">Shop Name</div>
      </div>

      <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2 lg:grid-cols-3">
        {catagory.map((item) => (
          <div key={item.name} className="bg-white shadow-md rounded-lg p-4">
            <div className="flex justify-between">
              <div className="text-lg font-semibold">{item.name}</div>
            </div>
            <div key={item.name} className="grid grid-cols-1 gap-4 mt-4">
              {item.foods.map((food) => (
                <div
                className="flex gap-4 cursor-pointer"
                onClick={() => {
                  handleOpenFoodModal(food); // Pass the food item to the function
                }}
              >
                  <img
                    src={food.img || ""}
                    alt={food.name}
                    className="w-24 h-24 object-cover rounded-lg transition-all duration-150 ease-in-out hover:scale-110 hover:border-2 hover:border-[#F5533D]"
                  />
                  <div>
                    <div className="text-lg font-semibold">{food.name}</div>
                    <div className="text-sm text-gray-500">
                      {food.description}
                    </div>
                    <div className="text-lg font-semibold">{food.price}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-4">
              <div className="m-8 cursor-pointer" 
              onClick={() => handleOpenFoodModal()}
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

      <Dialog
        open={isCategoryModalOpen}
        onClose={handleCloseCategoryModal}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Add New Category</DialogTitle>
        <DialogContent>
          <TextField
            size="small"
            autoFocus
            margin="dense"
            label="Category Name"
            type="text"
            fullWidth
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            InputLabelProps={{
              style: { color: "grey" },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#F5533D" },
                "&:hover fieldset": { borderColor: "#F5533D" },
                "&.Mui-focused fieldset": { borderColor: "#F5533D" },
              },
            }}
          />
          <div className="flex justify-end mt-4">
            <Button onClick={handleCloseCategoryModal} color="error">
              Cancel
            </Button>
            <Button
              onClick={handleAddCategory}
              variant="contained"
              sx={{
                backgroundColor: "#F5533D",
                "&:hover": {
                  backgroundColor: "#D24434",
                },
              }}
            >
              Add
            </Button>
          </div>
        </DialogContent>
      </Dialog>

       {/* Add/Edit Food Modal */}
       <Dialog
        open={isFoodModalOpen}
        onClose={handleCloseFoodModal}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          {editingFood ? "Edit Food Item" : "Add New Food"}
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
          <div className="flex justify-end mt-4">
            <Button onClick={handleCloseFoodModal} color="error">
              Cancel
            </Button>
            <Button
              onClick={handleSaveFood}
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
    </MainLayout>
  );
}
