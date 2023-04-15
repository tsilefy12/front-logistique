import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { OfferOrderItemsItem } from "../offerOrderItem.interface";
import { axios } from "../../../../lib/axios";

/**
 * update a offerOrderItem
 * @param data : { id: string, offerOrderItem: OfferOrderItemsItem} : the id of the offerOrder to update and the offerOrder data
 * @param thunkAPI
 * @returns {Promise<void>}
 * @memberof useCases
 * @description : This function is used to update a offerOrderItem
 */
export const updateOfferOrderItem = createAsyncThunk(
  "offerOrderItem/updateOfferOrderItem",
  async (
    data: { id: string; offerOrderItem: OfferOrderItemsItem },
    thunkAPI
  ) => {
    try {
      const response = await axios.patch(
        `/logistique/offer-order-item/${data.id}`,
        data.offerOrderItem
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Article updated successfully",
          options: { variant: "success" },
        })
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      return error;
    }
  }
);
