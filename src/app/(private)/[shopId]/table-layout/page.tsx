"use client";
import { useState } from "react";
import TableRestaurantOutlinedIcon from "@mui/icons-material/TableRestaurantOutlined";
import { Popover, Backdrop } from "@mui/material";
import Table from "@/shared/components/Table";
import TableInformation from "@/shared/components/TableInformation";

export default function Menu() {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [anchorPosition, setAnchorPosition] = useState<{ top: number; left: number } | null>(null);

  // Initialize 12 tables with default data
  const [tables, setTables] = useState(
    Array.from({ length: 12 }, (_, index) => ({
      id: index + 1,
      startTime: "Not Reserved", // Default start time
      quantity: 0, // Default number of seats
    }))
  );

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
          <div
            key={table.id}
            onClick={(e) => handleTableClick(table.id, e)} // Pass ID and event
            style={{ cursor: "pointer" }}
          >
            <Table
              Tables={table}
              isActive={activeId === table.id}
              onClick={(id, event) => handleTableClick(id, event)} // Pass both ID and event
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="flex justify-start gap-2 px-5">
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
