import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../lib/axios";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { OfferOrderItemsItem } from "../offerOrderItem.interface";

/**
 * create a new offerOrder
 * @param OfferOrderItem
 * @param thunkAPI
 * @returns {Promise<void>}
 * @memberof useCase
 * @description :this function is used to create a new offerOrder
 */

export const createOfferOrderItem = createAsyncThunk(
  "offerOrderItem/createOfferOrderItem",
  async (offerOrder: OfferOrderItemsItem, thunkAPI) => {
    try {
      const response = await axios.post(
        "/logistique/offer-order-item",
        offerOrder
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Article created successfully",
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
