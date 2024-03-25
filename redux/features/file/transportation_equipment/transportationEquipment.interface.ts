export interface TransportationEquipmentItem {
    id?: string;
    registration?: string;
    type?: string;
    brand?: string;
    otherInformation?: string;
    status?: string;
    dateAcquisition?: Date;
    kilometrageInitial?: number;
    reservoir?: number;
    consommation?: number;
    fournisseur?: string;
}

export interface TransportationEquipmentInitialState {
    transportationEquipments : TransportationEquipmentItem[];
    transportationEquipment : TransportationEquipmentItem;
    isEditing: boolean;
    loading: boolean;
    [key: string]: any;
}