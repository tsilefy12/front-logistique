import { HeadCell } from "./HeadCell.interface";

export const transportEquipmentHeadCells : readonly HeadCell[] = [
    {
        id: 'registration',
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
        id: 'brand',
        numeric: true,
        disablePadding: false,
        label: 'Marque',
    },
    {
        id: 'otherInformation',
        numeric: true,
        disablePadding: false,
        label: 'Autre information',
    },
]