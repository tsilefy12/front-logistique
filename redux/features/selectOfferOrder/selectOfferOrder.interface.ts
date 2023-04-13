export interface SelectOfferOrderItem {
  id?: string;
  argument?: string;
  offerOrderId?: string;
  offerOrder?: any;
}

export interface SelectOfferOrderInitialState {
  selectOfferOrderListe: SelectOfferOrderItem[];
  selectOfferOrder: SelectOfferOrderItem;
  isEditing: boolean;
  loading: boolean;
  [key: string]: any;
}
