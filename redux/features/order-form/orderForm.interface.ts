export interface OrderFormItem {
  id?: string;
  number?: string;
  reference?: string;
  shippingMethod?: string;
  deliveryDate?: string;
  GSEValidation?: boolean;
  DEValidation?: boolean;
  vendorId?: string;
  vendor?: string;
}

export interface OrderFormInitialState {
  orderFormListe: OrderFormItem[];
  orderForm: OrderFormItem;
  isEditing: boolean;
  loading: boolean;
  [key: string]: any;
}
