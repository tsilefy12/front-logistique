import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../../lib/axios";
import { enqueueSnackbar } from "../../../notification/notificationSlice";
import { LocalisationItem } from "../../localisation.interface";

/**
 * Create a new timesheet
 * @param createUniteStock
 * @param thunkAPI
 * @returns {Promise<void>}
 * @memberof useCases
 * @description : This function is used to create a new timesheet
 */
export const createLocalisation = createAsyncThunk(
  "localisation/createLocalisation",
  async (localisation: LocalisationItem, thunkAPI) => {
    try {
      const response = await axios.post(
        "/logistique/localisation",
        localisation
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Localisation créer avec succès",
          options: { variant: "success" },
        })
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        thunkAPI.dispatch(
          enqueueSnackbar({
            message: "Localisation non créer",
            options: { variant: "error" },
          })
        );
        return thunkAPI.rejectWithValue(error);
      }
      return error;
    }
  }
);
