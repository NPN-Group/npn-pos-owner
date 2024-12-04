'use client'
import { MainLayout } from "@/shared/components";
import  Tablecomponent  from '@/shared/components/Table';
import {Table,TableProps} from '@/shared/types/table.type';
import TableRestaurantOutlinedIcon from '@mui/icons-material/TableRestaurantOutlined';

import {useState,useEffect} from 'react';
import TableInformation from "@/shared/components/TableInformation";
import { ClassNames } from "@emotion/react";
export default function Menu() {
    const [activeId, setActiveId] = useState<number | null>(null);
    const tables = [
        { id: 1, startTime: '10:00 AM', quantity: 4 },
        { id: 2, startTime: '11:00 AM', quantity: 3 },
        { id: 3, startTime: '12:00 PM', quantity: 5 },
        { id: 4, startTime: '12:00 PM', quantity: 5 },
        { id: 5, startTime: '12:00 PM', quantity: 5 },
        { id: 6, startTime: '12:00 PM', quantity: 5 },
        { id: 7, startTime: '12:00 PM', quantity: 5 },
        { id: 8, startTime: '12:00 PM', quantity: 5 },
        { id: 9, startTime: '12:00 PM', quantity: 5 },
        { id: 10, startTime: '12:00 PM', quantity: 5 },
        { id: 11, startTime: '12:00 PM', quantity: 5 },
        { id: 12, startTime: '12:00 PM', quantity: 5 },

      ];
      const renderOnlyTable = () => {
        return <div className='grid grid-cols-3 grid-flow-row pr-20 pl-40'>
                
                    {tables.map((table) => (
                        <Tablecomponent
                        key={table.id}
                        Tables={table}
                        isActive={activeId === table.id} // Check if this component is active
                        onClick={handleTableClick} // Pass the click handler
                        />
                ))}
        </div>;
      }
      const renderWithInformation = (id: number) => {
        return (
          <div className="relative ">
            {/* Grid of Tables */}
            <div className="grid grid-cols-3 grid-flow-row gap-0 w-[800px]">
              {tables.map((table) => (
                <Tablecomponent
                  key={table.id}
                  Tables={table}
                  isActive={activeId === table.id} // Check if this component is active
                  onClick={handleTableClick} // Pass the click handler
                />
              ))}
            </div>
      
            {/* Detailed Table Information */}
            <div className="absolute top-1/2 right-20 transform -translate-y-1/2">
              <TableInformation Tables={tables[id-1] }  onClick={handleTableClick}/>
            </div>
          </div>
        );
      };
      
      const handleTableClick = (id: number) => {
        setActiveId((prev) => (prev === id ? null : id)); // Toggle active state
      };
    useEffect(() =>{

        console.log(activeId);
    },[activeId]);
    return (
        <MainLayout className="flex-1 p-4 overflow-y-auto">
            <div className="flex justify-start gap- px-5">
                <TableRestaurantOutlinedIcon className="text-[30px]" />
                <div className='text-[20px] font-semibold'> Table Layout</div>
            </div>
            {activeId === null ? renderOnlyTable() : renderWithInformation(activeId)}
                
        </MainLayout>
    )
}
