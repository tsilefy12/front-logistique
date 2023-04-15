import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../lib/axios";

/**
 * @param data
 * @param thunkAPI
 * @returns {Promise<void>}
 * @memberof useCases
 * @description : This function is used to get offerOrderItem data
 */
export const editOfferOrderItem = createAsyncThunk(
  "offerOrderItem/editOfferOrderItem",
  async (data: { id: string }, thunkAPI) => {
    try {
      const response = await axios.get(
        `/logistique/offer-order-item/${data.id}`
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
