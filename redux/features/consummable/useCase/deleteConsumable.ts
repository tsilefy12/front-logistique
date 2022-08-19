import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../lib/axios";

/**
 * delete a consumable
 * @param data
 * @param thunkAPI
 * @returns {Promise<void>}
 * @memberof useCases
 * @description : This function is used to delete a consumable
 */
export const deleteConsumable = createAsyncThunk(
	"consumable/deleteConsumable",
	async (data: { id: string }, thunkAPI) => {
		try {
			const response = await axios.delete(`/logistique/order-supply-and-consumable/${data.id}`);
			thunkAPI.dispatch(
				enqueueSnackbar({
					message: "commande supprimé avec succès",
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
