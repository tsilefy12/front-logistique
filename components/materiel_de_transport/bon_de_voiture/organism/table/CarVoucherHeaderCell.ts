import { HeadCell } from "./HeadCell.interface";

export const carVoucherHeadCells : readonly HeadCell[] = [
    {
        id: 'number',
        numeric: false,
        disablePadding: true,
        label: 'Numéro BV',
    },
    {
        id: 'registration',
        numeric: true,
        disablePadding: false,
        label: 'Immatriculation',
    },
    {
        id: 'type',
        numeric: true,
        disablePadding: false,
        label: 'Type',
    },
    {
        id: 'departureDate',
        numeric: true,
        disablePadding: false,
        label: 'Date et heure de depart',
    },
    {
        id: 'arrivalDate',
        numeric: true,
        disablePadding: false,
        label: 'Date et heure de retour',
    },
]