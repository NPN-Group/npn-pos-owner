"use client";
import BorderAllRoundedIcon from '@mui/icons-material/BorderAllRounded';
import { useState } from 'react';
import { Order } from '@/shared/components';
import { Orders, Status } from "@/shared/types";
function page() {
  const [filtered, setfiltered] = useState<string | null>("ALL");
  const filteredOption = (filter: string) => {
    setfiltered(filter);
  }
  const mockOrders: Orders[] = [
    {
      id: "ORD001",
      menus: [
        {
          name: "Margherita Pizza",
          image: "https://www.foodandwine.com/thmb/4qg95tjf0mgdHqez5OLLYc0PNT4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg",
          pricePerMenu: 12.99,
          quantity: 2,
        },
        {
          name: "Caesar Salad",
          image: "https://www.foodandwine.com/thmb/4qg95tjf0mgdHqez5OLLYc0PNT4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg",
          pricePerMenu: 8.5,
          quantity: 1,
        },
        {
          name: "Garlic Bread",
          image: "https://www.foodandwine.com/thmb/4qg95tjf0mgdHqez5OLLYc0PNT4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg",
          pricePerMenu: 4.99,
          quantity: 3,
        },
        {
          name: "Tiramisu",
          image: "https://www.foodandwine.com/thmb/4qg95tjf0mgdHqez5OLLYc0PNT4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg",
          pricePerMenu: 6.99,
          quantity: 1,
        },
        {
          name: "Iced Tea",
          image: "https://www.foodandwine.com/thmb/4qg95tjf0mgdHqez5OLLYc0PNT4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg",
          pricePerMenu: 3.5,
          quantity: 2,
        },
      ],
      status: Status.READY,
      timeStamp: "2024-12-07T12:00:00Z",
    },
    {
      id: "ORD002",
      menus: [
        {
          name: "Spaghetti Bolognese",
          image: "https://www.foodandwine.com/thmb/4qg95tjf0mgdHqez5OLLYc0PNT4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg",
          pricePerMenu: 10.75,
          quantity: 3,
        },
        {
          name: "Minestrone Soup",
          image: "https://www.foodandwine.com/thmb/4qg95tjf0mgdHqez5OLLYc0PNT4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg",
          pricePerMenu: 6.5,
          quantity: 2,
        },
        {
          name: "Focaccia Bread",
          image: "https://www.foodandwine.com/thmb/4qg95tjf0mgdHqez5OLLYc0PNT4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg",
          pricePerMenu: 5.99,
          quantity: 1,
        },
        {
          name: "Panna Cotta",
          image: "https://www.foodandwine.com/thmb/4qg95tjf0mgdHqez5OLLYc0PNT4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg",
          pricePerMenu: 7.5,
          quantity: 1,
        },
        {
          name: "Espresso",
          image: "https://www.foodandwine.com/thmb/4qg95tjf0mgdHqez5OLLYc0PNT4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg",
          pricePerMenu: 2.99,
          quantity: 2,
        },
      ],
      status: Status.INPROCESS,
      timeStamp: "2024-12-07T12:15:00Z",
    },
    {
      id: "ORD003",
      menus: [
        {
          name: "Chicken Burger",
          image: "https://www.foodandwine.com/thmb/4qg95tjf0mgdHqez5OLLYc0PNT4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg",
          pricePerMenu: 9.99,
          quantity: 1,
        },
        {
          name: "French Fries",
          image: "https://www.foodandwine.com/thmb/4qg95tjf0mgdHqez5OLLYc0PNT4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg",
          pricePerMenu: 3.5,
          quantity: 2,
        },
        {
          name: "Chocolate Milkshake",
          image: "https://www.foodandwine.com/thmb/4qg95tjf0mgdHqez5OLLYc0PNT4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg",
          pricePerMenu: 4.99,
          quantity: 1,
        },
        {
          name: "Onion Rings",
          image: "https://www.foodandwine.com/thmb/4qg95tjf0mgdHqez5OLLYc0PNT4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg",
          pricePerMenu: 3.99,
          quantity: 3,
        },
        {
          name: "Coke",
          image: "https://www.foodandwine.com/thmb/4qg95tjf0mgdHqez5OLLYc0PNT4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg",
          pricePerMenu: 2.5,
          quantity: 2,
        },
      ],
      status: Status.CANCELLED,
      timeStamp: "2024-12-07T12:30:00Z",
    },
    {
      id: "ORD004",
      menus: [
        {
          name: "Grilled Salmon",
          image: "https://www.foodandwine.com/thmb/4qg95tjf0mgdHqez5OLLYc0PNT4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg",
          pricePerMenu: 18.99,
          quantity: 1,
        },
        {
          name: "Mixed Vegetables",
          image: "https://www.foodandwine.com/thmb/4qg95tjf0mgdHqez5OLLYc0PNT4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg",
          pricePerMenu: 6.5,
          quantity: 2,
        },
        {
          name: "Mashed Potatoes",
          image: "https://www.foodandwine.com/thmb/4qg95tjf0mgdHqez5OLLYc0PNT4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg",
          pricePerMenu: 5.99,
          quantity: 1,
        },
        {
          name: "Apple Pie",
          image: "https://www.foodandwine.com/thmb/4qg95tjf0mgdHqez5OLLYc0PNT4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg",
          pricePerMenu: 6.5,
          quantity: 1,
        },
        {
          name: "Lemonade",
          image: "https://www.foodandwine.com/thmb/4qg95tjf0mgdHqez5OLLYc0PNT4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg",
          pricePerMenu: 3.99,
          quantity: 1,
        },
      ],
      status: Status.COMPLETED,
      timeStamp: "2024-12-07T12:45:00Z",
    },
    ...Array.from({ length: 6 }, (_, idx) => ({
      id: `ORD00${idx + 5}`,
      menus: Array.from({ length: 5 }, (_, menuIdx) => ({
        name: `Menu Item ${menuIdx + 1}`,
        image: "https://www.foodandwine.com/thmb/4qg95tjf0mgdHqez5OLLYc0PNT4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg",
        pricePerMenu: (menuIdx + 1) * 5,
        quantity: (menuIdx % 3) + 1,
      })),
      status:
        idx % 4 === 0
          ? Status.READY
          : idx % 4 === 1
            ? Status.INPROCESS
            : idx % 4 === 2
              ? Status.CANCELLED
              : Status.COMPLETED,
      timeStamp: `2024-12-07T13:0${idx}Z`,
    })),
  ];

  return (
    <>
      <div className='flex justify-start gap-2 pl-2 pt-3 items-center '>
        <BorderAllRoundedIcon className='text-[30px]' />
        <div className='text-[25px] font-semibold'>ออเดอร์</div>
      </div>
      <div className='flex justify-start  pl-5 py-6 text-[20px]'>
        <div className={`px-2 py-2 hover:cursor-pointer ${filtered === "ALL" ? "bg-[#f8543c] text-white" : "bg-white"}`} onClick={() => { filteredOption("ALL") }}>ALL</div>
        <div className={` px-2 py-2 hover:cursor-pointer ${filtered === "In Process" ? "bg-[#f8543c] text-white" : "bg-white"}`} onClick={() => { filteredOption("In Process") }}>In Process</div>
        <div className={` px-2 py-2 hover:cursor-pointer ${filtered === "Completed" ? "bg-[#f8543c] text-white" : "bg-white"}`} onClick={() => { filteredOption("Completed") }}>Completed</div>
        <div className={` px-2 py-2 hover:cursor-pointer ${filtered === "Cancelled" ? "bg-[#f8543c] text-white" : "bg-white"}`} onClick={() => { filteredOption("Cancelled") }}>Cancelled</div>
      </div>

      <div className="grid  grid-cols-1 lg:grid-cols-2">
        {mockOrders.map((order, index) => (
          <Order key={order.id} Orders={order} tableId={index + 1} />
        ))}
      </div>
    </>
  )
}

export default page