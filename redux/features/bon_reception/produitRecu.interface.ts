export interface produitRecuItem {
    id?: string;
    designation?: string;
    quantite?: string;
    bonReceptionId?: string;
}
  
export interface produitRecuInitialState {
    produitRecus: produitRecuItem[];
    produitRecu: produitRecuItem;
    isEditing: boolean;
    loading: boolean;
    [key: string]: any;
}
  