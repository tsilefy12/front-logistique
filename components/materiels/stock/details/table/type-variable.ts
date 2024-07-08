export default interface Data {
    numero: string; 
    designation :string; 
    dateDebutStock: string;
  }
  
  export type Order = "asc" | "desc";
  
  export interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
    numeric: boolean;
  }
  
  export interface EnhancedTableToolbarProps {
    numSelected: number;
    category: string;
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