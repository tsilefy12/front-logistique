import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../lib/axios";

/**
 * @param data : { id: string } : the id of the offerOrderItem to get
 * @param thunkAPI
 * @returns {Promise<void>}
 * @constructor
 * @memberof useCases
 * @description : This function is used to get one offerOrderItem
 */
export const getOfferOrderItem = createAsyncThunk(
  "offerOrderItem/getOfferOrderItem",
  async (data: { id: string; args?: any }, thunkAPI) => {
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
