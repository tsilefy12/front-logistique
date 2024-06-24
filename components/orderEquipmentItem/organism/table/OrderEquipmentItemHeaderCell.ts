import { HeadCell } from "./HeadCell.interface";

export const orderEquipmentItemHeadCells: readonly HeadCell[] = [
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
    id: "orderEquipment",
    numeric: false,
    disablePadding: false,
    label: "Commande",
  },
];
