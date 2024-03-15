export interface PvComparaisonItem {
    id?: string;
    objet?: string;
    ref?: string;
    programme?: string;
    grant?: string;
    ligneBudgetaire?: string;
    materiel?: Date;
    offreRetenu?: string;
    justification?: string;
    argument?: string;
}
  
export interface PvComparaisonInitialState {
    pvComparaisons: PvComparaisonItem[];
    pvComparaison: PvComparaisonItem;
    isEditing: boolean;
    loading: boolean;
    [key: string]: any;
}
  