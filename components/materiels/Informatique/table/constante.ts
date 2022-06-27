import { createData } from "./function";
import { HeadCell } from "./type-variable";

export const headCells: readonly HeadCell[] = [
    {
      id: 'num',
      numeric: false,
      disablePadding: true,
      label: 'N°Optim',
    },
    {
      id: 'type',
      numeric: true,
      disablePadding: false,
      label: 'Type',
    },
    {
      id: 'user',
      numeric: true,
      disablePadding: false,
      label: 'Utilisateur',
    },
    {
      id: 'designation',
      numeric: true,
      disablePadding: false,
      label: 'Désignation',
    },
    {
      id: 'etat',
      numeric: true,
      disablePadding: false,
      label: 'Etat',
    },
  ];

  export const rows = [
    createData('CH1', 'Chaise', 'Frozen Yogurt', 'chaise roulante','Bon état'),
    createData('CH2', 'Ordinateur', 'Frozen Yogurt', 'ordinateur portable','Amorti'),
    createData('CH3', 'Ordinateur', 'Frozen Yogurt','ordinateur de bureau', 'Bon état'),
    createData('CH4', 'Chaise', 'Frozen Yogurt', 'chaise de bureau','Inutilisable'),
    createData('CH5', 'Chaise', 'Frozen Yogurt','canapé', 'Bon état'),
    createData('CH6', 'Chaise', 'Frozen Yogurt','chaise simple', 'Bon état'),
    createData('CH7', 'Chaise', 'Frozen Yogurt','canape', 'Amorti'),
    createData('CH8', 'Chaise', 'Frozen Yogurt', 'chaise de jardin','Bon état'),
    createData('CH9', 'Chaise', 'Frozen Yogurt','chaise simple', 'Inutilisable'),
  
  
  ];