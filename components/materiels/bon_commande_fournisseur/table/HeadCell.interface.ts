import { Order } from "../../../../config/table.config";
import { CommandeFournisseurItem } from "../../../../redux/features/bon_commande_fournisseur/bonCommandeFournisseur.interface";

export interface HeadCell {
	disablePadding: boolean;
	id: any;
	label: string;
	numeric: boolean;
}

export interface BonCommandeFournisseurEnhancedTableProps {
	numSelected: number;
	onRequestSort: (
		event: React.MouseEvent<unknown>,
		property: keyof CommandeFournisseurItem
	) => void;
	order: Order;
	orderBy: string;
	rowCount: number;
}

export interface EnhancedTableToolbarProps {
	numSelected: number;
}
