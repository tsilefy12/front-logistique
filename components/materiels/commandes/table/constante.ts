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
    "Bessie Cooper",
    "Demandeur 1",
     2,
    "juliano@gmail.com",
    "xihuanet.com"
  ),
  createData(
    "Kessie Cooper",
    "Demandeur 2",
    6,
    "kessC@gmail.com",
    "xihuanet.com"
  ),
  createData(
    "Sie Cooper",
    "Demandeur 3",
    2,
    "Des@gmail.com",
    "xihuanet.com"
  ),
  createData(
    "Cesie Cooper",
    "Demandeur 4",
    1,
    "juliano@gmail.com",
    "xihuanet.com"
  ),
  createData(
    "Esie Deker",
    "Demandeur",
    3,
    "juliano@gmail.com",
    "xihuanet.com"
  ),
  createData(
    "Dua Cooper",
    "Demandeur 6",
    2,
    "juliano@gmail.com",
    "xihuanet.com"
  ),
  createData(
    "Dua Lipa",
    "Demandeur 2",
    2,
    "juliano@gmail.com",
    "xihuanet.com"
  ),
  createData(
    "Dua Jean",
    "Demandeur 3",
    3,
    "juliano@gmail.com",
    "xihuanet.com"
  ),
  createData(
    "Dua Spencer",
    "Demandeur 4",
    2,
    "juliano@gmail.com",
    "xihuanet.com"
  ),
  createData(
    "Brooklyn Simons",
    "Demandeur",
    2,
    "juliano@gmail.com",
    "xihuanet.com"
  ),
];
