import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../lib/axios";

/**
 * @param data: { args?: any } : PRISMA arguments to filter getted timesheet data
 * @param thunkAPI
 * @returns {Promise<void>}
 * @description : This function is used to get all timesheet data
 */
export const getTypeEquipment = createAsyncThunk(
	"materiel/getTypeEquipment",
    async (data: { typeEquipmentId?: string; args?: any }, thunkAPI) => {
        try {
          const response = await axios.get(`/logistique/type-equipment/${data.typeEquipmentId}`);
          return response.data;
        } catch (error: any) {
          if (error.response) {
            return thunkAPI.rejectWithValue(error);
          }
          throw error;
        }
    }
);