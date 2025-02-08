"use client";
import React, { useState } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  TextField,
} from "@mui/material";
import { updateTable, deleteTable } from "@/shared/services"; // ✅ Import deleteTable
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { TableProps } from "@/shared/types";

const TableInformation: React.FC<
  TableProps & { onClick: (event?: React.MouseEvent) => void; fetchTables: () => void }
> = ({ Tables, onClick, fetchTables }) => {
  if (!Tables) {
    console.warn("TableInformation received undefined Tables prop! Skipping render.");
    return null; // Prevent rendering if Tables is undefined
  }

  console.log("🚀 Debugging Active Table:", Tables);

  const initialTime = Tables.startTime
    ? new Date(Tables.startTime) // Converts UTC string to local time
    : new Date(); // Fallback to current time

  const [startTime, setStartTime] = useState<Date>(initialTime);
  const [quantity, setQuantity] = useState<number>(Tables.seats);
  const [loading, setLoading] = useState<boolean>(false); // To handle loading state
  const [deleting, setDeleting] = useState<boolean>(false); // Handle delete state

  const handleSave = async () => {
    setLoading(true);

    console.log("🚀 Debugging Before Update:");
    console.log("Tables Object:", Tables);
    console.log("Table ID:", Tables.id);
    console.log("Shop ID:", Tables.shopId);

    // Convert local time back to UTC for saving to the database
    const utcTime = new Date(startTime.getTime()).toISOString();
    const parsedSeats = Number(quantity);

    const payload = {
      startTime: utcTime,
      seats: parsedSeats,
    };

    try {
      const response = await updateTable(Tables.id, payload, Tables.shopId);
      console.log("Update Response:", response);

      if (response.statusCode === 200) {
        console.log("✅ Table updated successfully");

        // ✅ Refresh tables after update
        await fetchTables();
      } else {
        console.error("❌ Failed to update table:", response.message);
      }
    } catch (error) {
      console.error("❌ Error updating table:", error);
    } finally {
      setLoading(false);
      onClick(); // Close the dialog
    }
  };

  // Handle Delete Table
  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete Table ${Tables.tableNumber}?`)) return;

    setDeleting(true);
    try {
      const response = await deleteTable(Tables.id, Tables.shopId);
      console.log("Delete Response:", response);

      if (response.statusCode === 200) {
        console.log("✅ Table deleted successfully");

        // ✅ Refresh tables after delete
        await fetchTables();
      } else {
        console.error("❌ Failed to delete table:", response.message);
      }
    } catch (error) {
      console.error("❌ Error deleting table:", error);
    } finally {
      setDeleting(false);
      onClick(); // Close the dialog
    }
  };

  return (
    <Dialog open={true} onClose={(e) => onClick(e)} fullWidth maxWidth="sm">
      <DialogTitle>
        <div className="flex justify-between items-center">
          <span className="text-[24px] font-semibold">โต๊ะ {Tables.tableNumber}</span>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              onClick(e);
            }}
          >
            <CloseRoundedIcon />
          </IconButton>
        </div>
      </DialogTitle>

      <DialogContent>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <div className="flex flex-col gap-4 pb-4 pt-4">
            {/* DateTimePicker for Start Time */}
            <DateTimePicker
              label="Start Time"
              value={startTime}
              onChange={(newValue) => {
                if (newValue) {
                  setStartTime(newValue);
                }
              }}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />

            {/* Input for Seats */}
            <TextField
              label="Seats"
              type="number"
              value={quantity}
              onChange={(event) => {
                const value = event.target.value;
                if (/^\d*$/.test(value)) { // ✅ Allows only digits (empty string or numbers)
                  const numValue = value === "" ? "" : Math.max(1, Number(value)); // ✅ Ensures minimum 1
                  setQuantity(numValue as number); // ✅ Type assertion to enforce number
                }
              }}
              fullWidth
              margin="dense"
            />


          </div>
        </LocalizationProvider>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "space-between" }}>
        {/* DELETE Button on the Left */}
        <Button onClick={handleDelete} color="error" variant="contained" disabled={deleting}>
          {deleting ? "Deleting..." : "Delete"}
        </Button>

        {/* CLOSE and SAVE Buttons on the Right */}
        <div>
          <Button onClick={handleSave} color="primary" variant="contained" disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default TableInformation;
