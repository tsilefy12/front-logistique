export interface ModePaiementItem {
  id?: string;
  modePaiementMV?: string;
}

export interface ModePaiementInitialState {
  modePaiements: ModePaiementItem[];
  modePaiement: ModePaiementItem;
  isEditing: boolean;
  loading: boolean;
  [key: string]: any;
}
