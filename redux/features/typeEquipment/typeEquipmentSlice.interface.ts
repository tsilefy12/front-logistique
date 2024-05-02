export interface TypeEquipmentItem {
  id?: string;
  type?: string;
  prefix?: string;
  unitPrice?: number;
  imageUrl?: string;
}

export interface TypeEquipmentInitialState {
  typeEquipmentList: TypeEquipmentItem[];
  typeEquipment: TypeEquipmentItem;
  isEditing: boolean;
  loading: boolean;
  [key: string]: any;
}
