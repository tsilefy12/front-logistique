import { HeadCell } from "./HeadCell.interface";

export const carVoucherHeadCells: readonly HeadCell[] = [
  {
    id: "number",
    numeric: false,
    disablePadding: false,
    label: "Numéro BV",
  },
  {
    id: "registration",
    numeric: false,
    disablePadding: false,
    label: "Immatriculation",
  },
  {
    id: "type",
    numeric: false,
    disablePadding: false,
    label: "Type",
  },
  {
    id: "departureDate",
    numeric: false,
    disablePadding: false,
    label: "Date et heure de depart",
  },
  {
    id: "arrivalDate",
    numeric: false,
    disablePadding: false,
    label: "Date et heure de retour",
  },
];
