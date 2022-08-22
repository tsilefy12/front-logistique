export interface ConsumptionInvoiceItem {
    id?: string;
    invoiceNumber?: string;
    reason?: string;
    DepartureKilometrage?: number;
    arrivalKilometrage?: number;
    consommation?: number;
    SKU?: string;
    unitPrice?: number;
    amount?: number;
    carVoucherId?: number;
    carVoucher?: any;
}

export interface ConsumptionInvoiceInitialState {
    consumptionInvoices : ConsumptionInvoiceItem[];
    consumptionInvoice : ConsumptionInvoiceItem;
    carvouchers: [];
    isEditing: boolean;
    loading: boolean;
    [key: string]: any;
}