import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../axios";

export const editTypeEquipment = createAsyncThunk(
  "typeEquipment/editTypeEquipment",
  async (data: { id: string }, thunkAPI) => {
    try {
      const response = await axios.get(`/logistique/type-equipment/${data.id}`);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
