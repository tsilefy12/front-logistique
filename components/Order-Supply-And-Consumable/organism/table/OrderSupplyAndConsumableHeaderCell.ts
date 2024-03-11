import { HeadCell } from "./HeadCell.interface";

export const consumableHeadCells: readonly HeadCell[] = [
  {
    id: "item",
    numeric: false,
    disablePadding: false,
    label: "Fiche de stock",
  },
  {
    id: "applicantId",
    numeric: false,
    disablePadding: false,
    label: "Demandeur",
  },
  {
    id: "requestedQuantity",
    numeric: false,
    disablePadding: false,
    label: "Quantité démandée",
  },
  {
    id: "deliveredQuantity",
    numeric: false,
    disablePadding: false,
    label: "Quantité livrée",
  },
  {
    id: "deliveryDate",
    numeric: false,
    disablePadding: false,
    label: "Date de livraison",
  },
  {
    id: "approvision",
    numeric: false,
    disablePadding: false,
    label: "Approvision",
  },
  {
    id: "Observation",
    numeric: false,
    disablePadding: false,
    label: "Observation",
  },
];
