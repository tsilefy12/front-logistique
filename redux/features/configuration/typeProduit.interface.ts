export interface typeProduitItem {
    id?: string;
    typeProduct?: string;
}
  
export interface TypeProduitInitialState {
    typeProduits: typeProduitItem[];
    typeProduit: typeProduitItem;
    isEditing: boolean;
    loading: boolean;
    [key: string]: any;
}