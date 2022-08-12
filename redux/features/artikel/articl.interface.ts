export interface ArticlItem{
    id?: string;
    designation?: string;
    quantity?: number;
    unitPrice?: number;
    SKU?: string;
}

export interface ArticlInitialState {
    articls: ArticlItem[];
    articl: ArticlItem;
    isEditing: boolean;
    loading: boolean;
    [key: string]: any;
}