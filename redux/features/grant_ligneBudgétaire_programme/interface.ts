export interface GrantItem {
    id?: string;
    code?: string;
    postAnalyticId?: number;
    budgetLine?: BudgetLineItem;
    [x: string]: any;
}
  
export interface GrantInitialState {
    grantList: GrantItem[];
    grant: GrantItem;
    isEditing: boolean;
    loading: boolean;
    [key: string]: any;
}

export interface BudgetLineItem {
    id?: string;
    code?: string;
    grantId?: number;
    [x: string]: any;
}
  
export interface BudgetLineInitialState {
    budgetLineList: BudgetLineItem[];
    budgetLine: BudgetLineItem;
    isEditing: boolean;
    loading: boolean;
    [key: string]: any;
}
  
  