import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../lib/axios";

/**
 * delete a offerOrderItem
 * @param data
 * @param thunkAPI
 * @returns {Promise<void>}
 * @memberof useCases
 * @description : This function is used to delete a offerOrderItem
 */
export const deleteOfferOrderItem = createAsyncThunk(
  "offerOrderItem/deleteOfferOrderItem",
  async (data: { id: string }, thunkAPI) => {
    try {
      const response = await axios.delete(
        `/logistique/offer-order-item/${data.id}`
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Article supprimé avec succès",
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
