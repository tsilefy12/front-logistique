import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../lib/axios";

/**
 * @param data: { args?: any } : PRISMA arguments to filter getted suplyAndConsumable data
 * @param thunkAPI
 * @returns {Promise<void>}
 * @description : This function is used to get all suplyAndConsumable data
 */
export const getSuplyAndConsumableList = createAsyncThunk(
  "suplyAndConsumableList/getSuplyAndConsumableList",
  async (data: { args?: any }, thunkAPI) => {
    try {
      const params = JSON.stringify(data.args);
      const response = await axios.get("/logistique/supply-and-consumable", {
        params: { args: params },
      });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
