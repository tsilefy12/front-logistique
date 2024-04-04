export interface PvComparaisonItem {
    id?: string;
    objet?: string,
    programme?: string,
    grant?: number,
    ligneBudgetaire?: number,
    materiel?: string,
    bci?: string,
    bce?: string,
    offre?:string,
    tableComparaison?:any,
    bonDeCommandeExterne?:any;
    bonDeCommandeInterne?:any;
}
export interface PvComparaisonInitialState {
    pvComparaisons: PvComparaisonItem[];
    pvComparaison: PvComparaisonItem;
    isEditing: boolean;
    loading: boolean;
    [key: string]: any;
}
  