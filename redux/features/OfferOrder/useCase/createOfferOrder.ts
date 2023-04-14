import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../lib/axios";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { OfferOrderItem } from "../offerOrder.interface";

/**
 * create a new offerOrder
 * @param OfferOrderItem
 * @param thunkAPI
 * @returns {Promise<void>}
 * @memberof useCase
 * @description :this function is used to create a new offerOrder
 */

export const createOfferOrder = createAsyncThunk(
  "offerOrder/createOfferOrder",
  async (offerOrder: OfferOrderItem, thunkAPI) => {
    try {
      const response = await axios.post("/logistique/offer-order", offerOrder);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Offre created successfully",
          options: { variant: "success" },
        })
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      return;
    }
  }
);
