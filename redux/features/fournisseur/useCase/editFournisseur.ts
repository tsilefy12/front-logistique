import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../lib/axios";

export const editFournisseur = createAsyncThunk(
  "fournisseur/editFournisseur",
  async (data: { id: string }, thunkAPI) => {
    try {
      const response = await axios.get(`/logistique/vendor/${data.id}`);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
