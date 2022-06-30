import { CreateEtatMateriel } from "./function-etatmateriel";
import { HeadCellEtatMateriel } from "./type-variable-etatmateriel";

export const headCellsEtatMateriel: readonly HeadCellEtatMateriel[] = [
  {
    id: "etat",
    numeric: false,
    disablePadding: true,
    label: "Etat article",
  },
];

export const rowssmie = [
  CreateEtatMateriel("Etat 1"),
  CreateEtatMateriel("Etat 2"),
  CreateEtatMateriel("Etat 3"),
  CreateEtatMateriel("Etat 4"),
  CreateEtatMateriel("Etat 6"),
  CreateEtatMateriel("Etat 7"),
  CreateEtatMateriel("Etat 8"),
  CreateEtatMateriel("Etat 9"),
  CreateEtatMateriel("Etat 10"),
  CreateEtatMateriel("Etat 11"),
  CreateEtatMateriel("Etat 12"),
  CreateEtatMateriel("Etat 13"),
  CreateEtatMateriel("Etat 14"),
  CreateEtatMateriel("Etat 15"),
];
