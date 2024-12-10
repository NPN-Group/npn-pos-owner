'use client'
import React from 'react'
import {useState} from 'react'
import {Table,TableProps} from '../types/table'
const Tablecomponent: React.FC<TableProps> = ({Tables, isActive, onClick}) => {

  return (
    <div className='h-[150px] w-[150px] flex flex-col items-center group'>
        <div className="h-[150px] w-[150px] rounded-full flex items-center justify-center text-white text-lg  ">
        <div
        className={`relative w-[105px] h-[105px] bg-cover bg-center rounded-full border-2 transition-all duration-300 hover:cursor-pointer ${
            isActive
              ? "border-red-500"
              : "group-hover:border-[#ffa603]  border-black" 
          }`}
    style={{ 
        backgroundImage: isActive ? "url('/assets/table_click.png')" 
                                   : "url('/assets/table.png')" }}
                                   onClick={() => onClick?.(Tables.id)}>
    {/* Hover Background */}
    <div 
      className="absolute inset-0 bg-cover bg-center rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100" 
      style={{ 
        backgroundImage: isActive ? "url('/assets/table_click.png')" 
                                   : "url('/assets/table_hover.png')" }}
    >
    </div>
    
    {/* Centered Text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-black text-lg font-bold px-4 py-1 rounded text-[16px] bg-white bg-opacity-80">
            {Tables.id}
          </p>
        </div>
      </div>
    </div>
    <div className={`font-semibold ${isActive
              ? "text-red-500"
              : "group-hover:text-[#ffa603]"}`}>seats : {Tables.quantity}</div>
  </div>
  )
}
export default Tablecomponent
