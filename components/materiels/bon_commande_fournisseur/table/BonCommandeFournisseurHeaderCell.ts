import { HeadCell } from "./HeadCell.interface";

export const BonCommandeFournisseurHeadCells: readonly HeadCell[] = [
    {
        id: "vendor",
        numeric: false,
        disablePadding: false,
        label: "Fournisseur",
    },
    {
        id: "establishmentDate",
        numeric: false,
        disablePadding: false,
        label: "Date d'etablissement",
    },
    {
        id: "payementMethod",
        numeric: false,
        disablePadding: false,
        label: "Mode de paiement",
    },
    {
        id: "deliveryCondition",
        numeric: false,
        disablePadding: false,
        label: "Condition de livraison",
    },
    {
        id: "deliveryDate",
        numeric: false,
        disablePadding: false,
        label: "Date de livraison",
    }
];
