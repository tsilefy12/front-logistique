import { HeadCell } from "./HeadCell.interface";

export const BonReceptionHeadCells: readonly HeadCell[] = [
    {
        id: "reference",
        numeric: false,
        disablePadding: false,
        label: "Réference",
    },
    {
        id: "bce",
        numeric: false,
        disablePadding: false,
        label: "Ref BCE / BCI",
    },
    {
        id: "dateReception",
        numeric: false,
        disablePadding: false,
        label: "Date de Reception",
    }
];
