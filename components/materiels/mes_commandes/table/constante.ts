import { createData } from "./function";
import { HeadCell } from "./type-variable";

export const headCells: readonly HeadCell[] = [
  {
    id: "titre",
    numeric: false,
    disablePadding: true,
    label: "Titre",
  },
  {
    id: "raison_commande",
    numeric: false,
    disablePadding: true,
    label: "Raison de la commande",
  },
  {
    id: "etat_commande",
    numeric: false,
    disablePadding: true,
    label: "Etat de la commande",
  },
];

export const rows = [
  createData("1", "Demande achat cahier", "Stock epuisé", "En_attente"),
  createData("2", "Demande achat cahier", "Stock epuisé", "En_attente"),
  createData("3", "Demande achat cahier", "Stock epuisé", "Refusé"),
  createData("4", "Demande achat cahier", "Stock epuisé", "Validé"),
  createData("5", "Demande achat cahier", "Stock epuisé", "Validé"),
  createData("6", "Demande achat cahier", "Stock epuisé", "Validé"),
  createData("7", "Demande achat cahier", "Stock epuisé", "Refusé"),
  createData("8", "Demande achat cahier", "Stock epuisé", "Refusé"),
  createData("9", "Demande achat cahier", "Stock epuisé", "Refusé"),
  createData("10", "Demande achat cahier", "Stock epuisé", "En_attente"),
  createData("11", "Demande achat cahier", "Stock epuisé", "Refusé"),
];
