export interface InventaireItem {
    id?: string;
    dateInventaire: string,
    datePreciation: Date,
    dureDeVie: number,
    etatMateriel: string,
    valeurInventaire: number,
    equipmentId: string
}
  
export interface InventaireItemInitialState {
    inventaireList: InventaireItem[];
    inventaire: InventaireItem;
    isEditing: boolean;
    loading: boolean;
    [key: string]: any;
}
  