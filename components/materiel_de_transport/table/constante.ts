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
    createData('6733WWF', 'Voiture', 'Mercedece', 'juliano@gmail.com'),
    createData('1263ABC', 'Voiture', 'Nissan', 'kessC@gmail.com'),
    createData('8888WWF', 'Moto', 'Honda', 'Des@gmail.com'),
    createData('6772TT', 'Moto', 'Honda', 'juliano@gmail.com'),
    createData('B0001', 'Bicyclette', 'Peugeot', 'juliano@gmail.com'),
  ];