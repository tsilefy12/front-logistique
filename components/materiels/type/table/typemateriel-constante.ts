import { createDataTypeMateriel } from './typemateriel-function';
import { TypeMaterielHeadCell } from './typemateriel-type-variable';

export const typematerielheadCells: readonly TypeMaterielHeadCell[] = [
    {
        id : 'type',
        numeric: false,
        disablePadding: true,
        label: 'Type de materiel',
    },
    {
        id : 'prefix',
        numeric: false,
        disablePadding: true,
        label: 'Préfix',
    },
];

export const typematerielrows = [
    createDataTypeMateriel('Type_1','Pr_1'),
    createDataTypeMateriel('Type_2','Pr_2'),
    createDataTypeMateriel('Type_3','Pr_3'),
    createDataTypeMateriel('Type_4','Pr_4'),
    createDataTypeMateriel('Type_5','Pr_5'),
    createDataTypeMateriel('Type_6','Pr_6'),
    createDataTypeMateriel('Type_7','Pr_7'),
    createDataTypeMateriel('Type_8','Pr_8'),
    createDataTypeMateriel('Type_9','Pr_9'),
    createDataTypeMateriel('Type_10','Pr_10'),
    createDataTypeMateriel('Type_11','Pr_11'),
];