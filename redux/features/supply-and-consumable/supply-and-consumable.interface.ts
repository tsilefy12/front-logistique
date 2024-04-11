export interface SuplyAndConsumableItem {
  id?: string;
  designation?: string;
  quantity?: number;
  unitPrice?: number;
  SKU?: string;
  uniteStock?:any;
  montant?: number,
  seuil?: number,
  reste?: number,
  moisPrevision?: number;
  fournisseur?: string;
  categorieStock?: string;
  grant?: string;
  vendor?: any;
  categorieStocks?: any;
}

export interface SuplyAndConsumableInitialState {
  suplyAndConsumableList: SuplyAndConsumableItem[];
  suplyAndConsumable: SuplyAndConsumableItem;
  isEditing: boolean;
  loading: boolean;
  [key: string]: any;
}
