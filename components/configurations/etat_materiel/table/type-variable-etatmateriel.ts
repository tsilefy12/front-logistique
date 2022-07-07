

export default interface DataEtatMateriel {
  etat: string;
}

export type Order = "asc" | "desc";

export interface HeadCellEtatMateriel {
  disablePadding: boolean;
  id: keyof DataEtatMateriel;
  label: string;
  numeric: boolean;
}

export interface EnhancedTableToolbarProps {
  numSelected: number;
}


export interface EnhancedTablePropsEtatMateriel {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof DataEtatMateriel
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}
