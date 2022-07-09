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
    "Bessie Cooper",
    "Adresse 1",
    "[252] 555-0121",
  ),
  createData(
    "Kessie Cooper",
    "Adresse 2",
    "[208] 555-0126"
  ),
  createData(
    "Sie Cooper",
    "Adresse 3",
    "[252] 555-0111"
  ),
  createData(
    "Cesie Cooper",
    "Adresse 4",
    "[907] 555-0158"
  ),
  createData(
    "Esie Deker",
    "Adresse",
    "[907] 555-0184"
  ),
  createData(
    "Dua Cooper",
    "Adresse 6",
    "[252] 555-0451"
  ),
  createData(
    "Dua Lipa",
    "Adresse 2",
    "[208] 555-0125"
  ),

];
