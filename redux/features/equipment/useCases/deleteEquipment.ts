import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../lib/axios";

/**
 * delete a Equipment
 * @param data
 * @param thunkAPI
 * @returns {Promise<void>}
 * @memberof useCases
 * @description : This function is used to delete a timesheet
 */
export const deleteEquipment = createAsyncThunk(
	"Equipment/deleteEquipment",
	async (data: { id: string }, thunkAPI) => {
		try {
			const response = await axios.delete(`/logistique/equipment/${data.id}`);
			thunkAPI.dispatch(
				enqueueSnackbar({
					message: "Equipment supprimé avec succès",
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