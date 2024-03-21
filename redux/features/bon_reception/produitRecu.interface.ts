export interface produitRecuItem {
    id?: string;
    designation?: string;
    quantite?: number;
    bonDeReceptionId?: string;
}
  
export interface produitRecuInitialState {
    produitRecus: produitRecuItem[];
    produitRecu: produitRecuItem;
    isEditing: boolean;
    loading: boolean;
    [key: string]: any;
}
  