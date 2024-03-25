export interface ArticleBCEItem {
    id?: string;
    designation?: string;
    caracteristik?: string;
    quantite?: number;
    pu?: number;
    fournisseur?: string;
    vendor?:any;
    valueArticle?: number;
    bonDeCommandeExterneId?: string
}
  
export interface ArticleBCEInitialState {
    articleBCEs: ArticleBCEItem[];
    articleBCE: ArticleBCEItem;
    isEditing: boolean;
    loading: boolean;
    [key: string]: any;
}
  