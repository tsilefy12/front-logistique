export interface bonReceptionItem {
    id?: string;
    bce?: string;
    dateReception?: string;
}
  
export interface bonReceptionInitialState {
    bonReceptions: bonReceptionItem[];
    bonReception: bonReceptionItem;
    isEditing: boolean;
    loading: boolean;
    [key: string]: any;
}
  