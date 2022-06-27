import { createData } from "./function";
import { HeadCell } from "./type-variable";

export const headCells: readonly HeadCell[] = [
    {
      id: 'numero',
      numeric: false,
      disablePadding: true,
      label: 'Numéro',
    },
    {
      id: 'reference',
      numeric: true,
      disablePadding: false,
      label: 'Référence',
    },
    {
      id: 'fournisseur',
      numeric: true,
      disablePadding: false,
      label: 'Fourniseur',
    },
    {
      id: 'date',
      numeric: true,
      disablePadding: false,
      label: 'Date de livraison',
    },
    {
      id: 'commande',
      numeric: true,
      disablePadding: false,
      label: 'Commande lié',
    },
  ];

  export const rows = [
    createData('BC 000 001', 'Réference 1', 'Cameron Williamson', '01/01/2022', 'COMD001'),
    createData('BC 000 001', 'Réference 1', 'Cameron Williamson', '01/01/2022', 'COMD001'),
    createData('BC 000 001', 'Réference 1', 'Cameron Williamson', '01/01/2022', 'COMD001'),
    createData('BC 000 001', 'Réference 1', 'Cameron Williamson', '01/01/2022', 'COMD001'),
    createData('BC 000 001', 'Réference 1', 'Cameron Williamson', '01/01/2022', 'COMD001'),
    createData('BC 000 001', 'Réference 1', 'Cameron Williamson', '01/01/2022', 'COMD001'),
    createData('BC 000 001', 'Réference 1', 'Cameron Williamson', '01/01/2022', 'COMD001'),
    createData('BC 000 001', 'Réference 1', 'Cameron Williamson', '01/01/2022', 'COMD001'),
    createData('BC 000 001', 'Réference 1', 'Cameron Williamson', '01/01/2022', 'COMD001'),
  
  ];