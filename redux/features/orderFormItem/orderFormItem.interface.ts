export interface OrderFormItemsItem {
  id?: string;
  designation?: string;
  quantity?: number;
  unitPrice?: number;
  SKU?: string;
  orderFormId?: string;
}

export interface OrderFormItemInitialState {
  orderFormItemListe: OrderFormItemsItem[];
  orderFormItem: OrderFormItemsItem;
  isEditing: boolean;
  loading: boolean;
  [key: string]: any;
}
