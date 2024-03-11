export interface VendorItem{
    id?: string;
    name?: string;
    address?: string;
    phone?: string;
    email?: string;
    website?: string;
    nif?: string;
}

export interface VendorInitialState {
    vendors: VendorItem[];
    vendor: VendorItem;
    isEditing: boolean;
    loading: boolean;
    [key: string]: any;
}