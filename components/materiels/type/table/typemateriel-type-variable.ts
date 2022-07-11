

export default interface TypeMaterielData {
    type: string;
    prefix: string;
}

export interface TypeMaterielHeadCell {
    disablePadding: boolean;
    id: keyof TypeMaterielData;
    label: string;
    numeric: boolean;
}

export type Order = 'asc' | 'desc';

export interface EnhancedTableToolbarProps {
    numSelected: number;
}

export interface  TypeMaterielEnhancedTableProps {
    numSelected: number;
    onRequestSort: (
      event: React.MouseEvent<unknown>,
      property: keyof TypeMaterielData
    ) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}