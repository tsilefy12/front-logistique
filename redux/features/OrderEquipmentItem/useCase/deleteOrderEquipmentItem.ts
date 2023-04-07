import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../lib/axios";

/**
 * delete a OrderEquipmentItem
 * @param data
 * @param thunkAPI
 * @returns {Promise<void>}
 * @memberof useCases
 * @description : This function is used to delete a OrderEquipmentItem
 */
export const deleteOrderEquipmentItem = createAsyncThunk(
  "orderEquipmentItem/deleteOrderEquipmentItem",
  async (data: { id: string }, thunkAPI) => {
    try {
      const response = await axios.delete(
        `/logistique/order-equipment-item/${data.id}`
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Mes commande supprimé avec succès",
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
