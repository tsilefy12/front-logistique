import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../lib/axios";

/**
 * delete a article
 * @param data
 * @param thunkAPI
 * @returns {Promise<void>}
 * @memberof useCases
 * @description : This function is used to delete a article
 */
export const deleteArticl = createAsyncThunk(
	"articl/deleteArticl",
	async (data: { id: string }, thunkAPI) => {
		try {
			const response = await axios.delete(`/logistique/supply-and-consumable/${data.id}`);
			thunkAPI.dispatch(
				enqueueSnackbar({
					message: "article supprimé avec succès",
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
