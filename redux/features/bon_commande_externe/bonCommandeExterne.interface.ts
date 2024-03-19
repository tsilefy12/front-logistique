export interface BonCommandeExterneItem {
    id?: string;
    ref?: string;
    dateCommande?: Date;
    fournisseur?: string;
    bci?: string;
    modePaiement?: string;
    conditionLivraison?: string;
    dateLivraison?: Date;
    ArticleCommandeBce?:any
}
  
export interface BonCommandeExternInitialState {
    bonCommandeExternes: BonCommandeExterneItem[];
    bonCommandeExterne: BonCommandeExterneItem;
    isEditing: boolean;
    loading: boolean;
    [key: string]: any;
}
  