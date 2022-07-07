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
    createData('Bessie Cooper', 'Adresse 1', '[252] 555-0121', 'juliano@gmail.com','date'),
    createData('Kessie Cooper', 'Adresse 2', '[208] 555-0126', 'kessC@gmail.com','date'),
    createData('Sie Cooper', 'Adresse 3', '[252] 555-0111', 'Des@gmail.com','date'),
    createData('Cesie Cooper', 'Adresse 4', '[907] 555-0158', 'juliano@gmail.com','date'),
    createData('Esie Deker', 'Adresse', '[907] 555-0184', 'juliano@gmail.com','date'),
    createData('Dua Cooper', 'Adresse 6', '[252] 555-0451', 'juliano@gmail.com','date'),
    createData('Dua Lipa', 'Adresse 2', '[208] 555-0125', 'juliano@gmail.com','date'),
    createData('Dua Jean', 'Adresse 3', '[252] 555-2500', 'juliano@gmail.com','date'),
    createData('Dua Spencer', 'Adresse 4', '[308] 555-0121', 'juliano@gmail.com','date'),
    createData('Brooklyn Simons', 'Adresse', '[907] 555-0164', 'juliano@gmail.com','date'),
  
  
  ];