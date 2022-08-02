import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../lib/axios";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { OrderEquipmentItem } from "../orderEquipmentSlice.interface";

export const updateOrderEquipment = createAsyncThunk(
  "orderEquipment/updateOrderEquipment",
  async (
    data: { id: string; orderEquipment: OrderEquipmentItem },
    thunkAPI
  ) => {
    try {
      const response = await axios.patch(
        `/logistique/order-equipment/${data.id}`,
        data.orderEquipment
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Commande equipement mis à jour avec succès",
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
