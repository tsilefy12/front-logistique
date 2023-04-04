import { Order } from "../../../../config/table.config";
import { SuplyAndConsumableItem } from "../../../../redux/features/supply-and-consumable/supply-and-consumable.interface";

export interface HeadCell {
  disablePadding: boolean;
  id: any;
  label: string;
  numeric: boolean;
}

export interface SuplyAndConsumableEnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof SuplyAndConsumableItem
  ) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

export interface EnhancedTableToolbarProps {
  numSelected: number;
}
