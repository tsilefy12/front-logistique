export interface typeProduitItem {
    id?: string;
    typeProduct?: string;
}
  
export interface typeProduitInitialState {
    typeProduits: typeProduitItem[];
    typeProduit: typeProduitItem;
    isEditing: boolean;
    loading: boolean;
    [key: string]: any;
}