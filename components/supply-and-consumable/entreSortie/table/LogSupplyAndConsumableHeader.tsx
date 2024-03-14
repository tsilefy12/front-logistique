import React, { FunctionComponent } from "react";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import HeadCellComponent from "./HeadCellComponent";
import { logSuplyAndConsumableHeadCells } from "./LogSupplyAndConsumableHeaderCell";
import { HeadCell } from "./HeadCell.interface";

interface props {
  operation : string
}
const LogSupplyAndConsumableTableHeader :FunctionComponent<props>= ({operation}) => {
  return (
    <TableHead>
      <TableRow>
        {logSuplyAndConsumableHeadCells.map((headCell: HeadCell) => (
          <HeadCellComponent
            operation = {operation}
            headCell={headCell}
            key={headCell.id}
          ></HeadCellComponent>
        ))}
        <TableCell></TableCell>
      </TableRow>
    </TableHead>
  );
};

export default LogSupplyAndConsumableTableHeader;
