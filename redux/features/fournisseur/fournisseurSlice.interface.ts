export interface FournisseurItem {
  id?: string;
  name?: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
}

export interface FournisseurInitialState {
  fournisseurList: FournisseurItem[];
  fournisseur: FournisseurItem;
  isEditing: boolean;
  loading: boolean;
  [key: string]: any;
}
