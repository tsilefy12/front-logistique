export interface BonCommandeExterneItem {
    id?: string;
    ref?: string;
    dateCommande?: Date;
    fournisseur?: string;
    demandeur?:string;
    bci?: string;
    type?:string;
    modePaiement?: string;
    conditionLivraison?: string;
    pieceJointe?: string;
    ArticleCommandeBce?:any;
}
  
export interface BonCommandeExternInitialState {
    bonCommandeExternes: BonCommandeExterneItem[];
    bonCommandeExterne: BonCommandeExterneItem;
    isEditing: boolean;
    loading: boolean;
    [key: string]: any;
}
  