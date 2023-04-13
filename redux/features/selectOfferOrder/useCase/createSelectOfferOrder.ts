import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../lib/axios";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { SelectOfferOrderItem } from "../selectOfferOrder.interface";

/**
 * create a new selectOfferOrder
 * @param SelectOfferOrderItem
 * @param thunkAPI
 * @returns {Promise<void>}
 * @memberof useCase
 * @description :this function is used to create a new selectOfferOrder
 */

export const createSelectOfferOrder = createAsyncThunk(
  "selectOfferOrder/createSelectOfferOrder",
  async (selectOfferOrder: SelectOfferOrderItem, thunkAPI) => {
    try {
      const response = await axios.post(
        "/logistique/selected-offer-order",
        selectOfferOrder
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Comande d'offre created successfully",
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
