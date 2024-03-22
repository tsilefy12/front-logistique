export interface personneConcernerItem {
    id?: string;
    nomPrenom?: string,
    cin?: string,
    fonction?: string,
    designation?: string,
    ficheDotationId?: string
}
  
export interface personneConcernerItemInitialState {
    personeConcerners: personneConcernerItem[];
    personneConcerner: personneConcernerItem;
    isEditing: boolean;
    loading: boolean;
    [key: string]: any;
}
  