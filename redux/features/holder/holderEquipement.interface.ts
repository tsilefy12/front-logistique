export interface HolderEquipementItem {
    id?: string;
    holderId?: string;
    holser?:any;
    equipmentId?: string;
    equipment?:any;
}
export interface HolderEquipementInitialState {
    holderEquipementListe: HolderEquipementItem[];
    holderEquipement: HolderEquipementItem;
    isEditing: boolean;
    loading: boolean;
    [key: string]: any;
  }