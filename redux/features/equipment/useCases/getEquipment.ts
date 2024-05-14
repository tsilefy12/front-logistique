import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../lib/axios";
import { getEmployee } from "./getEmployee";

export const getEquipment = createAsyncThunk(
  "materiel/getEquipment",
  async (data: { id: string; args?: any }, thunkAPI) => {
    try {
      const params = JSON.stringify(data.args);
      const response = await axios.get(`/logistique/equipment/${data.id}`,{
        params: { args: params },
      });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
