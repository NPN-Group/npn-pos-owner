export type Table = {
    id: number;
    startTime: string;
    quantity: number;
}
export interface TableProps {
    Tables: Table;
    onClick?: (id: number) => void;
    isActive?: boolean;
}
