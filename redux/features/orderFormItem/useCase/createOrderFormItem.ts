import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../lib/axios";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { OrderFormItemsItem } from "../orderFormItem.interface";

/**
 * create a new orderForm
 * @param OrderFormItem
 * @param thunkAPI
 * @returns {Promise<void>}
 * @memberof useCase
 * @description :this function is used to create a new orderForm
 */

export const createOrderFormItem = createAsyncThunk(
  "orderFormItem/createOrderFormItem",
  async (orderFormItem: OrderFormItemsItem, thunkAPI) => {
    try {
      const response = await axios.post(
        "/logistique/order-form-item",
        orderFormItem
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Article created successfully",
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
