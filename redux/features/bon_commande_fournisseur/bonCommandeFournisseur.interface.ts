export interface CommandeFournisseurItem {
    id?:string;
    vendorId?:string;
    vendor?:any;
    establishmentDate?: Date;
    paymentMethod?:string;
    deliveryDate?:Date;
    deliveryCondition?:string;
    articleFournisseur?:any;
}

export interface CommandeFournisseurInitialState {
    commandeFournisseurs : CommandeFournisseurItem[];
    commandeFournisseur:CommandeFournisseurItem;
    loading : boolean;
    isEditing: boolean;
    [keys:string] : any;
}