import { createData } from "./function";
import { HeadCell } from "./type-variable";

export const headCells: readonly HeadCell[] = [
  {
    id: "date",
    numeric: false,
    disablePadding: true,
    label: "Date",
  },
  {
    id: "type",
    numeric: true,
    disablePadding: false,
    label: "Type",
  },
  {
    id: "quantité",
    numeric: true,
    disablePadding: false,
    label: "Quantité",
  },
  {
    id: "quantité_stocké",
    numeric: true,
    disablePadding: false,
    label: "Quantité stocké",
  },
  {
    id: "prix_Unitaire",
    numeric: true,
    disablePadding: false,
    label: "Prix Unitaire",
  },
  {
    id: "valeur_stockée",
    numeric: true,
    disablePadding: false,
    label: "Valeur stockée",
  },
  
];

export const rows = [
  createData('2022/12/03',"Entrée","100","561",'328.5','779.58'),
  createData('2017/08/17',"Sortie","100","561",'328.5','779.58'),
  createData('2022/12/03',"Entrée","100","561",'328.5','779.58')
];
