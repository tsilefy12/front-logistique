import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { EquipmentItem } from "../equipment.interface";
import { axios } from "../../../../lib/axios";

/**
 * update a Equipment
 * @param data : { id: string, Equipment: EquipmentItem } : the id of the Equipment to update and the Equipment data
 * @param thunkAPI
 * @returns {Promise<void>}
 * @memberof useCases
 * @description : This function is used to update a Equipment
 */
export const updateEquipment = createAsyncThunk(
	"Equipment/updateEquipment",
	async (data: { id: string; equipment: EquipmentItem }, thunkAPI) => {
		try {
			const response = await axios.patch(
				`/logistique/equipment/${data.id}`,
				data.equipment
			);
			thunkAPI.dispatch(
				enqueueSnackbar({
					message: "Equipment updated successfully",
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
