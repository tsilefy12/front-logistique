import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../lib/axios";

/**
 * delete a vendor
 * @param data
 * @param thunkAPI
 * @returns {Promise<void>}
 * @memberof useCases
 * @description : This function is used to delete a vendor
 */
export const deleteVendor = createAsyncThunk(
	"vendor/deleteVendor",
	async (data: { id: string }, thunkAPI) => {
		try {
			const response = await axios.delete(`/logistique/vendor/${data.id}`);
			thunkAPI.dispatch(
				enqueueSnackbar({
					message: "Vendor supprimé avec succès",
					options: { variant: "success" },
				})
			);
			return response.data;
		} catch (error: any) {
			if (error.response) {
				return thunkAPI.rejectWithValue(error);
			}
			return error;
		}
	}
);
