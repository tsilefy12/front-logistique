export interface ConsumableItem{
    id?: string;
    item?: string;
    applicantId?:string;
    requestedQuantity?: number;
    deliveredQuantity?: number;
    deliveryDate?: string;
    status?: string;
    applicant?: any;
}

export interface ConsumableInitialState {
    consumables: ConsumableItem[];
    consumable: ConsumableItem;
    isEditing: boolean;
    loading: boolean;
    [key: string]: any;
    employeeList: [];
}