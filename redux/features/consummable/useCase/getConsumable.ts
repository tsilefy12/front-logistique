import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../lib/axios";
import { getEmployee } from "./getEmployee";
import { ConsumableItem } from "../consumable.interface";
/**
 * @param data : { id: string } : the id of the consumable to get
 * @param thunkAPI
 * @returns {Promise<void>}
 * @constructor
 * @memberof useCases
 * @description : This function is used to get one consumable
 */
export const getConsumable = createAsyncThunk(
  "consumable/getConsumable",
  async (data: { id: string; args?: any }, thunkAPI) => {
    try {
      const response = await axios.get(
        `/logistique/order-supply-and-consumable/${data.id}`
      );
      const employeeId = response?.data?.applicantId;
      const detailEmployee = await thunkAPI
        .dispatch(getEmployee({ employeeId }))
        .unwrap();
      const oneCons = {
        id: response.data?.id,
        item: response.data?.item,
        applicantId: response.data?.requestedQuantity,
        requestedQuantity: response.data?.requestedQuantity,
        deliveredQuantity: response.data?.deliveredQuantity,
        deliveryDate: response.data?.deliveryDate,
        status: response.data?.status,
        applicant: detailEmployee,
      };
      return oneCons;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
