import { OrderEquipmentHeadCell } from "./orderEquipment.interface";

export const orderequipmentheadCells: readonly OrderEquipmentHeadCell[] = [
  {
    id: "designation",
    numeric: false,
    disablePadding: false,
    label: "Designation",
  },
  // {
  //   id: "demandeur",
  //   numeric: false,
  //   disablePadding: false,
  //   label: "Demandeur",
  // },
  {
    id: "quantite",
    numeric: false,
    disablePadding: false,
    label: "Quantité",
  },
  {
    id: "deadline_reception",
    numeric: false,
    disablePadding: false,
    label: "Deadline de reception",
  },
  {
    id: "numberOfAuthorisedOffersPossible",
    numeric: false,
    disablePadding: false,
    label: "Nombre offre possible",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Status",
  },
];
