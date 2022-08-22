import { Order } from "../../../../config/table.config";
import { ConsumableItem } from "../../../../redux/features/consummable/consumable.interface";

export interface HeadCell {
	disablePadding: boolean;
	id: any;
	label: string;
	numeric: boolean;
}

export interface ConsumableEnhancedTableProps {
	numSelected: number;
	onRequestSort: (
		event: React.MouseEvent<unknown>,
		property: keyof ConsumableItem
	) => void;
	order: Order;
	orderBy: string;
	rowCount: number;
}

export interface EnhancedTableToolbarProps {
	numSelected: number;
}
