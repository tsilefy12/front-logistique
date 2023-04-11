import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { OrderFormItemsItem } from "../orderFormItem.interface";
import { axios } from "../../../../lib/axios";

/**
 * update a orderFormItem
 * @param data : { id: string, orderFormItem: OrderFormItemsItem} : the id of the orderFormItem to update and the orderFormItem data
 * @param thunkAPI
 * @returns {Promise<void>}
 * @memberof useCases
 * @description : This function is used to update a orderFormItem
 */
export const updateOrderFormItem = createAsyncThunk(
  "orderFormItem/updateOrderFormItem",
  async (data: { id: string; orderFormItem: OrderFormItemsItem }, thunkAPI) => {
    try {
      const response = await axios.patch(
        `/logistique/order-form-item/${data.id}`,
        data.orderFormItem
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Article updated successfully",
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
