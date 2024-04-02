export interface SuplyAndConsumableItem {
  id?: string;
  designation?: string;
  quantity?: number;
  unitPrice?: number;
  SKU?: string;
  uniteStock?:any;
  montant?: number,
  seuil?: number,
  moisPrevision?: string;
  fournisseur?: string;
  categorieStock?: string;
  grant?: string;
}

export interface SuplyAndConsumableInitialState {
  suplyAndConsumableList: SuplyAndConsumableItem[];
  suplyAndConsumable: SuplyAndConsumableItem;
  isEditing: boolean;
  loading: boolean;
  [key: string]: any;
}
