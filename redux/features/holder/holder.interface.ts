export interface HolderItem {
  id?: string;
  contact? : string;
  reference?: string;
  lastName?: string;
  firstName?: string;
  matricule?: string;
  function?: string;
  numOption?:string;
}

export interface HolderInitialState {
  holderListe: HolderItem[];
  holder: HolderItem;
  isEditing: boolean;
  loading: boolean;
  [key: string]: any;
}
