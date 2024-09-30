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
    label: "Quantité",
  },
  {
    id: "unitPrice",
    numeric: false,
    disablePadding: false,
    label: "Prix unitaire",
  },
  {
    id: "SKU",
    numeric: false,
    disablePadding: false,
    label: "Unité de gestion de stock",
  },
  {
    id: "montant",
    numeric: false,
    disablePadding: false,
    label: "Montant",
  },
  {
    id: "reste",
    numeric: false,
    disablePadding: false,
    label: "Reste",
  },
  {
    id: "seuil",
    numeric: false,
    disablePadding: false,
    label: "Seuil mensuel",
  },
];
