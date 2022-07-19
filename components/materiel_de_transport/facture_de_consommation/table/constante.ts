import { createData } from "./function";
import { HeadCell } from "./type-variable";

export const headCells: readonly HeadCell[] = [
    {
      id: 'numero_facture',
      numeric: false,
      disablePadding: true,
      label: 'Numéro de facture',
    },
    {
      id: 'numero_BV',
      numeric: true,
      disablePadding: false,
      label: 'Numéro de BV',
    },
    {
      id: 'motif_de_la_course',
      numeric: true,
      disablePadding: false,
      label: 'Motif de la course',
    },
    {
      id: 'km_depart',
      numeric: true,
      disablePadding: false,
      label: 'Km de depart',
    },
    {
      id: 'km_arrive',
      numeric: true,
      disablePadding: false,
      label: "Km d'arrivé",
    },
  ];

  export const rows = [
    createData('FATC001', 'BV001', 'Supérvision AT', '10001','10500'),
    createData('FATC002', 'BV002', 'Supérvision AT', '10500','11000'),
    createData('FATC003', 'BV003', 'Supérvision AT', '11500','12000'),
    createData('FATC004', 'BV004', 'Supérvision AT', '12000','12500'),
    createData('FATC005', 'BV005', 'Supérvision AT', '12500','13000'),
    createData('FATC006', 'BV006', 'Supérvision AT', '13000','13500'),
  ];