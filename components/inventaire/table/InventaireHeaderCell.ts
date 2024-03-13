import { HeadCell } from "./HeadCell.interface";

export const inventaireHeadCells: readonly HeadCell[] = [
  {
    id: "id_materiel",
    numeric: false,
    disablePadding: false,
    label: "Matériel",
  },
  {
    id: "date_inventaire",
    numeric: false,
    disablePadding: false,
    label: "Date Inventaire",
  },
  {
    id: "date_depreciation",
    numeric: false,
    disablePadding: false,
    label: "Date Dépréciation",
  },
  {
    id: "duree_vie",
    numeric: false,
    disablePadding: false,
    label: "Durée de vie",
  },
  {
    id: "etat_materiel",
    numeric: false,
    disablePadding: false,
    label: "Etat du matériel",
  },
  {
    id: "valeur_inventaire",
    numeric: false,
    disablePadding: false,
    label: "Valeur Inventaire",
  },
 
];
