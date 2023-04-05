import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../lib/axios";
import { OrderEquipmentItemsItem } from "../orderEquipmentItem.interface";

/**
 * update a orderEquipmentItem
 * @param data : { id: string, orderEquipmentItem: orderEquipmentItem } : the id of the orderEquipmentItem to update and the orderEquipmentItem data
 * @param thunkAPI
 * @returns {Promise<void>}
 * @memberof useCases
 * @description : This function is used to update a orderEquipmentItem
 */
export const updateOrderEquipmentItem = createAsyncThunk(
  "orderEquipmentItem/updateOrderEquipmentItem",
  async (
    data: { id: string; orderEquipmentItem: OrderEquipmentItemsItem },
    thunkAPI
  ) => {
    try {
      const response = await axios.patch(
        `/logistique/order-equipment-item/${data.id}`,
        data.orderEquipmentItem
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Mes Commande updated successfully",
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
