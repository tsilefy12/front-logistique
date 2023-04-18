import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { LogSuplyAndConsumableItem } from "../log-supply-and-consumable.interface";
import { axios } from "../../../../lib/axios";

/**
 * update a logSuplyAndConsumble
 * @param data : { id: string, logSuplyAndConsumble: LogSuplyAndConsumableItem } : the id of the logSuplyAndConsumble to update and the logSuplyAndConsumble data
 * @param thunkAPI
 * @returns {Promise<void>}
 * @memberof useCases
 * @description : This function is used to update a logSuplyAndConsumble
 */
export const updateLogSuplyAndConsumable = createAsyncThunk(
  "logSuplyAndConsumable/updateLogSuplyAndConsumable",
  async (
    data: { id: string; logSuplyAndConsumable: LogSuplyAndConsumableItem },
    thunkAPI
  ) => {
    try {
      const response = await axios.patch(
        `/logistique/log-supply-and-consumable/${data.id}`,
        data.logSuplyAndConsumable
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Registre de Stock updated successfully",
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
