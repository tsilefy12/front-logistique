import { Order } from "../../../../../config/table.config";
import { SuiviCarburantItem } from "../../../../../redux/features/suivi_carburant/suivi_carburant.interface";


export interface HeadCell {
  disablePadding: boolean;
  id: any;
  label: string;
  numeric: boolean;
}

export interface SuiviCarburantEnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof SuiviCarburantItem
  ) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

export interface EnhancedTableToolbarProps {
  numSelected: number;
}
