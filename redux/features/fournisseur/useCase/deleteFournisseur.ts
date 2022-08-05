import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../lib/axios";
import { enqueueSnackbar } from "../../notification/notificationSlice";

export const deleteFournisseur = createAsyncThunk(
  "fournisseur/deleteFournisseur",
  async (data: { id: string }, thunkAPI) => {
    try {
      const response = await axios.delete(`/logistique/vendor/${data.id}`);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Fournisseur supprimé avec succès",
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
