export interface TransportationEquipmentItem {
    id?: string;
    registration?: string;
    type?: string;
    brand?: string;
    otherInformation?: string;
}

export interface TransportationEquipmentInitialState {
    transportationEquipments : TransportationEquipmentItem[];
    transportationEquipment : TransportationEquipmentItem;
    isEditing: boolean;
    loading: boolean;
    [key: string]: any;
}