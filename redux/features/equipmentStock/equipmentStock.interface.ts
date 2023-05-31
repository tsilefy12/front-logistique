export interface EquipmentStockItem {
  id?: string;
  type?: string;
  prefix?: string;
  imageUrl?: string;
  inStock?: number;
  inUse?: number;
  isBroken?: number;
}

export interface EquipmentStockInitialState {
  equipmentStockList: EquipmentStockItem[];
  equipmentStock: EquipmentStockItem;
  isEditing: boolean;
  loading: boolean;
  [key: string]: any;
}
