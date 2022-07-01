
export default interface Data {
  numero_BV: string,
  immatriculation: string,
  numero_OM: string,
  date_et_heure_de_depart: string,
  date_et_heure_d_arrive: string,
  }
  

export type Order = 'asc' | 'desc';


export interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

export interface EnhancedTableToolbarProps {
  numSelected: number;
}

export interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}