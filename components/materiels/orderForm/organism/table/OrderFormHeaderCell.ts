import { HeadCell } from "./HeadCell.interface";

export const orderFormHeadCells: readonly HeadCell[] = [
	{
		id: "number",
		numeric: false,
		disablePadding: false,
		label: "Numéro",
	},
	{
		id: "reference",
		numeric: false,
		disablePadding: false,
		label: "Référence",
	},
	{
		id: "shippingMethod",
		numeric: false,
		disablePadding: false,
		label: "Mode de livraison",
	},
	{
		id: "deliveryDate",
		numeric: false,
		disablePadding: false,
		label: "Date de livraison",
	},
	{
		id: "vendorId",
		numeric: false,
		disablePadding: false,
		label: "Fournisseur",
	},
];
