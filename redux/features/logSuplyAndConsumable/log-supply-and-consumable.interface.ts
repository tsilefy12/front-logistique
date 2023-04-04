export interface LogSuplyAndConsumableItem {
  id?: string;
  date?: string;
  quantity?: number;
  SKU?: string;
  OperationType?: string;
  unitPrice?: number;
  inventoryValue?: number;
}

export interface LogSuplyAndConsumableInitialState {
  logsuplyAndConsumableList: LogSuplyAndConsumableItem[];
  logsuplyAndConsumable: LogSuplyAndConsumableItem;
  isEditing: boolean;
  loading: boolean;
  [key: string]: any;
}
