export interface ficheDotationItem {
    id?: string;
    date?: Date;
    region?: string;
    district?: string;
    reference?:string;
    commune?: string;
    grant?: string;
    ligneBudgetaire?: string;
    fokontany?: string;
    personneConcerne?: any;
}
  
export interface ficheDotationItemInitialState {
    ficheDotations: ficheDotationItem[];
    ficheDotation: ficheDotationItem;
    isEditing: boolean;
    loading: boolean;
    [key: string]: any;
}
  