import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../lib/axios";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { LogSuplyAndConsumableItem } from "../log-supply-and-consumable.interface";

/**
 * create a new logSuplyAndConsumble
 * @param LogSuplyAndConsumableItem
 * @param thunkAPI
 * @returns {Promise<void>}
 * @memberof useCase
 * @description :this function is used to create a new logSuplyAndConsumble
 */

export const createLogSuplyAndConsumable = createAsyncThunk(
  "logSuplyAndConsumble/createLogSuplyAndConsumable",
  async (logSuplyAndConsumable: LogSuplyAndConsumableItem, thunkAPI) => {
    try {
      const response = await axios.post(
        "/logistique/log-supply-and-consumable",
        logSuplyAndConsumable
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Registre de Stock créé avec succès",
          options: { variant: "success" },
        })
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        if (error.response.data.statusCode == 409) {
          thunkAPI.dispatch(
            enqueueSnackbar({
              message: "Cet Registre de Stock a déjà été enregistré",
              options: { variant: "error" },
            })
          );
        }
        return thunkAPI.rejectWithValue(error);
      }
      return;
    }
  }
);
