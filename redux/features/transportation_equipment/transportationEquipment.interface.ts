import { TypeEquipmentItem } from "../typeEquipment/typeEquipmentSlice.interface";

export interface TransportationEquipmentItem {
  id?: string;
  registration?: string;
  type?: string;
  brand?: string;
  otherInformation?: string;
  status?: string;
  dateAcquisition?: Date;
  kilometrageInitial?: number;
  kilometrageActuel?: number;
  reservoir?: number;
  reste?: number;
  consommation?: number;
  typeEquipment?: TypeEquipmentItem;
  fournisseur?: string;
  localisation?: string;
  vendor?: any;
}

export interface TransportationEquipmentInitialState {
  transportationEquipments: TransportationEquipmentItem[];
  transportationEquipment: TransportationEquipmentItem;
  isEditing: boolean;
  loading: boolean;
  [key: string]: any;
}
