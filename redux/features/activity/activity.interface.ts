export interface ActivityItem {
    id?: string,
    activite?:string,
    nombre?: number,
    pu?: number,
    montants?: number,
    carVoucherId?: string,
    carVoucher?: any
}
export interface ActivityInitialState{
    activitys: ActivityItem[],
    activity: ActivityItem,
    isEditing: boolean,
    loading: boolean
    [key: string]: any
}