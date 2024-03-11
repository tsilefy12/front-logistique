import { HeadCell } from "./HeadCell.interface";

export const suplyAndConsumableHeadCells: readonly HeadCell[] = [
  {
    id: "designation",
    numeric: false,
    disablePadding: false,
    label: "Désignation",
  },
  {
    id: "quantity",
    numeric: false,
    disablePadding: false,
    label: "Quantite",
  },
  {
    id: "unitPrice",
    numeric: false,
    disablePadding: false,
    label: "Prix Unitaire",
  },
  {
    id: "SKU",
    numeric: false,
    disablePadding: false,
    label: "Unité de Gestion de Stock",
  },
  {
    id: "montant",
    numeric: false,
    disablePadding: false,
    label: "Montant",
  },
];
