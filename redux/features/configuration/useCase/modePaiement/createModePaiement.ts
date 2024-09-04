import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../../lib/axios";
import { enqueueSnackbar } from "../../../notification/notificationSlice";
import { ModePaiementItem } from "../../modePaiement.interface";

/**
 * Create a new timesheet
 * @param createUniteStock
 * @param thunkAPI
 * @returns {Promise<void>}
 * @memberof useCases
 * @description : This function is used to create a new timesheet
 */
export const createModePaiement = createAsyncThunk(
  "modePaiement/createModePaiement",
  async (modePaiement: ModePaiementItem, thunkAPI) => {
    try {
      const response = await axios.post(
        "/logistique/mode-paiement",
        modePaiement
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Mode de paiement créer avec succès",
          options: { variant: "success" },
        })
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        thunkAPI.dispatch(
          enqueueSnackbar({
            message: "Mode de paiement non créer",
            options: { variant: "error" },
          })
        );
        return thunkAPI.rejectWithValue(error);
      }
      return error;
    }
  }
);
