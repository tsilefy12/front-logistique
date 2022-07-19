import { createData } from "./function";
import { HeadCell } from "./type-variable";

export const headCells: readonly HeadCell[] = [
    {
      id: 'numero_BV',
      numeric: false,
      disablePadding: true,
      label: 'Numéro BV',
    },
    {
      id: 'immatriculation',
      numeric: true,
      disablePadding: false,
      label: 'Immatriculation',
    },
    {
      id: 'numero_OM',
      numeric: true,
      disablePadding: false,
      label: 'Numéro OM',
    },
    {
      id: 'date_et_heure_de_depart',
      numeric: true,
      disablePadding: false,
      label: 'Date et heure de depart',
    },
    {
      id: 'date_et_heure_d_arrive',
      numeric: true,
      disablePadding: false,
      label: "Date et heure d'arrivé",
    },
  ];

  export const rows = [
    createData('BV001', '7278ABS1', 'OM 0001', '7/02/2002 01:11','14/06/2012 15:26'),
    createData('BV002', '7278ABS2', 'OM 0002', '17/02/2002 01:11','1/06/2012 15:26'),
    createData('BV003', '7278ABS3', 'OM 0003', '27/02/2002 01:11','4/06/2012 15:26'),
    createData('BV004', '7278ABS4', 'OM 0004', '1/02/2002 01:11','12/06/2012 15:26'),
    createData('BV005', '7278ABS', 'OM 0005', '11/02/2002 01:11','24/06/2012 15:26'),
    createData('BV006', '7278ABS6', 'OM 0006', '12/02/2002 01:11','12/06/2012 15:26'),
  ];