export interface SuiviCarburantItem {
  id?: string;
  materiel?: string;
  date?: Date;
  itineraire?: string;
  personnelTransporte?: string;
  kilometrageFinal?: number;
  pu?: number;
  montant?: number;
  grant?: string;
  ligneBudgetaire?: string;
  modePaiement?: string;
  motif?: string;
  localisation?: string;
  transportationEquipment?: any;
}

export interface SuiviCarburantInitialState {
  suiviCarburants: SuiviCarburantItem[];
  suiviCarburant: SuiviCarburantItem;
  isEditing: boolean;
  loading: boolean;
  [key: string]: any;
}
