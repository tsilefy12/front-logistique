export interface MissionTranportItem{
    id?: string,
    materiel?: string,
    pj?: string
    date?: Date,
    libelle?: string,
    utilisateur?: string,
    montant?: number,
    grant?: string,
    ligneBudgetaire?: string;
}

export interface MissionTransportInitialState{
    missionTransports: MissionTranportItem[],
    missionTransport: MissionTranportItem,
    isEditing: boolean,
    loading: boolean,
    [key: string]: any;
}