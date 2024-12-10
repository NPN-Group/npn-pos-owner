'use client'
import React from 'react'
import { MainLayout } from "@/shared/components";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Bill from '@/shared/components/Bill'
import { Receipt,ReceiptProps } from '@/shared/types/receipt';
import PaymentMethod from '@/shared/components/PaymentMethod';
import { useState,useEffect } from 'react';
function page() {
    const mockReceipt: Receipt = {
        ticketId: 'TICKET12345',
        date: '2024-12-09',
        menus: [
          {
            name: 'Cheeseburger',
            image: 'https://via.placeholder.com/100x100?text=Cheeseburger',
            pricePerMenu: 8.99,
            quantity: 2,
          },
          {
            name: 'Pizza Margherita',
            image: 'https://via.placeholder.com/100x100?text=Pizza+Margherita',
            pricePerMenu: 12.5,
            quantity: 1,
          },
          {
            name: 'Caesar Salad',
            image: 'https://via.placeholder.com/100x100?text=Caesar+Salad',
            pricePerMenu: 9.75,
            quantity: 3,
          },
          {
            name: 'Spaghetti Carbonara',
            image: 'https://via.placeholder.com/100x100?text=Spaghetti+Carbonara',
            pricePerMenu: 14.2,
            quantity: 1,
          },
          {
            name: 'Grilled Salmon',
            image: 'https://via.placeholder.com/100x100?text=Grilled+Salmon',
            pricePerMenu: 17.3,
            quantity: 2,
          },
          {
            name: 'French Fries',
            image: 'https://via.placeholder.com/100x100?text=French+Fries',
            pricePerMenu: 4.99,
            quantity: 3,
          },
          {
            name: 'Chicken Wings',
            image: 'https://via.placeholder.com/100x100?text=Chicken+Wings',
            pricePerMenu: 10.5,
            quantity: 2,
          },
          {
            name: 'Chocolate Cake',
            image: 'https://via.placeholder.com/100x100?text=Chocolate+Cake',
            pricePerMenu: 6.75,
            quantity: 1,
          },
          {
            name: 'Latte',
            image: 'https://via.placeholder.com/100x100?text=Latte',
            pricePerMenu: 5.0,
            quantity: 2,
          },
          {
            name: 'Iced Tea',
            image: 'https://via.placeholder.com/100x100?text=Iced+Tea',
            pricePerMenu: 3.5,
            quantity: 4,
          },
          {
            name: 'Iced Tea',
            image: 'https://via.placeholder.com/100x100?text=Iced+Tea',
            pricePerMenu: 3.5,
            quantity: 4,
          },
          {
            name: 'Iced Tea',
            image: 'https://via.placeholder.com/100x100?text=Iced+Tea',
            pricePerMenu: 3.5,
            quantity: 4,
          },
          {
            name: 'Iced Tea',
            image: 'https://via.placeholder.com/100x100?text=Iced+Tea',
            pricePerMenu: 3.5,
            quantity: 4,
          },
        ],
      };
      const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    const total = mockReceipt.menus.reduce(
      (sum, menu) => sum + menu.pricePerMenu * menu.quantity,
      0
    );
    setTotalPrice(total);
  }, [mockReceipt.menus]);
  return (
    <MainLayout className='flex-1 w-full overflow-y-auto max-w-[105rem] mx-auto '>
        <div className='flex flex-start gap-2 font-semibold pl-2 pt-3'>
            <ArrowBackIosNewIcon/>
            <div>Payment</div>
        </div>
        <div className='flex justify-around relative min-w-[1100px] mx-auto items-center'>
            <Bill receipt={mockReceipt}/>
            <PaymentMethod totalPrice = {totalPrice}/>
        </div>
    </MainLayout> 
  )
}

export default page