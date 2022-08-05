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
import { notificationSlice } from "./features/notification/notificationSlice";
import { transportationEquipmentSlice } from "./features/transportation_equipment/transportationEquipmentSlice";


export const store = configureStore({
	reducer: {
		customization: customizationSlice.reducer,
		menu: menuSlice.reducer,
		menuprofile: menuProfileSlice.reducer,
		auth: authSlice.reducer,
        notification: notificationSlice.reducer,
        transportationEquipment: transportationEquipmentSlice.reducer,
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
