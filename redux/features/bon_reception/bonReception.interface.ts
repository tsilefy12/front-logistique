export interface bonReceptionItem {
    id?: string;
    bce?: string;
    reference?: string;
    dateReception?: Date;
    produitRecu?: any;
    bonDeCommandeExterne?:any;
}
  
export interface bonReceptionInitialState {
    bonReceptions: bonReceptionItem[];
    bonReception: bonReceptionItem;
    isEditing: boolean;
    loading: boolean;
    [key: string]: any;
}
  