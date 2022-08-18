import { Order } from "../../../../../config/table.config";
import { ConsumptionInvoiceItem } from "../../../../../redux/features/consumption_invoice/consumptionInvoice.interface";

export interface HeadCell {
  disablePadding: boolean;
  id: any;
  label: string;
  numeric: boolean;
}

export interface ConsumptionInvoiceEnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof ConsumptionInvoiceItem
  ) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

export interface EnhancedTableToolbarProps {
  numSelected: number;
}
