export interface OrderEquipmentItemsItem {
  id?: string;
  designation?: string;
  quantity?: string;
  orderEquipmentId?: string;
  orderEquipment?: any;
}

export interface OrderEquipmentItemsInitialState {
  orderEquipmentItemListe: OrderEquipmentItemsItem[];
  orderEquipmentItem: OrderEquipmentItemsItem;
  isEditing: boolean;
  loading: boolean;
  [key: string]: any;
}
