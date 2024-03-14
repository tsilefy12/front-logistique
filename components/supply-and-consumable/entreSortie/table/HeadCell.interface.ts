import { Order } from "../../../../config/table.config";
import { LogSuplyAndConsumableItem } from "../../../../redux/features/logSuplyAndConsumable/log-supply-and-consumable.interface";

export interface HeadCell {
  disablePadding: boolean;
  id: any;
  label: any;
  numeric: boolean;
}

export interface LogSuplyAndConsumableEnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof LogSuplyAndConsumableItem
  ) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

export interface EnhancedTableToolbarProps {
  numSelected: number;
}
