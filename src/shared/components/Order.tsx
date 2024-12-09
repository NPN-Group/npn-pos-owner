import React from 'react'
import { Orders,OrderProps,Menu } from '../types/order'
import Dropdown from './DropDown';
interface MenucomponentProps {
    menus:Menu;
}
export const MenuComponent: React.FC<MenucomponentProps> = ({ menus }) => {
    return (
        <div className='flex justify-between items-center my-3'>
            <div className='flex justify-start gap-2 '>
                <div className="w-[125px] h-[80px] bg-gray-200">
                    <img className="w-full h-full " src={menus.image} alt="Menu" />
                </div>

                <div className='flex flex-col justify-between'>
                    <div className='font-semibold'>{menus.name}</div>
                    <div className='bg-[#f8543c] w-fit p-1 rounded-lg text-white'>${menus.pricePerMenu}</div>
                </div>
            </div>
            <div className='font-semibold'>x {menus.quantity}</div>
        </div>
    );
}
const Order:React.FC<OrderProps> = ({Orders,tableId}) => {
    return (
        <div className=' min-w-[400px] ml-10 h-[500px] overflow-scroll pr-10 shadow-md mt-5 '>
            <div className=' flex justify-between pb-5' >
                <div className='flex justify-start gap-2 '>
                    <div className='flex flex-col items-center font-semibold bg-[#f8543c] py-2 px-1 text-white'>
                        <div>Table No.</div>
                        <div>{tableId}</div>
                    </div>
                    <div>
                        <div className='font-semibold'>
                            <div>Order ID: {Orders.id}</div>
                            <div>{Orders.timeStamp}</div>
                        </div>
                    </div>
                </div>
                <Dropdown />
            </div>
            <hr className='border-dashed border-[1.5px] border-black'/>
            {Orders.menus.map((menu, index) => (
                <MenuComponent key={index} menus={menu} />
            ))}
        </div>
    )
}
export default Order