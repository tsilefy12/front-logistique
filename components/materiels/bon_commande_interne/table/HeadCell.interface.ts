import { Order } from "../../../../config/table.config";
import { BonCommandeItem } from "../../../../redux/features/bon_commande_interne/bonCommandeInterne.interface";

export interface HeadCell {
	disablePadding: boolean;
	id: any;
	label: string;
	numeric: boolean;
}

export interface BonCommandeInterneEnhancedTableProps {
	numSelected: number;
	onRequestSort: (
		event: React.MouseEvent<unknown>,
		property: keyof BonCommandeItem
	) => void;
	order: Order;
	orderBy: string;
	rowCount: number;
}

export interface EnhancedTableToolbarProps {
	numSelected: number;
}
