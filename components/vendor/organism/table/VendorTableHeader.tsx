import React from "react";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import HeadCellComponent from "./HeadCellComponent";
import { vendorHeadCells } from "./VendorHeaderCell";
import { HeadCell } from "./HeadCell.interface";

const VendorTableHeader = () => {
	return (
		<TableHead>
			<TableRow>
				{vendorHeadCells.map((headCell: HeadCell) => (
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

export default VendorTableHeader;
