export interface PvComparaisonFournisseurItem {
    id?: string;
    fournisseur?: string,
    modePaie?: string,
    amount?: number,
    designation?: string,
    pvComparaisonOffreId?: string
}
  
export interface PvComparaisonFournisseurInitialState {
    pvComparaisonFournisseurs: PvComparaisonFournisseurItem[];
    pvComparaisonFournisseur: PvComparaisonFournisseurItem;
    isEditing: boolean;
    loading: boolean;
    [key: string]: any;
}
  