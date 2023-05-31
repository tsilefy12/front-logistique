import { Order } from "../../../../config/table.config";
import { EquipmentStockItem } from "../../../../redux/features/equipmentStock/equipmentStock.interface";

export interface HeadCell {
  disablePadding: boolean;
  id: any;
  label: string;
  numeric: boolean;
}

export interface EquipmentStockEnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof EquipmentStockItem
  ) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

export interface EnhancedTableToolbarProps {
  numSelected: number;
}
