  export interface CarVoucherItem {
    id?: string;
    number?: string;
    registration?: string;
    type?: string;
    reason?: string;
    argument?: string;
    itinerary?: string;
    departureDate?: string;
    departureTime?: string;
    arrivalDate?: string;
    arrivalTime?: string;
    quantity?: number;
  } 

  export interface CarVoucherInitialState {
    carVouchers : CarVoucherItem[];
    carVoucher : CarVoucherItem;
    isEditing: boolean;
    loading: boolean;
    [key: string]: any;
  }