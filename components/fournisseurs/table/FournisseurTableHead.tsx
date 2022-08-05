import React from "react";
import Box from "@mui/material/Box";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Checkbox from "@mui/material/Checkbox";
import { visuallyHidden } from "@mui/utils";
import { FournisseurHeadCell } from "./fournisseur.interface";
import { fournisseurheadCells } from "./fournisseur.constante";
import HeadCell from "./HeadCell";

const FournisseurTableHead = () => {
  return (
    <TableHead>
      <TableRow>
        {fournisseurheadCells.map((headCell: FournisseurHeadCell) => (
          <HeadCell headCell={headCell} key={headCell.id}></HeadCell>
        ))}
        <TableCell></TableCell>
      </TableRow>
    </TableHead>
  );
};

export default FournisseurTableHead;
