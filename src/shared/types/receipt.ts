import {Menu} from './order'
export type Receipt = {
    ticketId:string;
    date:string;
    menus:Menu[];
}

export interface ReceiptProps{
    receipt:Receipt;
}