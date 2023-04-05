import { Order } from "../../../../config/table.config";
import { OrderEquipmentItemsItem } from "../../../../redux/features/OrderEquipmentItem/orderEquipmentItem.interface";

export interface HeadCell {
  disablePadding: boolean;
  id: any;
  label: string;
  numeric: boolean;
}

export interface OrderEquipmentItemEnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof OrderEquipmentItemsItem
  ) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

export interface EnhancedTableToolbarProps {
  numSelected: number;
}
