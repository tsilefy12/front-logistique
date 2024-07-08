import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { SuplyAndConsumableItem } from "../supply-and-consumable.interface";
import { axios } from "../../../../lib/axios";

/**
 * update a suplyAndConsumable
 * @param data : { id: string, suplyAndConsumable: SuplyAndConsumableItem } : the id of the article to update and the suplyAndConsumable data
 * @param thunkAPI
 * @returns {Promise<void>}
 * @memberof useCases
 * @description : This function is used to update a suplyAndConsumable
 */
export const updateSuplyAndConsumable = createAsyncThunk(
  "suplyAndConsumable/updateSuplyAndConsumable",
  async (
    data: { id: string; suplyAndConsumable: SuplyAndConsumableItem },
    thunkAPI
  ) => {
    try {
      const response = await axios.patch(
        `/logistique/supply-and-consumable/${data.id}`,
        data.suplyAndConsumable
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Fiche de stock modifier avec succès",
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
