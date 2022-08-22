import { Order } from "../../../../config/table.config";
import { ArticlItem } from "../../../../redux/features/artikel/articl.interface";

export interface HeadCell {
	disablePadding: boolean;
	id: any;
	label: string;
	numeric: boolean;
}

export interface ArticlEnhancedTableProps {
	numSelected: number;
	onRequestSort: (
		event: React.MouseEvent<unknown>,
		property: keyof ArticlItem
	) => void;
	order: Order;
	orderBy: string;
	rowCount: number;
}

export interface EnhancedTableToolbarProps {
	numSelected: number;
}
