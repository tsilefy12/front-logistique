export interface OffreRetenuItem {
    id?:string,
    motif?: string,
    argument?: string,
    tableComparaisonId?: string
}
export interface OffreRetenuInitialState {
    offreRetenus :OffreRetenuItem [],
    offreRetenu : OffreRetenuItem,
    isEditing: boolean,
    loading: boolean,
    [key:string]:any
}