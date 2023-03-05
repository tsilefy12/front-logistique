import { Order } from "../../../../../config/table.config";
import { OrderFormItem } from "../../../../../redux/features/order-form/orderForm.interface";



export interface HeadCell {
	disablePadding: boolean;
	id: any;
	label: string;
	numeric: boolean;
}

export interface OrderFormEnhancedTableProps {
	numSelected: number;
	onRequestSort: (
		event: React.MouseEvent<unknown>,
		property: keyof OrderFormItem
	) => void;
	order: Order;
	orderBy: string;
	rowCount: number;
}

export interface EnhancedTableToolbarProps {
	numSelected: number;
}
