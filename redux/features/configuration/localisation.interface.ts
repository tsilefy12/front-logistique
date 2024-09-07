export interface LocalisationItem {
  id?: string;
  localisation?: string;
}

export interface LocalisationInitialState {
  localisations: LocalisationItem[];
  localisation: LocalisationItem;
  isEditing: boolean;
  loading: boolean;
  [key: string]: any;
}
