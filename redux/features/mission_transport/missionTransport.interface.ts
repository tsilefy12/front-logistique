export interface MissionTranportItem{
    id?: string,
    materiel?: string,
    pj?: string
    date?: Date,
    libelle?: string,
    utilisateur?: string,
    nombreJour?: number,
    pu?: number,
    montant?: number,
    grant?: string,
    ligneBudgetaire?: string;
    transportationEquipment?: any;
}

export interface MissionTransportInitialState{
    missionTransports: MissionTranportItem[],
    missionTransport: MissionTranportItem,
    isEditing: boolean,
    loading: boolean,
    [key: string]: any;
}