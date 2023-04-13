import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { OfferOrderItem } from "../offerOrder.interface";
import { axios } from "../../../../lib/axios";

/**
 * update a offerOrder
 * @param data : { id: string, selectOfferOrder: OfferOrderItem} : the id of the offerOrder to update and the offerOrder data
 * @param thunkAPI
 * @returns {Promise<void>}
 * @memberof useCases
 * @description : This function is used to update a offerOrder
 */
export const updateOfferOrder = createAsyncThunk(
  "offerOrder/updateOfferOrder",
  async (data: { id: string; offerOrder: OfferOrderItem }, thunkAPI) => {
    try {
      const response = await axios.patch(
        `/logistique/offer-order/${data.id}`,
        data.offerOrder
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Offre updated successfully",
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
