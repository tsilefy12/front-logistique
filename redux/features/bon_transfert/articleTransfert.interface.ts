export interface articleTransfertItem {
  id?: string;
  designation?: string;
  quantiteCommande?: number;
  quantiteExpedie?: number;
  observation?: string;
  bonDeTransfertId?: string;
  ref?: string;
}

export interface articleTransfertInitialState {
  articleTransferts: articleTransfertItem[];
  articleTransfert: articleTransfertItem;
  isEditing: boolean;
  loading: boolean;
  [key: string]: any;
}
