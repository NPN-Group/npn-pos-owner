import Link from "next/link";
import Image from "next/image";
import { ReceiptProps } from '@/shared/types';

export default function BillReceiptProps({ receipt }: ReceiptProps) {
    const totalPrice = receipt.menus.reduce((sum, menu) => sum + (menu.pricePerMenu * menu.quantity), 0);
    return (
        <div className='relative max-w-96 min-w-72 max-h-[800px] border-2 top-1/3 left-0 overflow-scroll'>
            <div className='flex flex-col items-center'>
                <Link href="/"><Image src="/assets/logo.svg" alt="logo" width={100} height={100} /></Link>
                <div>1 Thanon Chalong Krung</div>
                <div>Khwaeng Lam Prathew, Lat Krabang,</div>
                <div>Bangkok 10520</div>
            </div>
            <div className='px-8 '>
                <div className='font-semibold'>Receipt #: {receipt.ticketId}</div>
                <div className='font-semibold'>Date: {receipt.date}</div>
                <div className='font-semibold'>Employee: Owner</div>
                <div className='pb-2 font-semibold'>POS: 1</div>
                <hr className='border-black' />
                {receipt.menus.map((menu, index) => (
                    <div className='flex justify-between' key={index}>
                        <div>{menu.name}</div>
                        <div>${menu.pricePerMenu * menu.quantity}</div>
                    </div>
                ))}
                <div className='pb-2'></div>
                <hr className='border-black' />
                <div className='flex justify-between font-bold'>
                    <div className='pb-2'>Total before tax</div>
                    <div>${totalPrice.toFixed(2)}</div>
                </div>
                <div className='flex justify-between font-bold'>
                    <div>Tax</div>
                    <div>${(totalPrice * 0.07).toFixed(2)}</div>
                </div>
                <hr className='border-black' />
                <div className='flex justify-between font-bold'>
                    <div className='pb-2'>Total with tax</div>
                    <div>${(totalPrice * 1.07).toFixed(2)}</div>
                </div>
                <hr className='border-black' />
            </div>
            <div className='flex flex-col items-center '>
                <div>Thank you!</div>
                <Image src="/assets/qrcode.png" alt="logo" width={120} height={120} />
            </div>
        </div>
    )
}
