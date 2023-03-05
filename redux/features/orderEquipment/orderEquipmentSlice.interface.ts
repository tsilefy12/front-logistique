export interface OrderEquipmentItem {
  id?: string;
  designation?: string;
  reason?: string;
  deadlineOfReception?: string;
  numberOfAuthorisedOffersPossible?: number;
  applicantId?: string;
  applicant?: any;
  status?: string;
}

export interface OrderEquipmentInitialState {
  orderEquipmentList: OrderEquipmentItem[];
  orderEquipment: OrderEquipmentItem;
  employeList: [];
  isEditing: boolean;
  loading: boolean;
  [key: string]: any;
}
