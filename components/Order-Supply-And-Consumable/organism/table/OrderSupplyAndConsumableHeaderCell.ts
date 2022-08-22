import { HeadCell } from "./HeadCell.interface";

export const consumableHeadCells: readonly HeadCell[] = [
  {
    id: "item",
    numeric: false,
    disablePadding: false,
    label: "Article",
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
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Statut",
  },
];
