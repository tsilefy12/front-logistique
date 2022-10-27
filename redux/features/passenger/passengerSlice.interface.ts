export interface PassengerItem {
  id?: string;
  name?: string;
}

export interface PassengerInitialState {
  passengerListe: PassengerItem[];
  passenger: PassengerItem;
  isEditing: boolean;
  loading: boolean;
  [key: string]: any;
}
