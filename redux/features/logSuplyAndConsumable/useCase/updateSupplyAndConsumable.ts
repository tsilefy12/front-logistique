import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { LogSuplyAndConsumableItem } from "../log-supply-and-consumable.interface";
import { axios } from "../../../../lib/axios";

/**
 * update a suplyAndConsumable
 * @param data : { id: string, suplyAndConsumable: SuplyAndConsumableItem } : the id of the article to update and the suplyAndConsumable data
 * @param thunkAPI
 * @returns {Promise<void>}
 * @memberof useCases
 * @description : This function is used to update a suplyAndConsumable
 */
export const updateLogSuplyAndConsumable = createAsyncThunk(
  "logsuplyAndConsumable/updateLogSuplyAndConsumable",
  async (
    data: { id: string; logsuplyAndConsumable: LogSuplyAndConsumableItem },
    thunkAPI
  ) => {
    try {
      const response = await axios.patch(
        `/logistique/log-supply-and-consumable/${data.id}`,
        data.logsuplyAndConsumable
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
