import { createData } from "./function";
import { HeadCell } from "./type-variable";

export const headCells: readonly HeadCell[] = [
  {
    id: "designation",
    numeric: false,
    disablePadding: true,
    label: "Désignation",
  },
  {
    id: "quantite",
    numeric: true,
    disablePadding: false,
    label: "Quantite",
  },
  {
    id: "prix_unitaire",
    numeric: true,
    disablePadding: false,
    label: "Prix Unitaire",
  },
  
];

export const rows = [
  createData(
    "Cahier",
    "10",
    "[252] 555-0121",
  ),
  createData(
    "Bloc Note",
    "20",
    "[208] 555-0126"
  ),
  createData(
    "Stylo Bleu",
    "3",
    "[252] 555-0111"
  ),
  

];
