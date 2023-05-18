export interface OrderFormItem {
  id?: string;
  number?: string;
  reference?: string;
  shippingMethod?: string;
  deliveryDate?: string;
  GSEValidation?: boolean;
  DEValidation?: boolean;
  vendorId?: string;
  vendor?: any;
}

export interface OrderFormInitialState {
  orderFormListe: OrderFormItem[];
  orderForm: OrderFormItem;
  vendors: [];
  isEditing: boolean;
  loading: boolean;
  [key: string]: any;
}
