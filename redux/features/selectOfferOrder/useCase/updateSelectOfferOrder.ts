import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { SelectOfferOrderItem } from "../selectOfferOrder.interface";
import { axios } from "../../../../lib/axios";

/**
 * update a selectOfferOrder
 * @param data : { id: string, selectOfferOrder: SelectOfferOrderItem} : the id of the selectOfferOrder to update and the selectOfferOrder data
 * @param thunkAPI
 * @returns {Promise<void>}
 * @memberof useCases
 * @description : This function is used to update a selectOfferOrder
 */
export const updateSelectOfferOrder = createAsyncThunk(
  "selectOfferOrder/updateSelectOfferOrder",
  async (
    data: { id: string; selectOfferOrder: SelectOfferOrderItem },
    thunkAPI
  ) => {
    try {
      const response = await axios.patch(
        `/logistique/order-form-item/${data.id}`,
        data.selectOfferOrder
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Commande d'offre updated successfully",
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
