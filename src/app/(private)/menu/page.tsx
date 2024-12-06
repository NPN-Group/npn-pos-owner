import { MainLayout } from "@/shared/components";
import LocalDiningRoundedIcon from "@mui/icons-material/LocalDiningRounded";
import EditNoteIcon from "@mui/icons-material/EditNote";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import React from "react";

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

export default function MenuPage() {
  return (
    <MainLayout className="flex-1 p-4 overflow-y-auto">
      <div className="flex gap-4 text-lg ">
        <LocalDiningRoundedIcon />
        <div className="font-medium">Shop Name</div>
      </div>

      <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2 lg:grid-cols-3">
        {catagory.map((item) => (
          <div key={item.name} className="bg-white shadow-md rounded-lg p-4">
            <div className="flex justify-between">
              <div className="text-lg font-semibold">{item.name}</div>
            </div>
            <div className="grid grid-cols-1 gap-4 mt-4">
              {item.foods.map((food) => (
                <div key={food.name} className="flex gap-4">
                  <img
                    src={food.img}
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
                <div className="m-8 ">
                    <AddCircleOutlineIcon className="w-8 h-8 object-cover rounded-lg text-sm text-[#F5533D] transition-transform duration-300 ease-in-out hover:scale-125"                    />
                </div>
                
              <div className="flex justify-center items-center ">
                <div className="text-lg font-normal text-slate-500">Add new Food</div>
              </div>
            </div>
          </div>

        ))}
    
        <div className="shadow-md rounded-lg p-4 flex flex-col justify-center items-center">
            <AddCircleOutlineIcon className="w-16 h-16 text-[#F5533D] transition-transform duration-300 ease-in-out hover:scale-125" />
            <div className="mt-4 text-lg font-medium text-gray-700">Add New Category</div>
        </div>
      </div>
    </MainLayout>
  );
}
