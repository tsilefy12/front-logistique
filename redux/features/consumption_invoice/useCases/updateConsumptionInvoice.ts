import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../lib/axios";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { ConsumptionInvoiceItem } from "../consumptionInvoice.interface";


/**
 * update a consumptionInvoice
 * @param data : { id: string, consumptionInvoice: ConsumptionInvoiceItem } : the id of the consumptionInvoice to update and the consumptionInvoice data
 * @param thunkAPI
 * @returns {Promise<void>}
 * @memberof useCases
 * @description : This function is used to update a consumptionInvoice
 */

 export const updateConsumptionInvoice = createAsyncThunk(
	"consumption-invoice/updateConsumptionInvoice",
	async (data: { id: string; consumptionInvoice: ConsumptionInvoiceItem }, thunkAPI) => {
		try {
			const response = await axios.patch(
				`/logistique/consumption-invoice/${data.id}`,
				data.consumptionInvoice
			);
			thunkAPI.dispatch(
				enqueueSnackbar({
					message: "Facture de consommation updated successfully",
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