import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../lib/axios";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { SelectedOfferOrderItem } from "../selectedOfferOrder.interface";

export const createSelectedOfferOrder = createAsyncThunk(
  "selectedOfferOrder/createSelectedOfferOrder",
  async (selectedOfferOrder: SelectedOfferOrderItem, thunkAPI) => {
    try {
      const response = await axios.post(
        "/logistique/selected-offer-order",
        selectedOfferOrder
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Commande Offre Selectionne created successfully",
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
