import { HeadCell } from "./HeadCell.interface";

export const equipmentHeadCells: readonly HeadCell[] = [
  {
    id: "num_optim",
    numeric: false,
    disablePadding: false,
    label: "N°Optim",
  },
  {
    id: "type_materiel",
    numeric: false,
    disablePadding: false,
    label: "Type",
  },
  {
    id: "user",
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
    id: "etat",
    numeric: false,
    disablePadding: false,
    label: "Etat",
  },
];
