import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../lib/axios";

/**
 * @param data: { args?: any } : PRISMA arguments to filter getted timesheet data
 * @param thunkAPI
 * @returns {Promise<void>}
 * @description : This function is used to get all timesheet data
 */
export const getEquipment = createAsyncThunk(
	"materiel/getEquipment",
	async (data: { id?: string }, thunkAPI) => {
		try {
			
			const response = await axios.get(`/logistique/equipment/${data.id}`);
			return response.data;
		} catch (error: any) {
			if (error.response) {
				return thunkAPI.rejectWithValue(error);
			}
			throw error;
		}
	}
);