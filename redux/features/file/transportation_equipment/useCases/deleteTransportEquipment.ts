import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../lib/axios";

/**
 * delete a transportationEquipment
 * @param data
 * @param thunkAPI
 * @returns {Promise<void>}
 * @memberof useCases
 * @description : This function is used to delete a transportationEquipment
 */
export const deleteTransportationEquipment = createAsyncThunk(
	"transportation-equipment/deleteTransportationEquipment",
	async (data: { id: string }, thunkAPI) => {
		try {
			const response = await axios.delete(`/logistique/transportation-equipment/${data.id}`);
			thunkAPI.dispatch(
				enqueueSnackbar({
					message: "Transportation equipment supprimé avec succès",
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