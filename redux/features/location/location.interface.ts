export interface LocationItem{
    id?: string,
    materiel?: string,
    date?: Date,
    responsable?: string,
    referenceBudgetaire?: string,
    nombreJour?: any,
    fournisseur?: string,
    pu?: any,
    montant?: number,
    grant?: string,
    ligneBudgetaire?: string,
    itineraire?: string;
    transportationEquipment?: any;
    vendor?: any;
}

export interface LocationInitialState{
    locationDeTransports: LocationItem[],
    locationDeTransport: LocationItem,
    isEditing: boolean,
    loading: boolean,
    [key: string]: any;
}