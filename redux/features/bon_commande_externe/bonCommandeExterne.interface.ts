export interface BonCommandeExterneItem {
    id?: string;
    ref?: string;
    dateCommande?: Date;
    demandeur?:string;
    objet?: string;
    type?:string;
    beneficiaire?:string;
    modePaiement?: string;
    conditionLivraison?: string;
    pieceJointe?: string;
    bonCommandeInterne?:any;
    articleCommandeBce?:any;
}
  
export interface BonCommandeExternInitialState {
    bonCommandeExternes: BonCommandeExterneItem[];
    bonCommandeExterne: BonCommandeExterneItem;
    isEditing: boolean;
    loading: boolean;
    [key: string]: any;
}
  