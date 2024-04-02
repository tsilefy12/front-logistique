  export interface CarVoucherItem {
    id?: string;
    materiel?: string;
    date?: Date;
    montantTotal?: string;
    reference?: string;
    transportationEquipment?: any
    /*argument?: string;
    itinerary?: string;
    departureDate?: string;
    departureTime?: string;
    arrivalDate?: string;
    arrivalTime?: string;
    quantity?: number;*/
  } 

  export interface CarVoucherInitialState {
    carVouchers : CarVoucherItem[];
    carVoucher : CarVoucherItem;
    isEditing: boolean;
    loading: boolean;
    [key: string]: any;
  }