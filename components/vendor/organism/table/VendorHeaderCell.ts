import { HeadCell } from "./HeadCell.interface";

export const vendorHeadCells: readonly HeadCell[] = [
	{
		id: "name",
		numeric: false,
		disablePadding: false,
		label: "Nom",
	},
	{
		id: "address",
		numeric: false,
		disablePadding: false,
		label: "Adresse",
	},
	{
		id: "phone",
		numeric: false,
		disablePadding: false,
		label: "Téléphone",
	},
	{
		id: "email",
		numeric: false,
		disablePadding: false,
		label: "Email",
	},
	{
		id: "website",
		numeric: false,
		disablePadding: false,
		label: "Web Site",
	},
];
