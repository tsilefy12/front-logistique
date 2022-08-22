import {
  configureStore,
  ThunkAction,
  Action,
} from "@reduxjs/toolkit";
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
import { articlSlice } from "./features/supply-and-consumable/supply-and-consumable";
import { consumableSlice } from "./features/order-supply-and-consumable/OrderSupplyAndConsumable";

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
    articl: articlSlice.reducer,
    consumable: consumableSlice.reducer,
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
