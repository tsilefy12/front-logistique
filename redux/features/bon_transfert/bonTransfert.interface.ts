export interface bonTransfertItem {
    id?: string;
    expediteur?: string;
    expediteurData?:any;
    designation?: string;
    destination?:any;
    reference?:string;
    dateExp?: Date;
    expeditionVia?: string;
    departement?: string;
    grant?: string;
    type?: string;
    articleTransfert?: any;
}
  
export interface bonTransfertInitialState {
    bonTransferts: bonTransfertItem[];
    bonTransfert: bonTransfertItem;
    isEditing: boolean;
    loading: boolean;
    [key: string]: any;
}
  