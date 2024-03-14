export interface uniteStockItem {
    id?: string;
    uniteStock?: string;
}
  
export interface UniteStockInitialState {
    uniteStocks: uniteStockItem[];
    uniteStock: uniteStockItem;
    isEditing: boolean;
    loading: boolean;
    [key: string]: any;
}
  