export interface BonCommandeItem {
    id?: string;
    programme?: string;
    grant?: string;
    ligneBudgetaire?: string;
    demandeur?: string;
    numBon?: string;
    dateBonCommande?: Date;
    numBonCommande?: string;
}
  
export interface BonCommandeInternInitialState {
    bonCommandeInternes: BonCommandeItem[];
    bonCommandeInterne: BonCommandeItem;
    isEditing: boolean;
    loading: boolean;
    [key: string]: any;
    grants: [];
    ligneBudgetaires: [];
    demandeurs: [];
}
  