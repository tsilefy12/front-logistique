import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { customizationSlice } from "./features/slices/customizationSlice";
import { menuSlice } from "./features/menu/menuSlice";
import { menuProfileSlice } from "./features/menu/menuprofileSlice";
import { authSlice } from "./features/auth";
import { vendorSlice } from "./features/vendor/vendorSlice";
import { typeEquipmentSlice } from "./features/typeEquipment/typeEquipmentSlice";
import { notificationSlice } from "./features/notification/notificationSlice";
import { transportationEquipmentSlice } from "./features/transportation_equipment/transportationEquipmentSlice";
import { fournisseurSlice } from "./features/fournisseur/fournisseurSlice";
import { orderEquipmentSlice } from "./features/orderEquipment/orderEquipmentSlice";
import { consumableSlice } from "./features/order-supply-and-consumable/OrderSupplyAndConsumable";
import { carVoucherSlice } from "./features/car-voucher/carVoucherSlice";
import { consumptionInvoiceSlice } from "./features/consumption_invoice/consumptionInvoiceSlice";
import { equipmentSlice } from "./features/equipment/equipmentSlice";
import { detenteurSlice } from "./features/detenteur/detenteurSlice";
import { passengerSlice } from "./features/passenger/passengerSlice";
import { orderFormSlice } from "./features/order-form/orderFormSlice";
import { suplyAndConsumableSlice } from "./features/supply-and-consumable/supply-and-consumable";
import { logsuplyAndConsumableSlice } from "./features/logSuplyAndConsumable/log-supply-and-consumableSlice";
import { orderEquipmentItemSlice } from "./features/OrderEquipmentItem/orderEquipmentItemSlice";
import { orderFormItemSlice } from "./features/orderFormItem/orderFormItemSlice";
import { selectOfferOrderSlice } from "./features/selectOfferOrder/selectOfferOrderSlice";
import { offerOrderSlice } from "./features/OfferOrder/offerOrderSlice";
import { offerOrderItemSlice } from "./features/offerOrderItem/offerOrderItemSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    customization: customizationSlice.reducer,
    menu: menuSlice.reducer,
    menuprofile: menuProfileSlice.reducer,
    notification: notificationSlice.reducer,
    vendor: vendorSlice.reducer,
    typeEquipment: typeEquipmentSlice.reducer,
    orderEquipment: orderEquipmentSlice.reducer,
    fournisseur: fournisseurSlice.reducer,
    transportationEquipment: transportationEquipmentSlice.reducer,
    carVoucher: carVoucherSlice.reducer,
    suplyAndConsumable: suplyAndConsumableSlice.reducer,
    consumptionInvoice: consumptionInvoiceSlice.reducer,
    equipment: equipmentSlice.reducer,
    consumable: consumableSlice.reducer,
    detenteur: detenteurSlice.reducer,
    passenger: passengerSlice.reducer,
    orderForm: orderFormSlice.reducer,
    logSuplyAndConsumable: logsuplyAndConsumableSlice.reducer,
    orderEquipmentItem: orderEquipmentItemSlice.reducer,
    orderFormItem: orderFormItemSlice.reducer,
    selectOfferOrder: selectOfferOrderSlice.reducer,
    offerOrder: offerOrderSlice.reducer,
    offerOrderItem: offerOrderItemSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
