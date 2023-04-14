export interface OfferOrderItem {
  id?: string;
  number?: string;
  ProformaNumber?: string;
  vatRegime?: string;
  vat?: number;
  totalAmountIncludingVat?: number;
  paymentMethod?: string;
  vendorId?: string;
}

export interface OfferOrderInitialState {
  offerOrderListe: OfferOrderItem[];
  offerOrder: OfferOrderItem;
  isEditing: boolean;
  loading: boolean;
  [key: string]: any;
}
