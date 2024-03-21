export interface bonReceptionItem {
    id?: string;
    bce?: string;
    dateReception?: Date;
    ProduitRecu?: any;
}
  
export interface bonReceptionInitialState {
    bonReceptions: bonReceptionItem[];
    bonReception: bonReceptionItem;
    isEditing: boolean;
    loading: boolean;
    [key: string]: any;
}
  