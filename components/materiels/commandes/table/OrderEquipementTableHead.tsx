import React from "react";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { OrderEquipementHeadCell } from "./orderEquipement.interface";
import { orderequipmentheadCells } from "./orderEquipement.constante";
import HeadCell from "./HeadCell";

const OrderEquipementTableHead = () => {
  return (
    <TableHead>
      <TableRow>
        {orderequipmentheadCells.map((headCell: OrderEquipementHeadCell) => (
          <HeadCell headCell={headCell} key={headCell.id}></HeadCell>
        ))}
        <TableCell></TableCell>
      </TableRow>
    </TableHead>
  );
};

export default OrderEquipementTableHead;
