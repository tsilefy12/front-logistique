import React from "react";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { OrderEquipmentHeadCell } from "./orderEquipment.interface";
import { orderequipmentheadCells } from "./orderEquipment.constante";
import HeadCell from "./HeadCell";

const OrderEquipmentTableHead = () => {
  return (
    <TableHead>
      <TableRow>
        {orderequipmentheadCells.map((headCell: OrderEquipmentHeadCell) => (
          <HeadCell headCell={headCell} key={headCell.id}></HeadCell>
        ))}
        <TableCell></TableCell>
      </TableRow>
    </TableHead>
  );
};

export default OrderEquipmentTableHead;
