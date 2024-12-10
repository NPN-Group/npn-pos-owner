export enum Status {
    READY = "Ready",
    INPROCESS = "In Process",
    CANCELLED = "Cancelled",
    COMPLETED = "Completed",
}
export type Menu = {
    name:string;
    image:string;
    pricePerMenu:number;
    quantity:number;
}
export type Orders = {
    id:string;
    menus:Menu[];
    status:Status;
    timeStamp:string;

}
export interface OrderProps{
    tableId:number;
    Orders:Orders;}