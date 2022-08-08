import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../lib/axios";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { FournisseurItem } from "../fournisseurSlice.interface";

export const createFournisseur = createAsyncThunk(
  "fournisseur/createFournisseur",
  async (data: FournisseurItem, thunkAPI) => {
    try {
      const response = await axios.post("/logistique/vendor", data);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Fournisseur créé avec succès",
          options: {
            variant: "success",
          },
        })
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
