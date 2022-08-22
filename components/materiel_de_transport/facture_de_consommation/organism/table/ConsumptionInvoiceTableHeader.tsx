import React from "react";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import HeadCellComponent from "./HeadCellComponent";
import { HeadCell } from "./HeadCell.interface";
import { consumptionInvoiceHeadCells } from "./ConsumptionInvoiceHeaderCell";

const ConsumptionInvoiceTableHeader = () => {
	return (
		<TableHead>
			<TableRow>
				{consumptionInvoiceHeadCells.map((headCell: HeadCell) => (
					<HeadCellComponent
						headCell={headCell}
						key={headCell.id}
					></HeadCellComponent>
				))}
				<TableCell></TableCell>
			</TableRow>
		</TableHead>
	);
};

export default ConsumptionInvoiceTableHeader;