export interface InventaireItem {
    id?: string;
    date_inventaire?: Date;
    date_depreciation?: Date;
    duree_vie?: string;
    etat?: string;
    valeurInventaire?: number;
}
  
export interface InventaireItemInitialState {
    inventaireList: InventaireItem[];
    inventaire: InventaireItem;
    isEditing: boolean;
    loading: boolean;
    [key: string]: any;
}
  