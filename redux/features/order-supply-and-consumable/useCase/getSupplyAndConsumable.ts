import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../lib/axios";

/**
 * @param data : { id: string } : the id of the article to get
 * @param thunkAPI
 * @returns {Promise<void>}
 * @constructor
 * @memberof useCases
 * @description : This function is used to get one article
 */
export const getSuplyAndConsumable = createAsyncThunk(
  "suplyAndConsumable/getSuplyAndConsumable",
  async (data: { suplyAndConsumableId: string; args?: any }, thunkAPI) => {
    try {
      const response = await axios.get(
        `/logistique/supply-and-consumable/${data.suplyAndConsumableId}`
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
