export interface EquipmentStockItem {
  id?: string;
  numOptim?: string;
  type?: string; 
  acquisitionDate?: string;
  status?: string;
  inStock?: number;
}

export interface EquipmentStockInitialState {
  equipmentStockList: EquipmentStockItem[];
  equipmentStock: EquipmentStockItem;
  isEditing: boolean;
  loading: boolean;
  [key: string]: any;
}
