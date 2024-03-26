export interface ActivityItem {
    id?: string,
    nombre?: number,
    pu?: number,
    montant?: number,
    carVoucherId?: string
}
export interface ActivityInitialState{
    activitys: ActivityItem[],
    activity: ActivityItem,
    isEditing: boolean,
    loading: boolean
    [key: string]: any
}