import { HeadCell } from "./HeadCell.interface";

export const equipmentStockHeadCells: readonly HeadCell[] = [
  {
    id: "type",
    numeric: false,
    disablePadding: false,
    label: "Article",
  },
  {
    id: "inStock",
    numeric: false,
    disablePadding: false,
    label: "En Stock",
  },
  {
    id: "inUse",
    numeric: false,
    disablePadding: false,
    label: "En cours d'utilisation",
  },
  {
    id: "isBroken",
    numeric: false,
    disablePadding: false,
    label: "Defectueux",
  },
];
