import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../lib/axios";
import { getEmployee } from "./getEmployee";

export const getEquipment = createAsyncThunk(
  "materiel/getEquipment",
  async (data: { id: string; args?: any }, thunkAPI) => {
    try {
      const response = await axios.get(`/logistique/equipment/${data.id}`);
      const employeeId = response?.data?.ownerId;
      const detailEmployee = await thunkAPI
        .dispatch(getEmployee({ employeeId }))
        .unwrap();
      const oneCons = {
        id: response.data?.id,
        numOptim: response.data?.numOptim,
        designation: response.data?.designation,
        ownerId: response.data?.ownerId,
        additionalInformation: response.data?.additionalInformation,
        status: response.data?.status,
        acquisitionDate: response.data?.acquisitionDate,
        acquisitionValue: response.data?.acquisitionValue,
        imageUrl: response.data?.imageUrl,
        typeEquipmentId: response.data?.typeEquipmentId,
        type: response.data?.type,
        owner: detailEmployee,
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
