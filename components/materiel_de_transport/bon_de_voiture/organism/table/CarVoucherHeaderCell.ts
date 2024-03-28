import { HeadCell } from "./HeadCell.interface";

export const carVoucherHeadCells: readonly HeadCell[] = [
  {
    id: "materiel",
    numeric: false,
    disablePadding: false,
    label: "Matériel",
  },
  {
    id: "date",
    numeric: false,
    disablePadding: false,
    label: "Date",
  },
  {
    id: "reference",
    numeric: false,
    disablePadding: false,
    label: "Référence",
  },
  {
    id: "montantTotal",
    numeric: false,
    disablePadding: false,
    label: "Montant total",
  },
];
