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
  type?: any;
}

export interface EquipmentInitialState {
  equipments: EquipmentItem[];
  equipment: EquipmentItem;
  typeequipment: [];
  employees: [];
  isEditing: boolean;
  loading: boolean;
  [key: string]: any;
}
