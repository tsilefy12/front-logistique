import { Order } from "../../../../config/table.config";
import { ficheDotationItem } from "../../../../redux/features/fiche_dotation/ficheDotation.interface";

export interface HeadCell {
	disablePadding: boolean;
	id: any;
	label: string;
	numeric: boolean;
}

export interface FicheDotationEnhancedTableProps {
	numSelected: number;
	onRequestSort: (
		event: React.MouseEvent<unknown>,
		property: keyof ficheDotationItem
	) => void;
	order: Order;
	orderBy: string;
	rowCount: number;
}

export interface EnhancedTableToolbarProps {
	numSelected: number;
}
