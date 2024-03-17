export interface articleTransfertItem {
    id?: string;
    designation?: string;
    quantiteCommander?: number;
    quantiteExpedie?: string;
    observation?: string;
    bonTransfertId?: string;
}
  
export interface articleTransfertInitialState {
    articleTransferts: articleTransfertItem[];
    articleTransfert: articleTransfertItem;
    isEditing: boolean;
    loading: boolean;
    [key: string]: any;
}
  