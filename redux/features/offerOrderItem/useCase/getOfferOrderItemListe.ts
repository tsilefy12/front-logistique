import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../lib/axios";

/**
 * @param data: { args?: any } : PRISMA arguments to filter getted offerOrderItem data
 * @param thunkAPI
 * @returns {Promise<void>}
 * @description : This function is used to get all offerOrderItem data
 */
export const getOfferOrderItemListe = createAsyncThunk(
  "offerOrderItem/getOfferOrderItemListe",
  async (data: { args?: any }, thunkAPI) => {
    try {
      const params = JSON.stringify(data.args);
      const response = await axios.get("/logistique/offer-order-item", {
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
