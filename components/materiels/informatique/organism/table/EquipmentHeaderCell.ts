import { HeadCell } from "./HeadCell.interface";

export const equipmentHeadCells: readonly HeadCell[] = [
  {
    id: "numOptim",
    numeric: false,
    disablePadding: false,
    label: "N° OPTIM",
  },
  {
    id: "typeEquipment",
    numeric: false,
    disablePadding: false,
    label: "Type",
  },
  {
    id: "owner",
    numeric: false,
    disablePadding: false,
    label: "Utilisateur",
  },
  {
    id: "designation",
    numeric: false,
    disablePadding: false,
    label: "Désignation",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Etat",
  },
];
