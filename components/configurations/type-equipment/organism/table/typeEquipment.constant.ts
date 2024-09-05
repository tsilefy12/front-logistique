import { TypeEquipmentHeadCell } from "./typeEquipment.interface";

export const typeequipmentheadCells: readonly TypeEquipmentHeadCell[] = [
  {
    id: "type",
    numeric: false,
    disablePadding: false,
    label: "Matériel",
  },
  {
    id: "prefix",
    numeric: false,
    disablePadding: false,
    label: "Type",
  },
  {
    id: "unitPrice",
    numeric: false,
    disablePadding: false,
    label: "Prix unitaire",
  },
  {
    id: "dureAmortissement",
    numeric: false,
    disablePadding: false,
    label: "Durée d'amortissement",
  },
];
