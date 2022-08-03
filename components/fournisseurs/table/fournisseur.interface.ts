import { Order } from "../../../config/table.config";
import { FournisseurItem } from "../../../redux/features/fournisseur/fournisseurSlice.interface";

export interface FournisseurHeadCell {
  disablePadding: boolean;
  id: any;
  label: string;
  numeric: boolean;
}

export interface FournisseurTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof FournisseurItem
  ) => void;
  order: Order;
  orderBy: string;
}
