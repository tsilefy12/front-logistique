import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../lib/axios";
import { getEmployee } from "./getEmployee";


/**
 * @param data : { id: string } : the id of the OrderEquipement to get
 * @param thunkAPI
 * @returns {Promise<void>}
 * @constructor
 * @memberof useCases
 * @description : This function is used to get one OrderEquipement
 */

export const getOrderEquipment = createAsyncThunk(
  "orderEquipment/getOrderEquipment",
  async (data: { id: string; args?: any }, thunkAPI) => {
    try {
      const response = await axios.get(
        `/logistique/order-equipement/${data.id}`
      );
      const employeeId = response?.data?.applicantId;
      const detailEmployee = await thunkAPI
        .dispatch(getEmployee({ employeeId }))
        .unwrap();
      const oneCons = {
        id: response.data?.id,
        designation: response.data?.designation,
        applicantId: response.data?.applicantId,
        reason: response.data?.reason,
        deadlineOfReception: response.data?.deadlineOfReception,
        numberOfAuthorisedOffersPossible: response.data?.numberOfAuthorisedOffersPossible,
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