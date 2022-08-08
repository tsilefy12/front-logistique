import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../lib/axios";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { FournisseurItem } from "../fournisseurSlice.interface";

export const updateFournisseur = createAsyncThunk(
  "fournisseur/updateFournisseur",
  async (data: { id: string; fournisseur: FournisseurItem }, thunkAPI) => {
    try {
      const response = await axios.patch(
        `/logistique/vendor/${data.id}`,
        data.fournisseur
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Fournisseur mis à jour avec succès",
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
