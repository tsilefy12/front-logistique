import { HeadCell } from "./HeadCell.interface";

export const BonReceptionHeadCells: readonly HeadCell[] = [
  {
    id: "reference",
    numeric: false,
    disablePadding: false,
    label: "Réference",
  },
  {
    id: "bce",
    numeric: false,
    disablePadding: false,
    label: "Ref BCE / BCI",
  },
  {
    id: "etat",
    numeric: false,
    disablePadding: false,
    label: "Etat",
  },
  {
    id: "observation",
    numeric: false,
    disablePadding: false,
    label: "Observation",
  },
  {
    id: "dateReception",
    numeric: false,
    disablePadding: false,
    label: "Date de Reception",
  },
];
