import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { customizationSlice } from "./features/slices/customizationSlice";
import { menuSlice } from "./features/menu/menuSlice";
import { menuProfileSlice } from "./features/menu/menuprofileSlice";
import { authSlice } from "./features/auth";
import { equipmentSlice } from "./features/equipment/equipmentSlice";
import { notificationSlice } from "./features/notification/notificationSlice";

export const store = configureStore({
	reducer: {
		customization: customizationSlice.reducer,
		menu: menuSlice.reducer,
		menuprofile: menuProfileSlice.reducer,
		auth: authSlice.reducer,
		notification: notificationSlice.reducer,
		equipment: equipmentSlice.reducer,
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
