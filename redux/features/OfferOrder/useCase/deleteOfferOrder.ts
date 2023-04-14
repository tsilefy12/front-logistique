import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../lib/axios";

/**
 * delete a offerOrder
 * @param data
 * @param thunkAPI
 * @returns {Promise<void>}
 * @memberof useCases
 * @description : This function is used to delete a offerOrder
 */
export const deleteOfferOrder = createAsyncThunk(
  "offerOrder/deleteOfferOrder",
  async (data: { id: string }, thunkAPI) => {
    try {
      const response = await axios.delete(`/logistique/offer-order/${data.id}`);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Offre supprimé avec succès",
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
