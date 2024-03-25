import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../lib/axios";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { CarVoucherItem } from "../carVoucher.interface";

/**
 * update a carvoucher
 * @param data : { id: string, carvoucher: CarVoucherItem } : the id of the timesheet to update and the timesheet data
 * @param thunkAPI
 * @returns {Promise<void>}
 * @memberof useCases
 * @description : This function is used to update a carvoucher
 */

 export const updateCarVoucher = createAsyncThunk(
	"car-voucher/updateCarVoucher",
	async (data: { id: string; carVoucher: CarVoucherItem }, thunkAPI) => {
		try {
			const response = await axios.patch(
				`/logistique/car-voucher/${data.id}`,
				data.carVoucher
			);
			thunkAPI.dispatch(
				enqueueSnackbar({
					message: "Car voucher updated successfully",
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