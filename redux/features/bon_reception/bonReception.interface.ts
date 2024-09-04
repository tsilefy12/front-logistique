export interface bonReceptionItem {
  id?: string;
  bce?: string;
  bci?: string;
  reference?: string;
  dateReception?: Date;
  produitRecu?: any;
  etat?: string;
  observation?: string;
  bonDeCommandeExterne?: any;
  bonDeCommandeInterne?: any;
}

export interface bonReceptionInitialState {
  bonReceptions: bonReceptionItem[];
  bonReception: bonReceptionItem;
  isEditing: boolean;
  loading: boolean;
  [key: string]: any;
}
