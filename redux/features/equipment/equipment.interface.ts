export interface EquipmentItem {
  id?: string;
  numOptim?: string;
  designation?: string;
  additionalInformation?: string;
  status?: string;
  ownerId?: string;
  acquisitionDate?: string;
  acquisitionValue?: string;
  imageUrl?: string;
  typeEquipmentId?: string;
}

export interface EquipmentInitialState {
    equipments: EquipmentItem[];
    equipment: EquipmentItem;
    typeequipment:[];
    employees:[];
    isEditing: boolean;
    loading: boolean;
    [key: string]: any;
}
