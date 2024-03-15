export interface PvComparaisonFournisseurItem {
    id?: string;
    fournisseur?: string;
    modePaie?: string;
    offre?: string;
    designation?: string;
    pvComparaisonId?:string;
}
  
export interface PvComparaisonFournisseurInitialState {
    pvComparaisonFournisseurs: PvComparaisonFournisseurItem[];
    pvComparaisonFournisseur: PvComparaisonFournisseurItem;
    isEditing: boolean;
    loading: boolean;
    [key: string]: any;
}
  