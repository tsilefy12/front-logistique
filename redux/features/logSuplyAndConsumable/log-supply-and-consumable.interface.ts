export interface LogSuplyAndConsumableItem {
  id?: string;
  date?: string;
  quantity?: number;
 // SKU?: string;
  OperationType?: string;
  unitPrice?: number;
  inventoryValue?: number;
  supplyAndConsumableId?: string;
  supplyAndConsumable?: any;
}

export interface LogSuplyAndConsumableInitialState {
  logSuplyAndConsumableList: LogSuplyAndConsumableItem[];
  logSuplyAndConsumable: LogSuplyAndConsumableItem;
  isEditing: boolean;
  loading: boolean;
  [key: string]: any;
}
