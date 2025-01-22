export type Table = {
    id: number;
    startTime: string;
    quantity: number;
}
export interface TableProps {
    Tables: { id: number; startTime: string; quantity: number };
    onClick?: (id: number, event?: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => void;
    isActive?: boolean;
  }
  