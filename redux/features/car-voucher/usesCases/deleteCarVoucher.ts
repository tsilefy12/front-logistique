import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../lib/axios";

/**
 * delete a carvoucher
 * @param data
 * @param thunkAPI
 * @returns {Promise<void>}
 * @memberof useCases
 * @description : This function is used to delete a carvoucher
 */
export const deleteCarVoucher = createAsyncThunk(
	"car-voucher/deleteCarVoucher",
	async (data: { id: string }, thunkAPI) => {
		try {
			const response = await axios.delete(`/logistique/car-voucher/${data.id}`);
			thunkAPI.dispatch(
				enqueueSnackbar({
					message: "Car voucher supprimé avec succès",
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