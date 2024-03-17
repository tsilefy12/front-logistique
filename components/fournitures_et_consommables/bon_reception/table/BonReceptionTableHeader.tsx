import React from "react";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import HeadCellComponent from "./HeadCellComponent";
import { BonReceptionHeadCells } from "./BonReceptionHeaderCell";
import { HeadCell } from "./HeadCell.interface";

const BonReceptionTableHeader = () => {
	return (
		<TableHead>
			<TableRow>
				{BonReceptionHeadCells.map((headCell: HeadCell) => (
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

export default BonReceptionTableHeader;
