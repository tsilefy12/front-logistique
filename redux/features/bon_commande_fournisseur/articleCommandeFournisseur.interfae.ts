export interface ArticleCommandeFournisseurItem {
    id?:string;
    designation?:string;
    unitPrice?:number;
    unite?:string;
    montant?:number;
    details?:string;
    bonCommandeFournisseurId?:string;
}

export interface ArticleCommandeFournisseurInitialState {
    articleCommandeVendors : ArticleCommandeFournisseurItem[];
    articleCommandeVendor:ArticleCommandeFournisseurItem;
    loading: boolean;
    isEditing: boolean;
    [key: string]: any;
}