import { Order } from "../../../../config/table.config";
import { OrderEquipmentItem } from "../../../../redux/features/orderEquipment/orderEquipmentSlice.interface";


export interface OrderEquipementHeadCell {
  disablePadding: boolean;
  id: any;
  label: string;
  numeric: boolean;
}

export interface OrderEquipementTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof OrderEquipmentItem
  ) => void;
  order: Order;
  orderBy: string;
}
