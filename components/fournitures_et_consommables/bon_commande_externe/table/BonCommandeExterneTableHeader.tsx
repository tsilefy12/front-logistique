import React from "react";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import HeadCellComponent from "./HeadCellComponent";
import { BonCommandeExterneHeadCells } from "./BonCommandeExterneHeaderCell";
import { HeadCell } from "./HeadCell.interface";

const BonCommandeExterneTableHeader = () => {
	return (
		<TableHead>
			<TableRow>
				{BonCommandeExterneHeadCells.map((headCell: HeadCell) => (
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

export default BonCommandeExterneTableHeader;
