import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../lib/axios";

/**
 * @param data: { args?: any } : PRISMA arguments to filter getted logSuplyAndConsumble data
 * @param thunkAPI
 * @returns {Promise<void>}
 * @description : This function is used to get all logSuplyAndConsumble data
 */
export const getLogSuplyAndConsumableListe = createAsyncThunk(
  "logSuplyAndConsumable/getLogSuplyAndConsumableListe",
  async (data: { args?: any }, thunkAPI) => {
    try {
      const params = JSON.stringify(data.args);
      const response = await axios.get(
        "/logistique/log-supply-and-consumable",
        {
          params: { args: params },
        }
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
