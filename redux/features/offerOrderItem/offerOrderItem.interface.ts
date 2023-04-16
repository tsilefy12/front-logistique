export interface OfferOrderItemsItem {
  id?: string;
  designation?: string;
  quantity?: number;
  unitPrice?: number;
  SKU?: string;
  otherInformation?: string;
  offerOrderId?: string;
}

export interface OfferOrderItemInitialState {
  offerOrderItemListe: OfferOrderItemsItem[];
  offerOrderItem: OfferOrderItemsItem;
  isEditing: boolean;
  loading: boolean;
  [key: string]: any;
}
