export interface GrantItem {
    id?: string;
    dateGrant?: string;
    datePreciation?: Date;
    dureDeVie?: number;
    etatMateriel?: string;
    valeurGrant?: number;
    equipmentId?: string;
    equipment?:any;
}
  
export interface GrantItemInitialState {
    inventaireList: GrantItem[];
    inventaire: GrantItem;
    isEditing: boolean;
    loading: boolean;
    [key: string]: any;
}

export interface LigneBudgetaireItem {
    id?: string;
    dateLigneBudgetaire?: string;
    datePreciation?: Date;
    dureDeVie?: number;
    etatMateriel?: string;
    valeurLigneBudgetaire?: number;
    equipmentId?: string;
    equipment?:any;
}
  
export interface LigneBudgetaireItemInitialState {
    inventaireList: LigneBudgetaireItem[];
    inventaire: LigneBudgetaireItem;
    isEditing: boolean;
    loading: boolean;
    [key: string]: any;
}
  
  