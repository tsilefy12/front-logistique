import { createData } from "./function";
import { HeadCell } from "./type-variable";

export const headCells: readonly HeadCell[] = [
    {
      id: 'immatriculation',
      numeric: false,
      disablePadding: true,
      label: 'Immatriculation',
    },
    {
      id: 'type',
      numeric: true,
      disablePadding: false,
      label: 'Type',
    },
    {
      id: 'marque',
      numeric: true,
      disablePadding: false,
      label: 'Marque',
    },
    {
      id: 'autre_information',
      numeric: true,
      disablePadding: false,
      label: 'Autre information',
    },
  ];

  export const rows = [
    createData('Bessie Cooper', 'Adresse 1', '[252] 555-0121', 'juliano@gmail.com'),
    createData('Kessie Cooper', 'Adresse 2', '[208] 555-0126', 'kessC@gmail.com'),
    createData('Sie Cooper', 'Adresse 3', '[252] 555-0111', 'Des@gmail.com'),
    createData('Cesie Cooper', 'Adresse 4', '[907] 555-0158', 'juliano@gmail.com'),
    createData('Esie Deker', 'Adresse', '[907] 555-0184', 'juliano@gmail.com'),
    createData('Dua Cooper', 'Adresse 6', '[252] 555-0451', 'juliano@gmail.com'),
    createData('Dua Lipa', 'Adresse 2', '[208] 555-0125', 'juliano@gmail.com'),
    createData('Dua Jean', 'Adresse 3', '[252] 555-2500', 'juliano@gmail.com'),
    createData('Dua Spencer', 'Adresse 4', '[308] 555-0121', 'juliano@gmail.com'),
    createData('Brooklyn Simons', 'Adresse', '[907] 555-0164', 'juliano@gmail.com'),
  
  
  ];