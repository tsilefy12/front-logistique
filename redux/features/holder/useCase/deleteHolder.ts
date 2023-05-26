import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../lib/axios";

/**
 * delete a holder
 * @param data
 * @param thunkAPI
 * @returns {Promise<void>}
 * @memberof useCases
 * @description : This function is used to delete a holder
 */
export const deleteHolder = createAsyncThunk(
  "holder/deleteHolder",
  async (data: { id: string }, thunkAPI) => {
    try {
      const response = await axios.delete(`/logistique/holder/${data.id}`);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Detenteur supprimé avec succès",
          options: { variant: "success" },
        })
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      return error;
    }
  }
);
