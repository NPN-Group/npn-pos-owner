"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import TableRestaurantOutlinedIcon from "@mui/icons-material/TableRestaurantOutlined";
import { Popover, Backdrop, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import Table from "@/shared/components/Table";
import TableInformation from "@/shared/components/TableInformation";
import { Table as TableType } from "@/shared/types";
import { getTables, createTable, getTable } from "@/shared/services"; // ✅ Import createTable

export default function Menu() {
  const pathname = usePathname();
  const shopId = pathname.split("/")[1]; // Extract shopId from URL
  const [tables, setTables] = useState<TableType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTable, setActiveTable] = useState<TableType | null>(null);
  const [anchorPosition, setAnchorPosition] = useState<{ top: number; left: number } | null>(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [newTableNumber, setNewTableNumber] = useState("");
  const [newSeats, setNewSeats] = useState("");

  // Fetch tables data
  const fetchTables = async () => {
    setLoading(true);
    try {
      const response = await getTables(shopId); // API call
      console.log("Fetched Tables:", response); // Debug log

      if (response && response.statusCode === 200 && Array.isArray(response.data)) {
        setTables(response.data); // ✅ Update state with latest tables
      } else {
        console.error("Error fetching tables: Unexpected response format", response);
      }
    } catch (error) {
      console.error("Error fetching tables:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTables();
  }, [shopId]); // ✅ Fetch tables when shopId changes

  // Handle table click - ONLY trigger if clicking on a valid table
  const handleTableClick = (tableNumber: number, event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation(); // Prevent event bubbling

    // ✅ Find the selected table using `tableNumber`
    const selectedTable = tables.find((table) => table.tableNumber === tableNumber);
    if (!selectedTable) {
      console.warn(`Table with tableNumber ${tableNumber} not found. Available tables:`, tables);
      return;
    }

    setActiveTable(selectedTable);

    // Get click position
    const { clientX, clientY } = event;
    setAnchorPosition({ top: clientY, left: clientX });
  };

  // Handle closing the popover and refresh the table list after update
  const handleClose = async (event?: React.MouseEvent | {}, reason?: "backdropClick" | "escapeKeyDown") => {
    if (event && "stopPropagation" in event) {
      event.stopPropagation(); // Prevent event bubbling
    }

    console.log("Closing modal", reason); // Debugging log

    setTimeout(() => {
      setActiveTable(null);
      setAnchorPosition(null);
    }, 10); // Ensures React properly updates state

    // ✅ Refresh tables after closing the modal (in case an update was made)
    await fetchTables();
  };

  // Handle opening create table dialog
  const handleOpenCreateDialog = () => {
    setCreateDialogOpen(true);
  };

  // Handle closing create table dialog
  const handleCloseCreateDialog = () => {
    setCreateDialogOpen(false);
    setNewTableNumber("");
    setNewSeats("");
  };

  const handleCreateTable = async () => {
    const tableNumberValue = Number(newTableNumber);
    const seatsValue = Number(newSeats);

    if (!tableNumberValue || !seatsValue || seatsValue <= 0 || tableNumberValue <= 0) {
      alert("Please enter a valid table number and number of seats.");
      return;
    }

    try {
      // ✅ Fetch existing tables to check for duplicates
      const existingTablesResponse = await getTables(shopId);
      if (existingTablesResponse.statusCode !== 200 || !Array.isArray(existingTablesResponse.data)) {
        console.error("❌ Error fetching existing tables:", existingTablesResponse.message);
        alert("Error checking for duplicate tables. Please try again.");
        return;
      }

      // ✅ Check if the tableNumber already exists
      const tableExists = existingTablesResponse.data.some(
        (table) => table.tableNumber === tableNumberValue
      );

      if (tableExists) {
        alert(`❌ Table with number ${tableNumberValue} already exists.`);
        return; // ❌ Stop execution if duplicate found
      }

      const payload = {
        shopId,
        tableNumber: tableNumberValue,
        seats: seatsValue,
        startTime: new Date().toISOString(), // ✅ Default start time
        activeTicket: undefined, // ✅ Let backend auto-generate
      };

      console.log("📌 Creating table with Payload:", payload); // ✅ Debugging

      const response = await createTable(payload); // ✅ Send JSON payload directly
      console.log("✅ Table created successfully:", response);

      if (response.statusCode === 201) {
        await fetchTables(); // ✅ Refresh tables after creation
      } else {
        console.error("❌ Failed to create table:", response.message);
        alert(`❌ Error: ${Array.isArray(response.message) ? response.message.join(", ") : response.message}`);
      }
    } catch (error) {
      console.error("❌ Error creating table:", error);
      alert(`❌ Error: ${error.message || "Unknown error occurred"}`);
    } finally {
      handleCloseCreateDialog();
    }
  };






  return (
    <>
      <div className="flex justify-start gap-2 px-5">
        <TableRestaurantOutlinedIcon className="text-[30px]" />
        <div className="text-[20px] font-semibold">Table Layout</div>
      </div>

      {/* Show Loading State */}
      {loading ? (
        <p className="text-center text-gray-500">Loading tables...</p>
      ) : tables.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-flow-row pr-20 pl-40">
          {tables.map((table) => (
            <Table
              key={table.tableNumber}
              Tables={table}
              isActive={activeTable?.tableNumber === table.tableNumber}
              onClick={(tableNumber, event) => handleTableClick(tableNumber, event)} // ✅ Proper click handler
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No tables found.</p>
      )}

      {/* Create Table Button (Fixed to Middle-Right of Page) */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenCreateDialog}
        style={{
          position: "fixed",
          top: "90%",
          right: "20px",
          transform: "translateY(-50%)",
          zIndex: 1100,
        }}
      >
        + Create Table
      </Button>

      {/* Backdrop properly closes popover */}
      {activeTable !== null && (
        <Backdrop
          open={activeTable !== null}
          onClick={(e) => handleClose(e, "backdropClick")}
          style={{ zIndex: 1000, backdropFilter: "blur(8px)" }}
        >
          {/* Popover with TableInformation */}
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
              style: { zIndex: 1100 },
              onClick: (e) => e.stopPropagation(),
            }}
          >
            {/* ✅ Pass valid table data and fetchTables for refreshing */}
            <TableInformation Tables={activeTable} onClick={handleClose} fetchTables={fetchTables} />
          </Popover>
        </Backdrop>
      )}

      {/* Create Table Dialog */}
      <Dialog open={createDialogOpen} onClose={handleCloseCreateDialog} fullWidth maxWidth="sm">
        <DialogTitle>Create New Table</DialogTitle>
        <DialogContent>
          <TextField
            label="Table Number"
            type="number"
            value={newTableNumber}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d+$/.test(value) || value === "") {
                const numValue = Number(value);
                setNewTableNumber(numValue >= 1 || value === "" ? value : "1");
              }
            }}
            fullWidth
            margin="dense"
          />

          <TextField
            label="Seats"
            type="number"
            value={newSeats}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d+$/.test(value) || value === "") {
                const numValue = Number(value);
                setNewSeats(numValue >= 1 || value === "" ? value : "1");
              }
            }}
            fullWidth
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCreateDialog} color="error">Cancel</Button>

          <Button onClick={handleCreateTable} color="primary" variant="contained">Create</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
