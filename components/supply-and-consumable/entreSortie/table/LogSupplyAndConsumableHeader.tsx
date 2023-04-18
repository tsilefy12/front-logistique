import React from "react";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import HeadCellComponent from "./HeadCellComponent";
import { logSuplyAndConsumableHeadCells } from "./LogSupplyAndConsumableHeaderCell";
import { HeadCell } from "./HeadCell.interface";

const LogSupplyAndConsumableTableHeader = () => {
  return (
    <TableHead>
      <TableRow>
        {logSuplyAndConsumableHeadCells.map((headCell: HeadCell) => (
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

export default LogSupplyAndConsumableTableHeader;
