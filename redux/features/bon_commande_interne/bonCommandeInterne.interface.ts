export interface BonCommandeItem {
    id?: string;
    programme?: string;
    grant?: string;
    ligneBudgetaire?: string;
    demandeur?: string;
    numBon?: string;
    dateBonCommande?: Date;
    numBonCommande?: string;
    montantTotal?: number;
    ArticleCommande?:any;
    owner?:any;
}
  
export interface BonCommandeInternInitialState {
    bonCommandeInternes: BonCommandeItem[];
    bonCommandeInterne: BonCommandeItem;
    isEditing: boolean;
    loading: boolean;
    [key: string]: any;
}
  