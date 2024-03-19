export interface PvComparaisonItem {
    id?: string;
    objet?: string;
    ref?: string;
    programme?: string;
    grant?: string;
    ligneBudgetaire?: string;
    materiel?: string;
    offreRetenu?: string;
    justification?: string;
    argument?: string;
    TableComparaison?:any
}
  
export interface PvComparaisonInitialState {
    pvComparaisons: PvComparaisonItem[];
    pvComparaison: PvComparaisonItem;
    isEditing: boolean;
    loading: boolean;
    [key: string]: any;
}
  