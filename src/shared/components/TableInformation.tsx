'use client';
import React, { useState } from 'react';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  TextField,
} from '@mui/material';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TableProps } from '@/shared/types';

const TableInformation: React.FC<TableProps> = ({ Tables, onClick }) => {
  const initialTime = Tables.startTime ? new Date(Tables.startTime) : new Date();
  const [startTime, setStartTime] = useState<Date>(initialTime);
  const [quantity, setQuantity] = useState<number>(Tables.quantity);

  const handleQuantityChange = (newQuantity: number) => {
    const validQuantity = Math.max(1, newQuantity);
    setQuantity(validQuantity);
    Tables.quantity = validQuantity;
  };

  const handleSave = () => {
    console.log('Final Table Data:', { startTime, quantity });
    Tables.startTime = startTime.toISOString();
    if (onClick) onClick(Tables.id); // Close the dialog
  };

  // Prevent dialog from closing when interacting with inputs
  const preventClose = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <Dialog open={true} onClose={() => {}} fullWidth maxWidth="sm">
      <DialogTitle>
        <div className="flex justify-between items-center">
          <span className="text-[24px] font-semibold">โต๊ะ {Tables.id}</span>
          <IconButton onClick={() => onClick?.(Tables.id)}>
            <CloseRoundedIcon />
          </IconButton>
        </div>
      </DialogTitle>

      <DialogContent onClick={preventClose}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <div className="flex flex-col gap-4 pb-4 pt-4">
            <DateTimePicker
              label="Start Time"
              value={startTime}
              onChange={(newValue) => {
                if (newValue) setStartTime(newValue);
              }}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
            <TextField
              label="Quantity"
              type="number"
              value={quantity}
              onChange={(event) =>
                handleQuantityChange(Number(event.target.value))
              }
              fullWidth
            />
          </div>
        </LocalizationProvider>

        <div className="flex flex-col items-center gap-4">
          <Button
            variant="outlined"
            color="secondary"
            style={{ borderRadius: '20px', padding: '10px 20px', fontSize: '16px' }}
          >
            พิมพ์ใบออร์เดอร์
          </Button>
          <Button
            variant="contained"
            color="error"
            style={{
              borderRadius: '20px',
              padding: '10px 20px',
              fontSize: '16px',
              color: 'white',
            }}
          >
            ชำระเงิน
          </Button>
        </div>
      </DialogContent>

      <DialogActions>
        <Button onClick={() => onClick?.(Tables.id)} color="secondary">
          Close
        </Button>
        <Button onClick={handleSave} color="primary" variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TableInformation;
