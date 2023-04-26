import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../lib/axios";
import { getEmployee } from "./getEmployee";

export const getOrderEquipment = createAsyncThunk(
  "orderEquipment/getOrderEquipment",
  async (data: { id: string; args?: any  }, thunkAPI) => {
    try {
      const response = await axios.get(
        `/logistique/order-equipment/${data.id}`
      );
      const employeeId = response.data?.applicantId;
      const detailEmployee = await thunkAPI
        .dispatch(getEmployee({ employeeId }))
        .unwrap();
        const oneCons = {
          id:response.data?.id,
          designation:response.data?.designation,
          applicantId:response.data?.applicantId,
          reason:response.data?.reason,
          deadlineOfReception:response.data?.deadlineOfReception,
          numberOfAuthorisedOffersPossible:response.data?.numberOfAuthorisedOffersPossible,
          status:response.data?.status,
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
