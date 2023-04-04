export interface SuplyAndConsumableItem {
  id?: string;
  designation?: string;
  quantity?: number;
  unitPrice?: number;
  SKU?: string;
}

export interface SuplyAndConsumableInitialState {
  suplyAndConsumableList: SuplyAndConsumableItem[];
  suplyAndConsumable: SuplyAndConsumableItem;
  isEditing: boolean;
  loading: boolean;
  [key: string]: any;
}
