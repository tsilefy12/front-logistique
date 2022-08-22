import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { ConsumableItem } from "../consumable.interface";
import { axios } from "../../../../lib/axios";

/**
 * update a consummable 
 * @param data : { id: string, consumable: ConsumableItem } : the id of the consumable to update and the consumable data
 * @param thunkAPI
 * @returns {Promise<void>}
 * @memberof useCases
 * @description : This function is used to update a consumable
 */
export const updateConsumable = createAsyncThunk(
	"consumable/updateConsumable",
	async (data: { id: string; consumable: ConsumableItem }, thunkAPI) => {
		try {
			const response = await axios.patch(
				`/logistique/order-supply-and-consumable/${data.id}`,
				data.consumable
			);
			thunkAPI.dispatch(
				enqueueSnackbar({
					message: "Commande updated successfully",
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
