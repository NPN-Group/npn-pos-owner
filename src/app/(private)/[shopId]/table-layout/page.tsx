"use client";
import { useState } from "react";
import TableRestaurantOutlinedIcon from "@mui/icons-material/TableRestaurantOutlined";
import { Popover, Backdrop } from "@mui/material";
import { Table, TableInformation } from "@/shared/components";

export default function Menu() {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [anchorPosition, setAnchorPosition] = useState<{ top: number; left: number } | null>(null);

  const tables = [
    { id: 1, startTime: "10:00 AM", quantity: 4 },
    { id: 2, startTime: "11:00 AM", quantity: 3 },
    { id: 3, startTime: "12:00 PM", quantity: 5 },
    { id: 4, startTime: "12:00 PM", quantity: 5 },
    { id: 5, startTime: "12:00 PM", quantity: 5 },
    { id: 6, startTime: "12:00 PM", quantity: 5 },
    { id: 7, startTime: "12:00 PM", quantity: 5 },
    { id: 8, startTime: "12:00 PM", quantity: 5 },
    { id: 9, startTime: "12:00 PM", quantity: 5 },
    { id: 10, startTime: "12:00 PM", quantity: 5 },
    { id: 11, startTime: "12:00 PM", quantity: 5 },
    { id: 12, startTime: "12:00 PM", quantity: 5 },
  ];

  const handleTableClick = (id: number, event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation(); // Prevent event bubbling
    event.preventDefault(); // Prevent default browser behavior
    setActiveId(id);
    const { clientX, clientY } = event;
    setAnchorPosition({ top: clientY, left: clientX });
  };

  const handleClose = () => {
    setActiveId(null);
    setAnchorPosition(null);
  };

  const renderOnlyTable = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-flow-row pr-20 pl-40">
        {tables.map((table) => (
          <Table
            key={table.id}
            Tables={table}
            isActive={activeId === table.id}
            onClick={(id, event) => handleTableClick(id, event)} // Pass both id and event
          />
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="flex justify-start gap- px-5">
        <TableRestaurantOutlinedIcon className="text-[30px]" />
        <div className="text-[20px] font-semibold">Table Layout</div>
      </div>
      {renderOnlyTable()}
      {activeId !== null && (
        <Backdrop
          open={activeId !== null}
          onClick={handleClose}
          style={{ zIndex: 1000, backdropFilter: "blur(8px)" }}
        >
          <Popover
            open={Boolean(anchorPosition)}
            anchorReference="anchorPosition"
            anchorPosition={anchorPosition || { top: 0, left: 0 }}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "center",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "center",
              horizontal: "center",
            }}
            PaperProps={{
              style: {
                zIndex: 1100,
              },
            }}
          >
            {activeId !== null && (
              <div className="p-4">
                <TableInformation Tables={tables[activeId - 1]} onClick={handleClose} />
              </div>
            )}
          </Popover>
        </Backdrop>
      )}
    </>
  );
}
