export interface ArticleCommandeItem {
    id?: string;
    designation?: string;
    caracteristik?: string;
    quantite?: number;
    pu?: number;
    valueArticle?: number;
    bondeCommandeInterneId?: string
}
  
export interface ArticleCommandeInitialState {
    articleCommandeInternes: ArticleCommandeItem[];
    articleCommandeInterne: ArticleCommandeItem;
    isEditing: boolean;
    loading: boolean;
    [key: string]: any;
}
  