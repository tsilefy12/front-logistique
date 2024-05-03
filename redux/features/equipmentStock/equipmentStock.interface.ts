export interface EquipmentStockItem {
  id?: string;
  numOptim?: string;
  type?: string; 
  acquisitionDate?: string;
  equipments?: any[];
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
