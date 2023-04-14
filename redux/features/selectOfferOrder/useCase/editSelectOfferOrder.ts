import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../lib/axios";

/**
 * @param data
 * @param thunkAPI
 * @returns {Promise<void>}
 * @memberof useCases
 * @description : This function is used to get selectOfferOrder data
 */
export const editSelectOfferOrder = createAsyncThunk(
  "selectOfferOrder/editSelectOfferOrder",
  async (data: { id: string }, thunkAPI) => {
    try {
      const response = await axios.get(
        `/logistique/selected-offer-order/${data.id}`
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
