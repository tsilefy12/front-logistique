export interface HolderItem {
  id?: string;
  contact? : string;
  reference?: string;
  name?: string;
  type?: string;
  matricule?: string;
  function?: string;
  holderEquipment?:any;
}

export interface HolderInitialState {
  holderListe: HolderItem[];
  holder: HolderItem;
  isEditing: boolean;
  loading: boolean;
  [key: string]: any;
}
