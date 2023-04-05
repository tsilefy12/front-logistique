import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../lib/axios";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { OrderEquipmentItemsItem } from "../orderEquipmentItem.interface";

/**
 * create a new OrderEquipmentItem
 * @param OrderFormItem
 * @param thunkAPI
 * @returns {Promise<void>}
 * @memberof useCase
 * @description :this function is used to create a new OrderEquipmentItem
 */

export const createOrderEquipmentItem = createAsyncThunk(
  "orderEquipmentItem/createOrderEquipmentItem",
  async (orderEquipmentItem: OrderEquipmentItemsItem, thunkAPI) => {
    try {
      const response = await axios.post(
        "/logistique/order-equipment-item",
        orderEquipmentItem
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Mes Commande created successfully",
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
