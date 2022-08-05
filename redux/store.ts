import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { customizationSlice } from "./features/slices/customizationSlice";
import { menuSlice } from "./features/menu/menuSlice";
import { menuProfileSlice } from "./features/menu/menuprofileSlice";
import { authSlice } from "./features/auth";
import { notificationSlice } from "./features/notification/notificationSlice";
import { vendorSlice } from "./features/vendor/vendorSlice";


export const store = configureStore({
	reducer: {
		auth: authSlice.reducer,
        customization: customizationSlice.reducer,
        menu: menuSlice.reducer,
        menuprofile: menuProfileSlice.reducer,
        notification: notificationSlice.reducer,
		vendor: vendorSlice.reducer,
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
