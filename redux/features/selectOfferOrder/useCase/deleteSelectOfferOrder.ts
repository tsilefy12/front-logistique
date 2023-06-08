import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../lib/axios";

export const deleteSelectOfferOrder = createAsyncThunk(
  "selectOfferOrder/deleteSelectOfferOrder",
  async (data: { id: string }, thunkAPI) => {
    try {
      const response = await axios.delete(
        `/logistique/selected-offer-order/${data.id}`
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Commande d'offre supprimé avec succès",
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
