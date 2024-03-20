export interface bonTransfertItem {
    id?: string;
    expediteur?: string;
    designation?: string;
    dateExp?:Date;
    expeditionVia?: string;
    departement?:string;
    grant?: string;
    ArticleTransfert?: any;
}
  
export interface bonTransfertInitialState {
    bonTransferts: bonTransfertItem[];
    bonTransfert: bonTransfertItem;
    isEditing: boolean;
    loading: boolean;
    [key: string]: any;
}
  