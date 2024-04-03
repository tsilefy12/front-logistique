export interface PvComparaisonItem {
    id?: string;
    objet?: string,
    programme?: string,
    grant?: number,
    ligneBudgetaire?: number,
    materiel?: string,
    motif?: string,
    argument?: string,
    bci?: string,
    bce?: string,
    TableComparaison?:any
}
export interface PvComparaisonInitialState {
    pvComparaisons: PvComparaisonItem[];
    pvComparaison: PvComparaisonItem;
    isEditing: boolean;
    loading: boolean;
    [key: string]: any;
}
  