export interface UniteStockItem {
    id?: string;
    uniteStock?: string;
}
  
export interface UniteStockInitialState {
    uniteStocks: UniteStockItem[];
    uniteStock: UniteStockItem;
    isEditing: boolean;
    loading: boolean;
    [key: string]: any;
}
  