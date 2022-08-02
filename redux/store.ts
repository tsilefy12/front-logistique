import {
  configureStore,
  ThunkAction,
  Action,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { customizationSlice } from "./features/slices/customizationSlice";
import { menuSlice } from "./features/menu/menuSlice";
import { menuProfileSlice } from "./features/menu/menuprofileSlice";
import { authSlice } from "./features/auth";
import { typeEquipmentSlice } from "./features/typeEquipment/typeEquipmentSlice";
import { notificationSlice } from "./features/notification/notificationSlice";
import { orderEquipmentSlice } from "./features/orderEquipment/orderEquipmentSlice";

export const store = configureStore({
  reducer: {
    customization: customizationSlice.reducer,
    menu: menuSlice.reducer,
    notification: notificationSlice.reducer,
    menuprofile: menuProfileSlice.reducer,
    auth: authSlice.reducer,
    typeEquipment: typeEquipmentSlice.reducer,
    orderEquipment: orderEquipmentSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
