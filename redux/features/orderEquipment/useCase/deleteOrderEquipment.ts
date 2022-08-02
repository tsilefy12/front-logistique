import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../lib/axios";
import { enqueueSnackbar } from "../../notification/notificationSlice";

export const deleteOrderEquipment = createAsyncThunk(
  "orderEquipment/deleteOrderEquipment",
  async (data: { id: string }, thunkAPI) => {
    try {
      const response = await axios.delete(
        `/logistique/order-equipment/${data.id}`
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Commande equipement supprimé avec succès",
          options: {
            variant: "success",
          },
        })
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
