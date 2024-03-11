import { createData } from "./function";
import { HeadCell } from "./type-variable";

export const headCells: readonly HeadCell[] = [
  {
    id: "article",
    numeric: false,
    disablePadding: true,
    label: "Article",
  },
  {
    id: "demandeur",
    numeric: true,
    disablePadding: false,
    label: "Demandeur",
  },
  {
    id: "quantite_demander",
    numeric: true,
    disablePadding: false,
    label: "Quantité démandée",
  },
  {
    id: "quantite_livrer",
    numeric: true,
    disablePadding: false,
    label: "Quantité livrée",
  },
  {
    id: "date_livraison",
    numeric: true,
    disablePadding: false,
    label: "Dete de livraison",
  },
  {
    id: "approvision",
    numeric: true,
    disablePadding: false,
    label: "Approvision",
  },
];

export const rows = [
  createData(
    "1",
    "Cahier",
    "Employé 1",
    1,
    1,
    "07/05/2016",
    "test"
  ),
  createData(
    "2",
    "Cahier",
    "Employé 2",
    2,
    1,
    "12/06/2020",
    "test"
  ),
  createData(
    "3",
    "Stylo rouge",
    "Employé 1",
    5,
    5,
    "28/10/2020",
    "test"
  ),
  createData(
    "4",
    "Crayon",
    "Employé 1",
    1,
    1,
    "15/08/2020",
    "test"
  ),
];
