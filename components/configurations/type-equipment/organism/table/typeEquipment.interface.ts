import { Order } from "../../../../../config/table.config";
import { TypeEquipmentItem } from "../../../../../redux/features/typeEquipment/typeEquipmentSlice.interface";

export interface TypeEquipmentHeadCell {
  disablePadding: boolean;
  id: any;
  label: string;
  numeric: boolean;
}

export interface TypeEquipmentTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof TypeEquipmentItem
  ) => void;
  order: Order;
  orderBy: string;
}
