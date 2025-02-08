"use client";
import { TableProps } from "@/shared/types";

export default function Table({ Tables, isActive, onClick }: TableProps) {
  return (
    <div className="h-[150px] w-[150px] flex flex-col items-center group relative">
      {/* Table Image (Only this triggers the modal) */}
      <div
        className="h-[150px] w-[150px] rounded-full flex items-center justify-center text-white text-lg"
        onClick={(e) => {
          e.stopPropagation(); // Ensure only clicking here triggers the modal
          onClick?.(Tables.tableNumber, e);
        }}
      >
        <div
          className={`relative w-[105px] h-[105px] bg-cover bg-center rounded-full border-2 transition-all duration-300 hover:cursor-pointer ${
            isActive ? "border-red-500" : "group-hover:border-[#ffa603] border-black"
          }`}
          style={{
            backgroundImage: isActive
              ? "url('/assets/table_click.png')"
              : "url('/assets/table.png')",
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-black text-lg font-bold px-4 py-1 rounded text-[16px] bg-white bg-opacity-80">
              {Tables.tableNumber}
            </p>
          </div>
        </div>
      </div>

      {/* Seat Count (Only this triggers the modal) */}
      <div
        className={`font-semibold cursor-pointer ${
          isActive ? "text-red-500" : "group-hover:text-[#ffa603]"
        }`}
        onClick={(e) => {
          e.stopPropagation(); // Ensure only clicking here triggers the modal
          onClick?.(Tables.tableNumber, e);
        }}
      >
        seats : {Tables.seats}
      </div>
    </div>
  );
}
