export interface MissionTranportItem {
  id?: string;
  materiel?: string;
  pj?: number;
  date?: Date;
  libelle?: string;
  utilisateur?: string;
  nombreJour?: number;
  pu?: number;
  montant?: number;
  grant?: string;
  ligneBudgetaire?: string;
  transportationEquipment?: any;
  kilometrageFinale?: number;
}

export interface MissionTransportInitialState {
  missionTransports: MissionTranportItem[];
  missionTransport: MissionTranportItem;
  isEditing: boolean;
  loading: boolean;
  [key: string]: any;
}
