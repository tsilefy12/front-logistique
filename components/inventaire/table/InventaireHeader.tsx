import React from "react";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import HeadCellComponent from "./HeadCellComponent";
import { inventaireHeadCells } from "./InventaireHeaderCell";
import { HeadCell } from "./HeadCell.interface";

const LogSupplyAndConsumableTableHeader = () => {
  return (
    <TableHead>
      <TableRow>
        {inventaireHeadCells.map((headCell: HeadCell) => (
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
