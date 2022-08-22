import { HeadCell } from "./HeadCell.interface";

export const consumptionInvoiceHeadCells : readonly HeadCell[] = [
    {
        id: 'invoiceNumber',
        numeric: false,
        disablePadding: true,
        label: 'Numéro de facture',
    },
    {
        id: 'carVoucherId',
        numeric: true,
        disablePadding: false,
        label: 'Numéro de BV',
    },
    {
        id: 'reason',
        numeric: true,
        disablePadding: false,
        label: 'Motif de la course',
    },
    {
        id: 'DepartureKilometrage',
        numeric: true,
        disablePadding: false,
        label: 'Km de départ',
    },
    {
        id: 'arrivalKilometrage',
        numeric: true,
        disablePadding: false,
        label: 'Km arrivé',
    },
]