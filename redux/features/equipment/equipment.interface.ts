export interface EquipmentItem {
    id?: string;
    numOptim?: string;
    designation?: string;
    additionalInformation?: string;
    status?: string;
    ownerId?: string;
    owner?: any;
    acquisitionDate?: string;
    acquisitionValue?: number;
    imageUrl?: string;
    typeEquipmentId?: string;
    vendor?:any;
    type?: any;
    dureAmortissement?: number;
    dateAmortissement?: Date;
    fournisseur?: string;
    categorieMateriel?: string;
    grant?: string;
    ligneBudgetaire?:string;
}

export interface EquipmentInitialState {
  equipments: EquipmentItem[];
  equipment: EquipmentItem;
  isEditing: boolean;
  loading: boolean;
  [key: string]: any;
}
