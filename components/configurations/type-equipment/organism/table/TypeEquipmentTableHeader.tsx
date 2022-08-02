import React from "react";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { TypeEquipmentHeadCell } from "./typeEquipment.interface";
import { typeequipmentheadCells } from "./typeEquipment.constant";
import HeadCell from "./HeadCell";

const TypeEquipmentTableHeader = () => {
  return (
    <TableHead>
      <TableRow>
        {typeequipmentheadCells.map((headCell: TypeEquipmentHeadCell) => (
          <HeadCell headCell={headCell} key={headCell.id}></HeadCell>
        ))}
        <TableCell></TableCell>
      </TableRow>
    </TableHead>
  );
};

export default TypeEquipmentTableHeader;
