import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../lib/axios";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { OrderEquipmentItem } from "../orderEquipmentSlice.interface";

export const createOrderEquipment = createAsyncThunk(
  "orderEquipment/createOrderEquipment",
  async (data: OrderEquipmentItem, thunkAPI) => {
    try {
      const response = await axios.post("/logistique/order-equipment", data);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Commande equipement créé avec succès",
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
