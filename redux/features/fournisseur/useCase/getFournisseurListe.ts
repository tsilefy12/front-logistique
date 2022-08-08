import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../lib/axios";

export const getFournisseurList = createAsyncThunk(
  "fournisseur/getFournisseurList",
  async (data: { args?: any }, thunkAPI) => {
    try {
      const params = {
        args: JSON.stringify(data.args),
      };
      const response = await axios.get("/logistique/vendor");
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
