export interface ArticleCommandeItem {
    id?: string;
    designation?: string;
    caracteristik?: string;
    quantite?: string;
    pu?: string;
    valueArticle?: string;
    bondeCommandeInterneId?: string;
}
  
export interface ArticleCommandeInitialState {
    articleCommandeInternes: ArticleCommandeItem[];
    articleCommandeInterne: ArticleCommandeItem;
    isEditing: boolean;
    loading: boolean;
    [key: string]: any;
}
  