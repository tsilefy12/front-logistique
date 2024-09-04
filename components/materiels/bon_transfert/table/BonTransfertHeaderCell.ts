import { HeadCell } from "./HeadCell.interface";

export const BonTransfertHeadCells: readonly HeadCell[] = [
  {
    id: "reference",
    numeric: false,
    disablePadding: false,
    label: "Référence",
  },
  {
    id: "expediteur",
    numeric: false,
    disablePadding: false,
    label: "Expéditeur",
  },
  {
    id: "destination",
    numeric: false,
    disablePadding: false,
    label: "Destinataire",
  },
  {
    id: "dateExp",
    numeric: false,
    disablePadding: false,
    label: "Date d'expédition",
  },
  {
    id: "expeditionVia",
    numeric: false,
    disablePadding: false,
    label: "Expédition via",
  },
  {
    id: "programme",
    numeric: false,
    disablePadding: false,
    label: "Programme",
  },
  {
    id: "grant",
    numeric: false,
    disablePadding: false,
    label: "Grant",
  },
];
