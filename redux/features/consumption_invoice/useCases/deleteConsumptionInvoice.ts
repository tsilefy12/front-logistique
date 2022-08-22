import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../lib/axios";

/**
 * delete a consumptionInvoice
 * @param data
 * @param thunkAPI
 * @returns {Promise<void>}
 * @memberof useCases
 * @description : This function is used to delete a consumptionInvoice
 */
export const deleteConsumptionInvoice = createAsyncThunk(
	"consumption-invoice/deleteConsumptionInvoice",
	async (data: { id: string }, thunkAPI) => {
		try {
			const response = await axios.delete(`/logistique/consumption-invoice/${data.id}`);
			thunkAPI.dispatch(
				enqueueSnackbar({
					message: "Facture de consommation supprimé avec succès",
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