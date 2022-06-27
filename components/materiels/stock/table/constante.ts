import { HeadCell } from "./type-variable";
import Data, { Order } from "./type-variable";

export function createData(
article: string,
stock: string,
utilisation: string,
defectueux: string,

): Data {
return {
article,
stock,
utilisation,
defectueux,

};
}

export const headCells: readonly HeadCell[] = [
    {
      id: 'article',
      numeric: false,
      disablePadding: true,
      label: 'Article',
    },
    {
      id: 'stock',
      numeric: true,
      disablePadding: false,
      label: 'En Stock',
    },
    {
      id: 'utilisation',
      numeric: true,
      disablePadding: false,
      label: "En cours d'utilisation",
    },
    {
      id: 'defectueux',
      numeric: true,
      disablePadding: false,
      label: 'Defectueux',
    },
    
  ];

  export const rows = [
    createData('Dell Computeur Monitor', '17', '17', '2'),
    createData('Air Jordan 1 top 3 Sneaker(DS)', '3', '8', '3'),
    createData('Macbook pro 16 inch(2020) for sale', '16', '9', '5'),
    createData('Go pro hero 7', '4', '12', '1'),
    createData('Playstation 4 Limited Edition(with games)', '14', '10', '4'),  
  ];
