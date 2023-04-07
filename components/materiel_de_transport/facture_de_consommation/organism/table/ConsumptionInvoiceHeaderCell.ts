import { HeadCell } from "./HeadCell.interface";

export const consumptionInvoiceHeadCells: readonly HeadCell[] = [
  {
    id: "invoiceNumber",
    numeric: false,
    disablePadding: false,
    label: "Numéro de facture",
  },
  {
    id: "carVoucherId",
    numeric: false,
    disablePadding: false,
    label: "Numéro de BV",
  },
  {
    id: "reason",
    numeric: false,
    disablePadding: false,
    label: "Motif de la course",
  },
  {
    id: "DepartureKilometrage",
    numeric: false,
    disablePadding: false,
    label: "Km de départ",
  },
  {
    id: "arrivalKilometrage",
    numeric: false,
    disablePadding: false,
    label: "Km arrivé",
  },
];
