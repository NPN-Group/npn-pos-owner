"use client";
import { useState, ChangeEvent, FormEvent } from 'react';
import Link from "next/link";
import Image from "next/image";
import EastIcon from '@mui/icons-material/East';
import TextField from '@mui/material/TextField';

type FormData = {
  name: string;
  cardNumber: string;
  expiration: string;
  cvv: string;
};

type Errors = {
  name?: string;
  cardNumber?: string;
  expiration?: string;
  cvv?: string;
};
interface PaymentProps {
  totalPrice: number;
}
export default function PaymentMethod({ totalPrice }: PaymentProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    cardNumber: '',
    expiration: '',
    cvv: '',
  });

  const [errors, setErrors] = useState<Errors>({});

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setErrors({ ...errors, [id]: undefined }); // Clear error as user types
  };

  const validateCVV = (cvv: string): boolean => {
    const isValid = /^\d{3}$/.test(cvv);
    return isValid;
  }

  const validateExpiration = (expiration: string): boolean => {
    const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    return regex.test(expiration);
  };

  const validateCardNumber = (cardNumber: string): boolean => {
    const regex = /^(\d{4} ){3}\d{4}$/;
    return regex.test(cardNumber);
  };

  const validateFields = (): boolean => {
    const newErrors: Errors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    } else if (/\d/.test(formData.name)) {
      newErrors.name = "Name is Invalid";
    }

    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = "Card number is required.";
    } else if (validateCardNumber(formData.cardNumber) == false) {
      newErrors.cardNumber = "Card number is Invalid";
    }

    if (!formData.expiration.trim()) {
      newErrors.expiration = "Expiration date is required.";
    } else if (validateExpiration(formData.expiration) == false) {
      newErrors.expiration = "Expiration date is Invalid";
    }

    if (!formData.cvv.trim()) {
      newErrors.cvv = "CVV is required.";
    } else if (validateCVV(formData.cvv) == false) {
      newErrors.cvv = "CVV is Invalid";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (validateFields()) {
      console.log('Form Data Submitted:', formData);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='relative top-3/4 right-40 bg-white w-[400px] rounded-lg pb-5 shadow-md border-[#F5533D] border-2'
    >
      <div className='mx-5 py-5 text-[20px] font-semibold text-black'>Card Detail</div>
      <div className='mx-5 pb-3 text-black font-normal'>Card type</div>
      <div className='flex mx-5 justify-around px-10'>
        <Link href='#'>
          <Image src="/assets/masterCard.svg" alt='masterCard' width={60} height={60} className='shadow-md border-1' />
        </Link>
        <Link href='#'>
          <Image src="/assets/Visa.svg" alt='Visa' width={60} height={60} className='shadow-md border-1' />
        </Link>
        <Link href='#'>
          <Image src="/assets/RuPay.svg" alt='RuPay' width={60} height={60} className='shadow-md border-1' />
        </Link>
      </div>
      <div className='mx-5 font-normal text-black pb-2'>
        <div className='pt-4'>Name on card</div>
        <div className='pb-3'>
          <TextField
            className='w-full bg-white rounded-md'
            id="name"
            label="Name"
            value={formData.name}
            onChange={handleInputChange}
            error={!!errors.name} // Highlight the field if there's an error
          />
          {errors.name && (
            <div className="text-sm text-red-500 mt-1">{errors.name}</div>
          )}
        </div>
        <div className='font-normal'>Card Number</div>
        <TextField
          className='w-full bg-white rounded-md'
          id="cardNumber"
          label="Card Number"
          value={formData.cardNumber}
          onChange={handleInputChange}
          error={!!errors.cardNumber}
        />
        {errors.cardNumber && (
          <div className="text-sm text-red-500 mt-1">{errors.cardNumber}</div>
        )}
      </div>

      <div className='flex justify-between mx-5 gap-10 font-normal text-black pb-4'>
        <div className='flex flex-col mx-auto items-start'>
          <div>Expiration date</div>
          <TextField
            className='w-full bg-white rounded-md'
            id="expiration"
            label="MM/YY"
            value={formData.expiration}
            onChange={handleInputChange}
            error={!!errors.expiration}
          />
          {errors.expiration && (
            <div className="text-sm text-red-500 mt-1">{errors.expiration}</div>
          )}
        </div>
        <div className='flex flex-col mx-auto items-start '>
          <div className='font-normal'>CVV</div>
          <TextField
            className='w-full bg-white rounded-md'
            id="cvv"
            label="123"
            value={formData.cvv}
            onChange={handleInputChange}
            error={!!errors.cvv}
          />
          {errors.cvv && (
            <div className="text-sm text-red-500 mt-1">{errors.cvv}</div>
          )}
        </div>
      </div>
      <div className='mx-8'>
        <hr className='border-[#5F65C3] border-1' />
      </div>
      <div className='flex justify-between mx-5 pt-2 pb-10 text-black'>
        <div>Total</div>
        <div>${totalPrice}</div>
      </div>
      <div className='mx-5'>
        <button
          type="submit"
          className='flex justify-between bg-[#E14D4F] rounded-md items-center px-2 text-white font-semibold text-[18px] py-2 w-full'
        >
          <div>${totalPrice}</div>
          <div className='flex justify-start h-[40px] items-center gap-1'>
            <div>Checkout</div>
            <EastIcon />
          </div>
        </button>
      </div>
    </form>
  );
};
