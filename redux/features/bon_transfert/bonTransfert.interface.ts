export interface bonTransfertItem {
    id?: string;
    expediteur?: string;
    destination?: string;
    dateExp?:Date;
    expeditionVia?: string;
    departement?:string;
    grant?: string;
}
  
export interface bonTransfertInitialState {
    bonTransferts: bonTransfertItem[];
    bonTransfert: bonTransfertItem;
    isEditing: boolean;
    loading: boolean;
    [key: string]: any;
}
  