import { OrderEquipementHeadCell } from "./orderEquipement.interface";

export const orderequipmentheadCells: readonly OrderEquipementHeadCell[] = [
  {
    id: "designation",
    numeric: false,
    disablePadding: false,
    label: "Designation",
  },
  {
    id: "reason",
    numeric: false,
    disablePadding: false,
    label: "Raison",
  },
  {
    id: "deadlineOfReception",
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
    id: "applicantId",
    numeric: false,
    disablePadding: false,
    label: "Demandeur",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Status",
  },
];
