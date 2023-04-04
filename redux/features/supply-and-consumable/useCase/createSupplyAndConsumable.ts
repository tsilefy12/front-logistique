import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../lib/axios";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { SuplyAndConsumableItem } from "../supply-and-consumable.interface";

/**
 * create a new Fiche de stock
 * @param SuplyAndConsumableItem
 * @param thunkAPI
 * @returns {Promise<void>}
 * @memberof useCase
 * @description :this function is used to create a new fiche de stock
 */

export const createSuplyAndConsumable = createAsyncThunk(
  "suplyAndConsumble/createSuplyAndConsumable",
  async (suplyAndConsumable: SuplyAndConsumableItem, thunkAPI) => {
    try {
      const response = await axios.post(
        "/logistique/supply-and-consumable",
        suplyAndConsumable
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Fiche de Stock créé avec succès",
          options: { variant: "success" },
        })
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        if (error.response.data.statusCode == 409) {
          thunkAPI.dispatch(
            enqueueSnackbar({
              message: "Cet Fiche de Stock a déjà été enregistré",
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
