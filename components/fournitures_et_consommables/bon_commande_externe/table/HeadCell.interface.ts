import { Order } from "../../../../config/table.config";
import { BonCommandeExterneItem } from "../../../../redux/features/bon_commande_externe/bonCommandeExterne.interface";

export interface HeadCell {
	disablePadding: boolean;
	id: any;
	label: string;
	numeric: boolean;
}

export interface BonCommandeExterneEnhancedTableProps {
	numSelected: number;
	onRequestSort: (
		event: React.MouseEvent<unknown>,
		property: keyof BonCommandeExterneItem
	) => void;
	order: Order;
	orderBy: string;
	rowCount: number;
}

export interface EnhancedTableToolbarProps {
	numSelected: number;
}
