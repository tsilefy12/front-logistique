import { createData } from "./function";
import { HeadCell } from "./type-variable";

export const headCells: readonly HeadCell[] = [
  {
    id: "designation",
    numeric: false,
    disablePadding: true,
    label: "Designation",
  },
  {
    id: "demandeur",
    numeric: true,
    disablePadding: false,
    label: "Demandeur",
  },
  {
    id: "quantite",
    numeric: true,
    disablePadding: false,
    label: "Quantité",
  },
  {
    id: "deadline_reception",
    numeric: true,
    disablePadding: false,
    label: "Deadline de reception",
  },
  {
    id: "budget_max",
    numeric: true,
    disablePadding: false,
    label: "Budget max",
  },
];

export const rows = [
  createData(
    "Materiel 1",
    "Demandeur 1",
     2,
    "31/07/2022",
    "1 000 000"
  ),
  createData(
    "Materiel 2",
    "Demandeur 2",
    6,
    "31/07/2022",
    "1 000 000"
  ),
  createData(
    "Materiel 3",
    "Demandeur 3",
    2,
    "31/07/2022",
    "1 000 000"
  ),
  createData(
    "Matériel 4",
    "Demandeur 4",
    1,
    "31/07/2022",
    "1 000 000"
  ),
  createData(
    "Materiel 5",
    "Demandeur",
    3,
    "31/07/2022",
    "1 000 000"
  ),
  createData(
    "Materiel 6",
    "Demandeur 6",
    2,
    "31/07/2022",
    "1 000 000"
  ),
  createData(
    "Materel 7",
    "Demandeur 2",
    2,
    "31/07/2022",
    "1 000 000"
  ),
  createData(
    "Material 8",
    "Demandeur 3",
    3,
    "31/07/2022",
    "1 000 000"
  ),
  createData(
    "Materiel 9",
    "Demandeur 4",
    2,
    "31/07/2022",
    "1 000 000"
  ),
  createData(
    "Materiel 10",
    "Demandeur",
    2,
    "31/07/2022",
    "1 000 000"
  ),
];
