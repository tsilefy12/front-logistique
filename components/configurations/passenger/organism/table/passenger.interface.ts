import { Order } from "../../../../../config/table.config";
import { PassengerItem } from "../../../../../redux/features/passenger/passengerSlice.interface";

export interface PassengerHeadCell {
  id: any;
  label: string;
  numeric: boolean;
  disablePadding: boolean;
}

export interface PassengerTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof PassengerItem
  ) => void;
  order: Order;
  orderBy: string;
}
