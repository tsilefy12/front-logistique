export interface SelectedOfferOrderItem {
  id?: string;
  argument?: string;
  offerOrderId?: string;
}

export interface SelectedOfferOrderInitialState {
  selectedOfferOrderList: SelectedOfferOrderItem[];
  selectedOfferOrder: SelectedOfferOrderItem;
  isEditing: boolean;
  loading: boolean;
  [key: string]: any;
}
