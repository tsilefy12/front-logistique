import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { VendorItem } from "../vendor.interface";
import { axios } from "../../../../lib/axios";

/**
 * update a vendor 
 * @param data : { id: string, vendor: VendorItem } : the id of the vendor to update and the vendor data
 * @param thunkAPI
 * @returns {Promise<void>}
 * @memberof useCases
 * @description : This function is used to update a vendor
 */
export const updateVendor = createAsyncThunk(
	"vendor/updateVendor",
	async (data: { id: string; vendor: VendorItem }, thunkAPI) => {
		try {
			const response = await axios.patch(
				`/logistique/vendor/${data.id}`,
				data.vendor
			);
			thunkAPI.dispatch(
				enqueueSnackbar({
					message: "Vendor updated successfully",
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
