import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../lib/axios";

/**
 * @param data
 * @param thunkAPI
 * @returns {Promise<void>}
 * @memberof useCases
 * @description : This function is used to get suplyAndconsumable data
 */
export const editSuplyAndConsumable = createAsyncThunk(
  "suplyAndConsumable/editSuplyAndConsumable",
  async (data: { id: string }, thunkAPI) => {
    try {
      const response = await axios.get(
        `/logistique/supply-and-consumable/${data.id}`
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
