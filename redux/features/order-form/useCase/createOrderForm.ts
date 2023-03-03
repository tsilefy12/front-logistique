import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../lib/axios";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { OrderFormItem } from "../orderForm.interface";

/**
 * create a new orderForm
 * @param OrderFormItem
 * @param thunkAPI
 * @returns {Promise<void>}
 * @memberof useCase
 * @description :this function is used to create a new orderForm
 */

export const createOrderForm = createAsyncThunk(
  "orderForm/createOrderForm",
  async (orderForm: OrderFormItem, thunkAPI) => {
    try {
      const response = await axios.post("/logistique/order-form", orderForm);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Bon de commande created successfully",
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
