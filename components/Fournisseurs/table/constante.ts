import { createData } from "./function";
import { HeadCell } from "./type-variable";

export const headCells: readonly HeadCell[] = [
    {
      id: 'nom',
      numeric: false,
      disablePadding: true,
      label: 'nom',
    },
    {
      id: 'adresse',
      numeric: true,
      disablePadding: false,
      label: 'Adresse',
    },
    {
      id: 'tel',
      numeric: true,
      disablePadding: false,
      label: 'Télephone',
    },
    {
      id: 'email',
      numeric: true,
      disablePadding: false,
      label: 'Email',
    },
    {
      id: 'site',
      numeric: true,
      disablePadding: false,
      label: 'Site Web',
    },
  ];

  export const rows = [
    createData('Bessie Cooper', 'Adresse 1', '[252] 555-0121', 'juliano@gmail.com', 'xihuanet.com'),
    createData('Kessie Cooper', 'Adresse 2', '[208] 555-0126', 'kessC@gmail.com', 'xihuanet.com'),
    createData('Sie Cooper', 'Adresse 3', '[252] 555-0111', 'Des@gmail.com', 'xihuanet.com'),
    createData('Cesie Cooper', 'Adresse 4', '[907] 555-0158', 'juliano@gmail.com', 'xihuanet.com'),
    createData('Esie Deker', 'Adresse', '[907] 555-0184', 'juliano@gmail.com', 'xihuanet.com'),
    createData('Dua Cooper', 'Adresse 6', '[252] 555-0451', 'juliano@gmail.com', 'xihuanet.com'),
    createData('Dua Lipa', 'Adresse 2', '[208] 555-0125', 'juliano@gmail.com', 'xihuanet.com'),
    createData('Dua Jean', 'Adresse 3', '[252] 555-2500', 'juliano@gmail.com', 'xihuanet.com'),
    createData('Dua Spencer', 'Adresse 4', '[308] 555-0121', 'juliano@gmail.com', 'xihuanet.com'),
    createData('Brooklyn Simons', 'Adresse', '[907] 555-0164', 'juliano@gmail.com', 'xihuanet.com'),
  
  
  ];