import React from "react";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import HeadCellComponent from "./HeadCellComponent";
import { HeadCell } from "./HeadCell.interface";
import { carVoucherHeadCells } from "./CarVoucherHeaderCell";

const CarVoucherTableHeader = () => {
	return (
		<TableHead>
			<TableRow>
				{carVoucherHeadCells.map((headCell: HeadCell) => (
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

export default CarVoucherTableHeader;