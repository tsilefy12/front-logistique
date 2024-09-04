import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../../lib/axios";

export const getModePaiements = createAsyncThunk(
  "modePaiement/getModePaiements",
  async (data: { args?: any }, thunkAPI) => {
    try {
      const params = JSON.stringify(data.args);
      const response = await axios.get("/logistique/mode-paiement", { params });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
