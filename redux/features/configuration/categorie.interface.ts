export interface categorieStockItem {
    id?: string;
    categorieStock?: string;
}
  
export interface categorieStockInitialState {
    categorieStocks: categorieStockItem[];
    categorieStock: categorieStockItem;
    isEditing: boolean;
    loading: boolean;
    [key: string]: any;
}
  