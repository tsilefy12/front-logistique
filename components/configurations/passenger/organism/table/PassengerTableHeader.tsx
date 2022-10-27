import React from "react";
import Box from "@mui/material/Box";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { PassengerHeadCell } from "./passenger.interface";
import { passengerHeadCells } from "./passenger.constant";
import HeadCell from "./HeadCell";

const PassengerTableHeader = () => {
  return (
    <TableHead>
      <TableRow>
        {passengerHeadCells.map((headCell: PassengerHeadCell) => (
          <HeadCell headCell={headCell} key={headCell.id}></HeadCell>
        ))}
        <TableCell></TableCell>
      </TableRow>
    </TableHead>
  );
};

export default PassengerTableHeader;
