export interface ArticleBCEItem {
    id?: string;
    designation?: string;
    caracteristik?: string;
    quantite?: string;
    pu?: string;
    valueArticle?: string;
    bondeCommandeExterneId?: string;
}
  
export interface ArticleBCEInitialState {
    articleBCEs: ArticleBCEItem[];
    articleBCE: ArticleBCEItem;
    isEditing: boolean;
    loading: boolean;
    [key: string]: any;
}
  