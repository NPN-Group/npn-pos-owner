import React from 'react'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import TimerSharpIcon from '@mui/icons-material/TimerSharp';
import GroupsSharpIcon from '@mui/icons-material/GroupsSharp';
import {Table, TableProps} from '../types/table.type';
const TableInformation:React.FC<TableProps> = ({Tables,onClick}) =>{
    const ExitButton = () => {
        console.log("exit");
    }
    const MergeTables = () => {
        console.log("merge")
    }
    const MoveTables = () => {
        console.log("move")
    }
    const GenerateOrder = () => {
        console.log("order")
    }
    const Paymentbill = () => {
        console.log("payment")
    }
  return (
    <div className='w-[350px] h-[350px] bg-[#f6b45e] pt-1 px-2 rounded-[5%] border-2 border-[#F5533D]'>
        <div className='flex justify-between'>
            <div className='text-[30px] font-semibold'>โต๊ะ {Tables.id}</div>
            <CloseRoundedIcon className='text-[40px] hover:cursor-pointer' onClick={() => onClick?.(Tables.id)}/>
        </div>
        <div className='flex justify-start gap-1 pb-5'>
            <TimerSharpIcon />
            <div>{Tables.startTime}</div>
            <GroupsSharpIcon />
            <div>{Tables.quantity}</div>
        </div>
        <div className='flex flex-col items-center'>
            <div className='flex justify-around gap-5 py-5'>
                <div className='border-[#F5533D] border-2 p-2 bg-white rounded-3xl text-[20px] font-semibold hover:cursor-pointer hover:text-[#f6b45e]' onClick = {() => MergeTables()}>รวมโต๊ะ</div>
                <div className='border-[#F5533D] border-2 p-2 bg-white rounded-3xl text-[20px] font-semibold hover:cursor-pointer hover:text-[#f6b45e]' onClick = {() => MoveTables()}>ย้ายโต๊ะ</div>
            </div>
            <div className='border-[#F5533D] border-2 p-2 bg-white rounded-3xl text-[20px] font-semibold hover:cursor-pointer hover:text-[#f6b45e]' onClick = {() => GenerateOrder()}>พิมพ์ใบออร์เดอร์</div>
            <div className='gap-5 p-2 my-5 border-black border-2 bg-[#f8543c] rounded-3xl text-white text-[20px] font-semibold hover:cursor-pointer hover:text-[#f6b45e]' onClick = {() => Paymentbill()}>ชำระเงิน</div>
        </div>
    </div>
  )
}

export default TableInformation