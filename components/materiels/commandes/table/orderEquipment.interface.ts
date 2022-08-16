import { Order } from "../../../../config/table.config";
import { OrderEquipmentItem } from "../../../../redux/features/orderEquipment/orderEquipmentSlice.interface";

export interface OrderEquipmentHeadCell {
  disablePadding: boolean;
  id: any;
  label: string;
  numeric: boolean;
}

export interface OrderEquipmentTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof OrderEquipmentItem
  ) => void;
  order: Order;
  orderBy: string;
}
