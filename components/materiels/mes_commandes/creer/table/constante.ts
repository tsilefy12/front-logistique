import { GridRowsProp } from '@mui/x-data-grid';

function createData(
    id: string,
    designation: string,
    quantite: number,
    prix_unitaire : number
  ) {
    return { id, designation, quantite,  prix_unitaire };
  }

 export  const rows = [
    createData('1', 'DWI-SSD', 185,446.6 ),
    createData('2', 'Lego StarWar Edition', 1004, 447.6),
    createData('3', 'iPad', 1005, 446.6),
  ];

  export const initialRows: GridRowsProp = [
    {
        id: 1,
        designation: 'DWI-SSD',
        quantite: 185,
        prix_unitaire: 446.6,
    },
    {
        id: 2,
        designation: 'Lego StarWar Edition',
        quantite: 1004,
        prix_unitaire: 447.6,
    },
    {
        id: 3,
        designation: 'iPad',
        quantite: 1005,
        prix_unitaire: 446.6,
    },
];  